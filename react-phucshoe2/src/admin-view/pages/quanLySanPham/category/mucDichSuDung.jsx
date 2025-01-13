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
import translations from "../../../../redux/data/translations";
import { useSelector } from "react-redux";

const api = process.env.REACT_APP_URL_SERVER;

const MucDichSuDungManager = () => {
  const [purposes, setPurposes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPurpose, setCurrentPurpose] = useState(null);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const [tenMucDichSuDung, setTenMucDichSuDung] = useState("");
  const [trangThaiMucDichSuDung, setTrangThaiMucDichSuDung] = useState(1);
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
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
    <Container
      sx={{
        backgroundColor: currentTheme.backgroundColor,
        height: purposes.length <= 5 ? "100vh" : "auto",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {t.usagePurpose}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            mb: 2,
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
                {t.purposeName}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.createdDate}
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                {t.updatedDate}
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
            {purposes.map((purpose) => (
              <TableRow key={purpose.ID_MUC_DICH_SU_DUNG}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {purpose.ID_MUC_DICH_SU_DUNG}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {purpose.TEN_MUC_DICH_SU_DUNG}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(purpose.CREATE_MUC_DICH_SU_DUNG).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(purpose.UPDATE_MUC_DICH_SU_DUNG).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      purpose.TRANG_THAI_MUC_DICH_SU_DUNG === 1
                        ? "#008000"
                        : "red",
                  }}
                >
                  {purpose.TRANG_THAI_MUC_DICH_SU_DUNG === 1
                    ? t.inUse
                    : t.outOfUse}
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
        <DialogTitle>{currentPurpose ? t.edit : t.add}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.purposeName}
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
            <MenuItem value={1}>{t.inUse}</MenuItem>
            <MenuItem value={0}>{t.outOfUse}</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            {t.cancelButtonLabel}
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentPurpose ? t.save : t.add}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MucDichSuDungManager;
