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

const api = process.env.REACT_APP_URL_SERVER;

const GioiTinhManager = () => {
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
          `${api}/gioi-tinh/${currentGender.ID_GIOI_TINH}`,
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
    <Container>
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Danh sách giới tính
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Thêm giới tính
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Tên Giới Tính</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Trạng Thái</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày Tạo</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày Cập Nhật</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genders.map((gender) => (
              <TableRow key={gender.GIOI_TINH_ID}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {gender.GIOI_TINH_ID}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {gender.TEN_GIOI_TINH}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {gender.TRANG_THAI_GIOI_TINH === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(gender.CREATED_GIOI_TINH).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(gender.UPDATE_GIOI_TINH).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
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
        <DialogTitle>
          {currentGender ? "Sửa giới tình giày" : "Thêm giới tính giày"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Gender Name"
            type="text"
            fullWidth
            variant="outlined"
            value={tenGioiTinh}
            onChange={(e) => setTenGioiTinh(e.target.value)}
          />

          <Select
            margin="dense"
            label="Gender Status"
            fullWidth
            variant="outlined"
            value={trangThaiGioiTinh}
            onChange={(e) => setTrangThaiGioiTinh(e.target.value)}
          >
            <MenuItem value={1}>Đang sử dụng</MenuItem>
            <MenuItem value={0}>Ngưng sử dụng</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentGender ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GioiTinhManager;
