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
  Divider,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import { getThemeConfig } from "../../../../services/themeService";
import translations from "../../../../redux/data/translations";
import { useSelector } from "react-redux";

const api = process.env.REACT_APP_URL_SERVER;

const GioiTinhManager = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [genders, setGenders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentGender, setCurrentGender] = useState(null);
  const [tenGioiTinh, setTenGioiTinh] = useState("");
  const [trangThaiGioiTinh, setTrangThaiGioiTinh] = useState(1);

  useEffect(() => {
    fetchGenders();
  }, []);

  const fetchGenders = async () => {
    try {
      const response = await axios.get(`${api}/gioi-tinh/`);
      if (response.data.EC === 1) {
        setGenders(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching genders:", error);
    }
  };

  const handleOpenDialog = (gender = null) => {
    setCurrentGender(gender);
    setTenGioiTinh(gender ? gender.TEN_GIOI_TINH : "");
    setTrangThaiGioiTinh(gender ? gender.TRANG_THAI_GIOI_TINH : 1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenGioiTinh("");
    setCurrentGender(null);
  };

  const handleSave = async () => {
    const genderData = {
      tenGioiTinh,
      trangThaiGioiTinh,
    };
    try {
      if (currentGender) {
        const response = await axios.put(
          `${api}/gioi-tinh/${currentGender.GIOI_TINH_ID}`,
          genderData
        );
        if (response.data.EC === 1) {
          fetchGenders();
        }
      } else {
        const response = await axios.post(`${api}/gioi-tinh/`, genderData);
        if (response.data.EC === 1) {
          fetchGenders();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving gender:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/gioi-tinh/${id}`);
      fetchGenders();
    } catch (error) {
      console.error("Error deleting gender:", error);
    }
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          {t.shoeTarget}
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
          {t.addShoeTarget}
        </Button>
      </Box>
      <Divider sx={{ my: 1, color: "#000", width: "100%" }} />
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.colorTitle }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.shoeTarget}
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
            {genders.map((gender) => (
              <TableRow key={gender.GIOI_TINH_ID}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {gender.GIOI_TINH_ID}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {gender.TEN_GIOI_TINH}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(gender.CREATED_GIOI_TINH).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(gender.UPDATE_GIOI_TINH).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      gender.TRANG_THAI_GIOI_TINH === 1 ? "#008000" : "red",
                  }}
                >
                  {gender.TRANG_THAI_GIOI_TINH === 1 ? t.inUse : t.outOfUse}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(gender)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(gender.GIOI_TINH_ID)}
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
        <DialogTitle>{currentGender ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.shoeTarget}
            type="text"
            fullWidth
            variant="outlined"
            value={tenGioiTinh}
            onChange={(e) => setTenGioiTinh(e.target.value)}
          />

          <Select
            margin="dense"
            label={t.status}
            fullWidth
            variant="outlined"
            value={trangThaiGioiTinh}
            onChange={(e) => setTrangThaiGioiTinh(e.target.value)}
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
            {currentGender ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GioiTinhManager;
