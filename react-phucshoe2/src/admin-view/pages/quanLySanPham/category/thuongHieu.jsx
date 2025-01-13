import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import { getThemeConfig } from "../../../../services/themeService";
import { useSelector } from "react-redux";
import translations from "../../../../redux/data/translations";

const api = process.env.REACT_APP_URL_SERVER;

const ThuongHieuManager = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [brands, setBrands] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [tenThuongHieu, setTenThuongHieu] = useState("");
  const [trangThaiThuongHieu, setTrangThaiThuongHieu] = useState(1); // Default active state
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${api}/thuong-hieu/`);
      if (response.data.EC === 1) {
        setBrands(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleOpenDialog = (brand = null) => {
    setCurrentBrand(brand);
    setTenThuongHieu(brand ? brand.TEN_THUONG_HIEU : "");
    setTrangThaiThuongHieu(brand ? brand.TRANG_THAI_THUONG_HIEU : 1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenThuongHieu("");
    setCurrentBrand(null);
  };

  const handleSave = async () => {
    const brandData = {
      tenThuongHieu,
      trangThaiThuongHieu,
    };
    try {
      if (currentBrand) {
        // Update brand
        const response = await axios.put(
          `${api}/thuong-hieu/${currentBrand.ID_THUONG_HIEU}`,
          { brandData }
        );
        if (response.data.EC === 1) {
          fetchBrands();
        }
      } else {
        // Add new brand
        const response = await axios.post(`${api}/thuong-hieu/`, { brandData });
        if (response.data.EC === 1) {
          fetchBrands();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving brand:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/thuong-hieu/${id}`);
      fetchBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: currentTheme.backgroundColor,
        height: brands.length <= 5 ? "100vh" : "auto",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {t.brand}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            marginBottom: 2,
            backgroundColor: currentTheme.backgroundColor,
            color: currentTheme.color,
          }}
        >
          {t.add}
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.colorTitle }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.brandName}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.status}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDate}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.updatedDate}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.ID_THUONG_HIEU}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {brand.ID_THUONG_HIEU}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {brand.TEN_THUONG_HIEU}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      brand.TRANG_THAI_THUONG_HIEU === 1 ? "#008000" : "red",
                  }}
                >
                  {brand.TRANG_THAI_THUONG_HIEU === 1 ? t.inUse : t.outOfUse}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(brand.CREATE_THUONG_HIEU).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(brand.UPDATE_THUONG_HIEU).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(brand)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(brand.ID_THUONG_HIEU)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Brand */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentBrand ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.brandName}
            type="text"
            fullWidth
            variant="outlined"
            value={tenThuongHieu}
            onChange={(e) => setTenThuongHieu(e.target.value)}
          />
          <Select
            margin="dense"
            label={t.status}
            fullWidth
            variant="outlined"
            value={trangThaiThuongHieu}
            onChange={(e) => setTrangThaiThuongHieu(e.target.value)}
          >
            <MenuItem value={1}>{t.inUse}</MenuItem>
            <MenuItem value={0}>{t.outOfUse}</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            {t.cancelButtonLabel}
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentBrand ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ThuongHieuManager;
