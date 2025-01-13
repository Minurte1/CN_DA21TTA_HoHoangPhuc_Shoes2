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

const KichCoManager = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const [kichCoList, setKichCoList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentKichCo, setCurrentKichCo] = useState(null);
  const [kichCo, setKichCo] = useState("");
  const [trangThaiKichCo, setTrangThaiKichCo] = useState(1);
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
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
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          {t.Size}
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
                {t.Size}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDateLabel}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.dateUpdated}
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
            {kichCoList.map((kichCoItem) => (
              <TableRow key={kichCoItem.ID_KICH_CO}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {kichCoItem.ID_KICH_CO}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {kichCoItem.KICH_CO}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(kichCoItem.CREATED_KICH_CO).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(kichCoItem.UPDATE_KICH_CO).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      kichCoItem.TRANG_THAI_KICH_CO === "1" ? "#008000" : "red",
                  }}
                >
                  {kichCoItem.TRANG_THAI_KICH_CO === "1" ? t.inUse : t.outOfUse}
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
        <DialogTitle>{currentKichCo ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.Size}
            type="text"
            fullWidth
            variant="outlined"
            value={kichCo}
            onChange={(e) => setKichCo(e.target.value)}
          />

          <Select
            margin="dense"
            label={t.orderStatusLabel}
            fullWidth
            variant="outlined"
            value={trangThaiKichCo}
            onChange={(e) => setTrangThaiKichCo(e.target.value)}
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
            {currentKichCo ? t.edit : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default KichCoManager;
