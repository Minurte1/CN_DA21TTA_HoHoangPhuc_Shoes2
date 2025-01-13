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
import moment from "moment";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { getThemeConfig } from "../../../../services/themeService";
import translations from "../../../../redux/data/translations";
import { useSelector } from "react-redux";

const api = process.env.REACT_APP_URL_SERVER;

const PhongCachManager = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [phongCachList, setPhongCachList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPhongCach, setCurrentPhongCach] = useState(null);
  const [tenPhuongCach, setTenPhuongCach] = useState("");
  const [trangThaiPhongCach, setTrangThaiPhongCach] = useState(1);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    fetchPhongCach();
  }, []);

  const fetchPhongCach = async () => {
    try {
      const response = await axios.get(`${api}/phong-cach/`);
      if (response.data.EC === 1) {
        setPhongCachList(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching phong cach:", error);
    }
  };

  const handleOpenDialog = (phongCach = null) => {
    setCurrentPhongCach(phongCach);
    setTenPhuongCach(phongCach ? phongCach.TEN_PHONG_CACH : "");
    setTrangThaiPhongCach(phongCach ? phongCach.TRANG_THAI_PHONG_CACH : 1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenPhuongCach("");
    setCurrentPhongCach(null);
  };

  const handleSave = async () => {
    const phongCachData = {
      tenPhuongCach,
      trangThaiPhongCach,
    };
    try {
      if (currentPhongCach) {
        const response = await axios.put(
          `${api}/phong-cach/${currentPhongCach.ID_PHUONG_CACH}`,
          phongCachData
        );
        if (response.data.EC === 1) {
          fetchPhongCach();
        }
      } else {
        const response = await axios.post(`${api}/phong-cach/`, phongCachData);
        if (response.data.EC === 1) {
          fetchPhongCach();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving phong cach:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/phong-cach/${id}`);
      fetchPhongCach();
    } catch (error) {
      console.error("Error deleting phong cach:", error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: currentTheme.backgroundColor,
        height: phongCachList.length <= 5 ? "100vh" : "auto",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {t.Style}
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
                {t.styleName}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDateLabel}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.updatedDateLabel}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.status}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phongCachList.map((phongCach) => (
              <TableRow key={phongCach.ID_PHUONG_CACH}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {phongCach.ID_PHUONG_CACH}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {phongCach.TEN_PHONG_CACH}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(phongCach.CREATED_PHONG_CACH).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(phongCach.UPDATE_PHONG_CACH).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      phongCach.TRANG_THAI_PHONG_CACH === 1 ? "#008000" : "red",
                  }}
                >
                  {phongCach.TRANG_THAI_PHONG_CACH === 1
                    ? t.activeStatus
                    : t.inactiveStatus}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(phongCach)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(phongCach.ID_PHUONG_CACH)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentPhongCach ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.styleName}
            type="text"
            fullWidth
            variant="outlined"
            value={tenPhuongCach}
            onChange={(e) => setTenPhuongCach(e.target.value)}
          />
          <Select
            margin="dense"
            fullWidth
            variant="outlined"
            value={trangThaiPhongCach}
            onChange={(e) => setTrangThaiPhongCach(e.target.value)}
          >
            <MenuItem value={1}>{t.activeStatus}</MenuItem>
            <MenuItem value={0}>{t.inactiveStatus}</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            {t.cancelButtonLabel}
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentPhongCach ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PhongCachManager;
