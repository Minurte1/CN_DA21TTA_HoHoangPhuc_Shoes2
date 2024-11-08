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

const MucDichSuDungManager = () => {
  const [purposes, setPurposes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPurpose, setCurrentPurpose] = useState(null);
  const [tenMucDichSuDung, setTenMucDichSuDung] = useState("");
  const [trangThaiMucDichSuDung, setTrangThaiMucDichSuDung] = useState(1);

  useEffect(() => {
    fetchPurposes();
  }, []);

  const fetchPurposes = async () => {
    try {
      const response = await axios.get(`${api}/muc-dich-su-dung`);
      if (response.data.EC === 1) {
        setPurposes(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching purposes:", error);
    }
  };

  const handleOpenDialog = (purpose = null) => {
    setCurrentPurpose(purpose);
    setTenMucDichSuDung(purpose ? purpose.TEN_MUC_DICH_SU_DUNG : "");
    setTrangThaiMucDichSuDung(
      purpose ? purpose.TRANG_THAI_MUC_DICH_SU_DUNG : 1
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenMucDichSuDung("");
    setCurrentPurpose(null);
  };

  const handleSave = async () => {
    const purposeData = { tenMucDichSuDung, trangThaiMucDichSuDung };
    try {
      if (currentPurpose) {
        // Update purpose
        const response = await axios.put(
          `${api}/muc-dich-su-dung/${currentPurpose.ID_MUC_DICH_SU_DUNG}`,
          purposeData
        );
        if (response.data.EC === 1) {
          fetchPurposes();
        }
      } else {
        // Add new purpose
        const response = await axios.post(
          `${api}/muc-dich-su-dung`,
          purposeData
        );
        if (response.data.EC === 1) {
          fetchPurposes();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving purpose:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/muc-dich-su-dung/${id}`);
      fetchPurposes();
    } catch (error) {
      console.error("Error deleting purpose:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Danh Sách Mục Đích Sử Dụng
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 2, backgroundColor: "#fff", color: "black" }}
        >
          Thêm Mục Đích Sử Dụng
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                Tên Mục Đích Sử Dụng
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Trạng Thái</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày Tạo</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày Cập Nhật</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purposes.map((purpose) => (
              <TableRow key={purpose.ID_MUC_DICH_SU_DUNG}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {purpose.ID_MUC_DICH_SU_DUNG}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {purpose.TEN_MUC_DICH_SU_DUNG}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {purpose.TRANG_THAI_MUC_DICH_SU_DUNG === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(purpose.CREATE_MUC_DICH_SU_DUNG).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(purpose.UPDATE_MUC_DICH_SU_DUNG).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(purpose)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(purpose.ID_MUC_DICH_SU_DUNG)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Purpose */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentPurpose ? "Sửa Mục Đích Sử Dụng" : "Thêm Mục Đích Sử Dụng"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên Mục Đích Sử Dụng"
            type="text"
            fullWidth
            variant="outlined"
            value={tenMucDichSuDung}
            onChange={(e) => setTenMucDichSuDung(e.target.value)}
          />
          <Select
            margin="dense"
            fullWidth
            variant="outlined"
            value={trangThaiMucDichSuDung}
            onChange={(e) => setTrangThaiMucDichSuDung(e.target.value)}
          >
            <MenuItem value={1}>Đang sử dụng</MenuItem>
            <MenuItem value={0}>Ngưng sử dụng</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentPurpose ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MucDichSuDungManager;
