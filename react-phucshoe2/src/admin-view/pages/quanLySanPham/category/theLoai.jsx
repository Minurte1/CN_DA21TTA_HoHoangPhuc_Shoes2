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

const LoaiDanhMucManager = () => {
  const [loaiDanhMucList, setLoaiDanhMucList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLoaiDanhMuc, setCurrentLoaiDanhMuc] = useState(null);
  const [tenDanhMuc, setTenDanhMuc] = useState("");
  const [moTaLoaiDanhMuc, setMoTaLoaiDanhMuc] = useState("");
  const [trangThaiLoaiDanhMuc, setTrangThaiLoaiDanhMuc] = useState(1);

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
    <Container>
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Danh sách Loại Danh Mục
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Thêm Loại Danh Mục
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#26bbff" }}>ID</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Tên Loại Danh Mục</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>
                Mô Tả Danh Mục
              </TableCell>{" "}
              <TableCell sx={{ color: "#26bbff" }}>Trạng Thái</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Ngày Tạo</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Ngày Cập Nhật</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaiDanhMucList.map((loaiDanhMucItem) => (
              <TableRow key={loaiDanhMucItem.ID_DANH_MUC}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {loaiDanhMucItem.ID_DANH_MUC}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {loaiDanhMucItem.TEN_DANH_MUC}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {loaiDanhMucItem.MO_TA_LOAI_DANH_MUC}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {loaiDanhMucItem.TRANG_THAI_DANHMUC === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(loaiDanhMucItem.CREATED_DANHMUC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(loaiDanhMucItem.UPDATE_DANHMUC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
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
        <DialogTitle>
          {currentLoaiDanhMuc ? "Sửa Loại Danh Mục" : "Thêm Loại Danh Mục"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên Loại Danh Mục"
            type="text"
            fullWidth
            variant="outlined"
            value={tenDanhMuc}
            onChange={(e) => setTenDanhMuc(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Mô Tả Loại Danh Mục"
            type="text"
            fullWidth
            variant="outlined"
            value={moTaLoaiDanhMuc}
            onChange={(e) => setMoTaLoaiDanhMuc(e.target.value)}
          />

          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            variant="outlined"
            value={trangThaiLoaiDanhMuc}
            onChange={(e) => setTrangThaiLoaiDanhMuc(e.target.value)}
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
            {currentLoaiDanhMuc ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoaiDanhMucManager;
