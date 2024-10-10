import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import {
  createTheater,
  updateTheaterById,
} from "../../../service/theatersService";

const ModalTheater = ({ open, handleClose, formData }) => {
  const [theaterData, setTheaterData] = useState({
    name: "",
    capacity: "",
  });

  useEffect(() => {
    if (formData) {
      setTheaterData(formData); // Set dữ liệu vào form nếu là chỉnh sửa
    }
  }, [formData]);
  useEffect(() => {
    if (!open) {
      setTheaterData({
        title: "",
        synopsis: "",
        releaseDate: "",
        duration: "",
        director: "",
        movieCategoryId: "",
        releaseYear: "",
        genre: "",
        rating: "",
        img: "",
      });
    }
  }, [open]);

  // Xử lý thay đổi dữ liệu form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTheaterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý lưu dữ liệu theater
  const handleSubmit = async () => {
    if (formData) {
      await updateTheaterById(formData.id, theaterData);
    } else {
      await createTheater(theaterData);
    }
    handleClose(); // Đóng modal sau khi lưu
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{formData ? "Chỉnh sửa rạp" : "Thêm mới rạp"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Tên rạp"
          fullWidth
          variant="outlined"
          value={theaterData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="capacity"
          type="number"
          label="capacity"
          fullWidth
          variant="outlined"
          value={theaterData.capacity}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTheater;
