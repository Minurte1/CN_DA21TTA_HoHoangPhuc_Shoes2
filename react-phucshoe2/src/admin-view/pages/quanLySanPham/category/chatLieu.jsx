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
const ChatLieuManager = () => {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [tenChatLieu, setTenChatLieu] = useState("");
  const [moTaChatLieu, setMoTaChatLieu] = useState("");
  const [trangThaiChatLieu, setTrangThaiChatLieu] = useState(1); // Mặc định

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${api}/chat-lieu/`); // Update to your API endpoint
      console.log("fetchMaterials", response.data);
      if (response.data.EC == 1) {
        setMaterials(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleOpenDialog = (material = null) => {
    setCurrentMaterial(material);
    setTenChatLieu(material ? material.TEN_CHAT_LIEU_ : "");
    setMoTaChatLieu(material ? material.MO_TA_CHAT_LIEU : "");
    setTrangThaiChatLieu(material ? material.TRANG_THAI_CHAT_LIEU : 1);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenChatLieu("");
    setCurrentMaterial(null);
  };

  const handleSave = async () => {
    const materialData = {
      tenChatLieu: tenChatLieu,
      moTaChatLieu: moTaChatLieu,
      trangThaiChatLieu: trangThaiChatLieu,
    };
    try {
      if (currentMaterial) {
        // Update material
        const response = await axios.put(
          `${api}/chat-lieu/${currentMaterial.CHAT_LIEU_ID_}`,
          {
            materialData,
          }
        );
        if (response.data.EC === 1) {
          fetchMaterials();
        }
      } else {
        // Add new material
        const response = await axios.post(`${api}/chat-lieu/`, {
          materialData,
        });
        if (response.data.EC === 1) {
          fetchMaterials();
        }
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error saving material:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/chat-lieu/${id}`);
      fetchMaterials();
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        {" "}
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }} // Căn trái cho tiêu đề
        >
          CHẤT LIỆU CỦA GIÀY
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            marginBottom: 2,
            backgroundColor: "#fff",
            color: "black",
            textAlign: "left",
          }}
        >
          Thêm chất liệu
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                Tên chất liệu
              </TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>Trạng Thái</TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>Mô tả</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                Ngày tạo chất liệu
              </TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>
                Ngày cập nhật chất liệu gần nhất
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.CHAT_LIEU_ID_}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {material.CHAT_LIEU_ID_}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {material.TEN_CHAT_LIEU_}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {material.TRANG_THAI_CHAT_LIEU == 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {material.MO_TA_CHAT_LIEU}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(material.CREATED_TEN_CHAT_LIEU_).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(material.UPDATE_CHAT_LIEU).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(material)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(material.CHAT_LIEU_ID_)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Material */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentMaterial ? "Sửa Chất Liệu" : "Thêm Chất Liệu"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên chất liệu"
            type="text"
            fullWidth
            variant="outlined"
            value={tenChatLieu}
            onChange={(e) => setTenChatLieu(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mô tả chất liệu"
            type="text"
            fullWidth
            variant="outlined"
            value={moTaChatLieu}
            onChange={(e) => setMoTaChatLieu(e.target.value)}
          />
          <Select
            margin="dense"
            label="Material Status"
            fullWidth
            variant="outlined"
            value={trangThaiChatLieu}
            onChange={(e) => setTrangThaiChatLieu(e.target.value)}
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
            {currentMaterial ? "Sửa" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChatLieuManager;
