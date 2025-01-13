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
import { getThemeConfig } from "../../../../services/themeService";
import { useSelector } from "react-redux";
import translations from "../../../../redux/data/translations";
const api = process.env.REACT_APP_URL_SERVER;

const MauSacManager = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [mauSacList, setMauSacList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMauSac, setCurrentMauSac] = useState(null);
  const [tenMau, setTenMau] = useState("");
  const [trangThaiMauSac, setTrangThaiMauSac] = useState("");
  const [maMauSac, setMaMauSac] = useState("");
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

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
    setMaMauSac(mauSacItem ? mauSacItem.MA_MAU : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTenMau("");
    setCurrentMauSac(null);
  };

  const handleSave = async () => {
    const mauSacData = { tenMau, trangThaiMauSac, maMauSac };
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
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {t.color}
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

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.colorTitle }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.colorName}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.colorCode}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDateLabel}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.updatedDateLabel}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.orderStatusLabel}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mauSacList.map((mauSacItem) => (
              <TableRow key={mauSacItem.MAU_SAC_ID}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {mauSacItem.MAU_SAC_ID}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {mauSacItem.TEN_MAU_SAC}
                </TableCell>{" "}
                <TableCell sx={{ color: currentTheme.color }}>
                  <div
                    style={{
                      backgroundColor: mauSacItem.MA_MAU,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                  ></div>
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(mauSacItem.CREATE_MAU_SAC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(mauSacItem.UPDATE_MAU_SAC).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      mauSacItem.TRANG_THAI_MAU_SAC === 1 ? "#008000" : "red",
                  }}
                >
                  {mauSacItem.TRANG_THAI_MAU_SAC === 1 ? t.inUse : t.outOfUse}
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
        <DialogTitle>{currentMauSac ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.colorName}
            type="text"
            fullWidth
            variant="outlined"
            value={tenMau}
            onChange={(e) => setTenMau(e.target.value)}
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            label={t.colorCode}
            type="text"
            fullWidth
            variant="outlined"
            value={maMauSac}
            onChange={(e) => setMaMauSac(e.target.value)}
          />{" "}
          <Select
            margin="dense"
            label={t.status}
            fullWidth
            variant="outlined"
            value={trangThaiMauSac}
            onChange={(e) => setTrangThaiMauSac(e.target.value)}
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
            {currentMauSac ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MauSacManager;
