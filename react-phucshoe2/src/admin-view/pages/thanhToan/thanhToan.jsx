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

const api = process.env.REACT_APP_URL_SERVER;
const ThanhToanManager = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("");
  const [trangThaiThanhToan, setTrangThaiThanhToan] = useState(1); // Default active

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(`${api}/thanh-toan/`);
      if (response.data.EC === 1) {
        setPaymentMethods(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const handleOpenDialog = (method = null) => {
    setCurrentMethod(method);
    setPhuongThucThanhToan(method ? method.PHUONG_THUC_THANH_TOAN : "");
    setTrangThaiThanhToan(method ? method.TRANG_THAI_THANH_TOAN : 1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPhuongThucThanhToan("");
    setCurrentMethod(null);
  };

  const handleSave = async () => {
    const paymentData = {
      phuongThucThanhToan,
      trangThaiThanhToan,
    };
    try {
      if (currentMethod) {
        // Update payment method
        const response = await axios.put(
          `${api}/thanh-toan/${currentMethod.ID_THANH_TOAN}`,
          paymentData
        );
        if (response.data.EC === 1) {
          fetchPaymentMethods();
        }
      } else {
        // Add new payment method
        const response = await axios.post(`${api}/thanh-toan/`, paymentData);
        if (response.data.EC === 1) {
          fetchPaymentMethods();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/thanh-toan/${id}`);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          PHƯƠNG THỨC THANH TOÁN
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            marginBottom: 2,
            backgroundColor: "#fff",
            color: "black",
          }}
        >
          Thêm phương thức
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Phương thức</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Trạng Thái</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày thanh toán</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentMethods.map((method) => (
              <TableRow key={method.ID_THANH_TOAN}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {method.ID_THANH_TOAN}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {method.PHUONG_THUC_THANH_TOAN}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {method.TRANG_THAI_THANH_TOAN === 1
                    ? "Hoạt động"
                    : "Ngưng hoạt động"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(method.NGAY_THANH_TOAN).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(method)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(method.ID_THANH_TOAN)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Payment Method */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentMethod ? "Sửa Phương Thức" : "Thêm Phương Thức"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Phương thức thanh toán"
            type="text"
            fullWidth
            variant="outlined"
            value={phuongThucThanhToan}
            onChange={(e) => setPhuongThucThanhToan(e.target.value)}
          />
          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            variant="outlined"
            value={trangThaiThanhToan}
            onChange={(e) => setTrangThaiThanhToan(e.target.value)}
          >
            <MenuItem value={1}>Hoạt động</MenuItem>
            <MenuItem value={0}>Ngưng hoạt động</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentMethod ? "Sửa" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ThanhToanManager;
