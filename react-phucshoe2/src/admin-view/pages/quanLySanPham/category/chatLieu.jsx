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
import moment from "moment";

import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { getThemeConfig } from "../../../../services/themeService";
import translations from "../../../../redux/data/translations";
import { useSelector } from "react-redux";
const api = process.env.REACT_APP_URL_SERVER;
const ChatLieuManager = () => {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [tenChatLieu, setTenChatLieu] = useState("");
  const [moTaChatLieu, setMoTaChatLieu] = useState("");
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const [trangThaiChatLieu, setTrangThaiChatLieu] = useState(1); // Mặc định
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${api}/chat-lieu/`); // Update to your API endpoint

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
          {t.shoeMaterial}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            marginBottom: 2,
            backgroundColor: currentTheme.backgroundColor,
            color: currentTheme.color,
            textAlign: "left",
          }}
        >
          {t.addMaterial}
        </Button>
      </Box>
      <Divider sx={{ my: 1, color: "#000", width: "100%" }} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.colorTitle }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                Tên chất liệu
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.description}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDate}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.updatedDate}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.status}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.CHAT_LIEU_ID_}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {material.CHAT_LIEU_ID_}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {material.TEN_CHAT_LIEU_}
                </TableCell>{" "}
                <TableCell sx={{ color: currentTheme.color }}>
                  {material.MO_TA_CHAT_LIEU}
                </TableCell>{" "}
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(material.CREATED_TEN_CHAT_LIEU_).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(material.UPDATE_CHAT_LIEU).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      material.TRANG_THAI_CHAT_LIEU === 1 ? "#008000" : "red",
                  }}
                >
                  {material.TRANG_THAI_CHAT_LIEU == 1 ? t.inUse : t.outOfUse}
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
            label={t.materialName}
            type="text"
            fullWidth
            variant="outlined"
            value={tenChatLieu}
            onChange={(e) => setTenChatLieu(e.target.value)}
          />
          <TextField
            margin="dense"
            label={t.description}
            type="text"
            fullWidth
            variant="outlined"
            value={moTaChatLieu}
            onChange={(e) => setMoTaChatLieu(e.target.value)}
          />
          <Select
            margin="dense"
            label={t.materialStatus}
            fullWidth
            variant="outlined"
            value={trangThaiChatLieu}
            onChange={(e) => setTrangThaiChatLieu(e.target.value)}
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
            {currentMaterial ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChatLieuManager;
