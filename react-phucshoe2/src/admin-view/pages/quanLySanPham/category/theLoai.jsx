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

const LoaiDanhMucManager = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [loaiDanhMucList, setLoaiDanhMucList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLoaiDanhMuc, setCurrentLoaiDanhMuc] = useState(null);
  const [tenDanhMuc, setTenDanhMuc] = useState("");
  const [moTaLoaiDanhMuc, setMoTaLoaiDanhMuc] = useState("");
  const [trangThaiLoaiDanhMuc, setTrangThaiLoaiDanhMuc] = useState(1);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    fetchLoaiDanhMucList();
  }, []);

  const fetchLoaiDanhMucList = async () => {
    try {
      const response = await axios.get(`${api}/loai-danh-muc/`);
      if (response.data.EC === 1) {
        setLoaiDanhMucList(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching loai danh muc:", error);
    }
  };

  const handleOpenDialog = (loaiDanhMucItem = null) => {
    setCurrentLoaiDanhMuc(loaiDanhMucItem);
    setTenDanhMuc(loaiDanhMucItem ? loaiDanhMucItem.TEN_DANH_MUC : "");
    setMoTaLoaiDanhMuc(
      loaiDanhMucItem ? loaiDanhMucItem.MO_TA_LOAI_DANH_MUC : ""
    );
    setTrangThaiLoaiDanhMuc(
      loaiDanhMucItem ? loaiDanhMucItem.TRANG_THAI_DANHMUC : 1
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenDanhMuc("");
    setMoTaLoaiDanhMuc("");
    setCurrentLoaiDanhMuc(null);
  };

  const handleSave = async () => {
    const loaiDanhMucData = {
      tenDanhMuc,
      moTaLoaiDanhMuc,
      trangThaiLoaiDanhMuc,
    };
    try {
      if (currentLoaiDanhMuc) {
        const response = await axios.put(
          `${api}/loai-danh-muc/${currentLoaiDanhMuc.ID_DANH_MUC}`,
          loaiDanhMucData
        );
        if (response.data.EC === 1) {
          fetchLoaiDanhMucList();
        }
      } else {
        const response = await axios.post(
          `${api}/loai-danh-muc/`,
          loaiDanhMucData
        );
        if (response.data.EC === 1) {
          fetchLoaiDanhMucList();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving loai danh muc:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/loai-danh-muc/${id}`);
      fetchLoaiDanhMucList();
    } catch (error) {
      console.error("Error deleting loai danh muc:", error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: currentTheme.backgroundColor,
        height: loaiDanhMucList.length <= 5 ? "100vh" : "auto",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {t.categoryTypeList}
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
      <Divider sx={{ my: 1, color: currentTheme.color, width: "100%" }} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.colorTitle }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.categoryTypeName}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.description}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDate}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.updatedDate}
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
            {loaiDanhMucList.map((loaiDanhMucItem) => (
              <TableRow key={loaiDanhMucItem.ID_DANH_MUC}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {loaiDanhMucItem.ID_DANH_MUC}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {loaiDanhMucItem.TEN_DANH_MUC}
                </TableCell>{" "}
                <TableCell sx={{ color: currentTheme.color }}>
                  {loaiDanhMucItem.MO_TA_LOAI_DANH_MUC}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(loaiDanhMucItem.CREATED_DANHMUC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(loaiDanhMucItem.UPDATE_DANHMUC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      loaiDanhMucItem.TRANG_THAI_DANHMUC === 1
                        ? "#008000"
                        : "red",
                  }}
                >
                  {loaiDanhMucItem.TRANG_THAI_DANHMUC === 1
                    ? t.inUse
                    : t.outOfUse}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(loaiDanhMucItem)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(loaiDanhMucItem.ID_DANH_MUC)}
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
        <DialogTitle>{currentLoaiDanhMuc ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.categoryTypeName}
            type="text"
            fullWidth
            variant="outlined"
            value={tenDanhMuc}
            onChange={(e) => setTenDanhMuc(e.target.value)}
          />

          <TextField
            margin="dense"
            label={t.description}
            type="text"
            fullWidth
            variant="outlined"
            value={moTaLoaiDanhMuc}
            onChange={(e) => setMoTaLoaiDanhMuc(e.target.value)}
          />

          <Select
            margin="dense"
            label={t.status}
            fullWidth
            variant="outlined"
            value={trangThaiLoaiDanhMuc}
            onChange={(e) => setTrangThaiLoaiDanhMuc(e.target.value)}
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
            {currentLoaiDanhMuc ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoaiDanhMucManager;
