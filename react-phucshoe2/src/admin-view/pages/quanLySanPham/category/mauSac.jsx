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

const MauSacManager = () => {
  const [mauSacList, setMauSacList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMauSac, setCurrentMauSac] = useState(null);
  const [tenMau, setTenMau] = useState("");
  const [trangThaiMauSac, setTrangThaiMauSac] = useState("");
  useEffect(() => {
    fetchMauSacList();
  }, []);

  const fetchMauSacList = async () => {
    try {
      const response = await axios.get(`${api}/mau-sac/`);
      if (response.data.EC === 1) {
        setMauSacList(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching mau sac:", error);
    }
  };

  const handleOpenDialog = (mauSacItem = null) => {
    setCurrentMauSac(mauSacItem);
    setTenMau(mauSacItem ? mauSacItem.TEN_MAU_SAC : "");
    setTrangThaiMauSac(mauSacItem ? mauSacItem.TRANG_THAI_MAU_SAC : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenMau("");
    setCurrentMauSac(null);
  };

  const handleSave = async () => {
    const mauSacData = { tenMau, trangThaiMauSac };
    try {
      if (currentMauSac) {
        const response = await axios.put(
          `${api}/mau-sac/${currentMauSac.MAU_SAC_ID}`,
          mauSacData
        );
        if (response.data.EC === 1) {
          fetchMauSacList();
        }
      } else {
        const response = await axios.post(`${api}/mau-sac/`, mauSacData);
        if (response.data.EC === 1) {
          fetchMauSacList();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving mau sac:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/mau-sac/${id}`);
      fetchMauSacList();
    } catch (error) {
      console.error("Error deleting mau sac:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Danh sách Màu Sắc
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Thêm Màu Sắc
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Tên Màu Sắc</TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày Tạo Ra</TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày Cập Nhật</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mauSacList.map((mauSacItem) => (
              <TableRow key={mauSacItem.MAU_SAC_ID}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {mauSacItem.MAU_SAC_ID}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {mauSacItem.TEN_MAU_SAC}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {mauSacItem.TRANG_THAI_MAU_SAC === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(mauSacItem.CREATE_MAU_SAC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(mauSacItem.UPDATE_MAU_SAC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(mauSacItem)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(mauSacItem.MAU_SAC_ID)}
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
          {currentMauSac ? "Sửa Màu Sắc" : "Thêm Màu Sắc"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên Màu Sắc"
            type="text"
            fullWidth
            variant="outlined"
            value={tenMau}
            onChange={(e) => setTenMau(e.target.value)}
          />{" "}
          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            variant="outlined"
            value={trangThaiMauSac}
            onChange={(e) => setTrangThaiMauSac(e.target.value)}
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
            {currentMauSac ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MauSacManager;
