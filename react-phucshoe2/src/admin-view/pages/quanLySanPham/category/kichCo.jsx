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

const KichCoManager = () => {
  const [kichCoList, setKichCoList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentKichCo, setCurrentKichCo] = useState(null);
  const [kichCo, setKichCo] = useState("");
  const [trangThaiKichCo, setTrangThaiKichCo] = useState(1);

  useEffect(() => {
    fetchKichCoList();
  }, []);

  const fetchKichCoList = async () => {
    try {
      const response = await axios.get(`${api}/kich-co/`);
      if (response.data.EC === 1) {
        setKichCoList(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching kich co:", error);
    }
  };

  const handleOpenDialog = (kichCoItem = null) => {
    setCurrentKichCo(kichCoItem);
    setKichCo(kichCoItem ? kichCoItem.KICH_CO : "");
    setTrangThaiKichCo(kichCoItem ? kichCoItem.TRANG_THAI_KICH_CO : 1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setKichCo("");
    setCurrentKichCo(null);
  };

  const handleSave = async () => {
    const kichCoData = {
      kichCo,
      trangThaiKichCo,
    };
    try {
      if (currentKichCo) {
        const response = await axios.put(
          `${api}/kich-co/${currentKichCo.ID_KICH_CO}`,
          kichCoData
        );
        if (response.data.EC === 1) {
          fetchKichCoList();
        }
      } else {
        const response = await axios.post(`${api}/kich-co/`, kichCoData);
        if (response.data.EC === 1) {
          fetchKichCoList();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving kich co:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/kich-co/${id}`);
      fetchKichCoList();
    } catch (error) {
      console.error("Error deleting kich co:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Danh sách kích cỡ
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Thêm kích cỡ
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#26bbff" }}>ID</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Tên Kích Cỡ</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Trạng Thái</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Ngày Tạo</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Ngày Cập Nhật</TableCell>
              <TableCell sx={{ color: "#26bbff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kichCoList.map((kichCoItem) => (
              <TableRow key={kichCoItem.ID_KICH_CO}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {kichCoItem.ID_KICH_CO}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {kichCoItem.KICH_CO}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {kichCoItem.TRANG_THAI_KICH_CO === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(kichCoItem.CREATED_KICH_CO).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(kichCoItem.UPDATE_KICH_CO).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(kichCoItem)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(kichCoItem.ID_KICH_CO)}
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
          {currentKichCo ? "Sửa kích cỡ" : "Thêm kích cỡ"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên kích cỡ"
            type="text"
            fullWidth
            variant="outlined"
            value={kichCo}
            onChange={(e) => setKichCo(e.target.value)}
          />

          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            variant="outlined"
            value={trangThaiKichCo}
            onChange={(e) => setTrangThaiKichCo(e.target.value)}
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
            {currentKichCo ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default KichCoManager;
