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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const ChatLieuManager = () => {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [materialName, setMaterialName] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("/api/chatlieu"); // Update to your API endpoint
      setMaterials(response.data.DT);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleOpenDialog = (material = null) => {
    setCurrentMaterial(material);
    setMaterialName(material ? material.TEN_CHAT_LIEU : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMaterialName("");
    setCurrentMaterial(null);
  };

  const handleSave = async () => {
    try {
      if (currentMaterial) {
        // Update material
        await axios.put(`/api/chatlieu/${currentMaterial.ID_CHAT_LIEU}`, {
          tenChatLieu: materialName,
        });
      } else {
        // Add new material
        await axios.post("/api/chatlieu", { tenChatLieu: materialName });
      }
      fetchMaterials();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving material:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/chatlieu/${id}`);
      fetchMaterials();
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" gutterBottom>
        Material Manager
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Add Material
      </Button>
      <TableContainer component={Paper} sx={{ backgroundColor: "#161b22" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Name</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.ID_CHAT_LIEU}>
                <TableCell>{material.ID_CHAT_LIEU}</TableCell>
                <TableCell>{material.TEN_CHAT_LIEU}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(material)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(material.ID_CHAT_LIEU)}
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
          {currentMaterial ? "Edit Material" : "Add New Material"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Material Name"
            type="text"
            fullWidth
            variant="outlined"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {currentMaterial ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChatLieuManager;
