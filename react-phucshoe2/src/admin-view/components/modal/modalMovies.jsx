/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { createMovies, updateMovieById } from "../../../service/moviesServices";
import { getAllMovieCategories } from "../../../service/categoriesService";
// import { onUpLoadFile } from "../../../service/fileService";

const MovieModal = ({ open, handleClose, selectedMovies, getAllMovieData }) => {
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    releaseDate: "",
    duration: "",
    director: "",
    movieCategoryId: "",
    genre: "",
    releaseYear: "",
    rating: 0,
    img: "",
  });

  const [dataCategories, setDataCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState(null);

  useEffect(() => {
    if (selectedMovies) {
      setFormData({
        title: selectedMovies.title,
        synopsis: selectedMovies.synopsis,
        releaseDate: selectedMovies.releaseDate,
        duration: selectedMovies.duration,
        director: selectedMovies.director,
        movieCategoryId: selectedMovies.movieCategoryId,
        releaseYear: selectedMovies.releaseYear,
        genre: selectedMovies.genre,
        rating: selectedMovies.rating,
        img: selectedMovies.img,
      });
    } else {
      // Chỉ gọi khi mở modal mà không có selectedMovies
      getMovieCategories();
    }
    if (!open) {
      setFormData({
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
  }, [open, selectedMovies]);

  const getMovieCategories = async () => {
    const response = await getAllMovieCategories();
    if (response.EC === 1) {
      setDataCategories(response.DT);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file, // Đặt file trực tiếp vào formData
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Xử lý các input khác
      });
    }
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    console.log("check ", selectedMovies);
    e.preventDefault();

    try {
      if (selectedMovies) {
        if (formData) {
          const response = await updateMovieById(selectedMovies.id, formData); // Gọi API cập nhật

          if (response.EC === 1) {
            alert("Chỉnh sửa phim thành công");
            getAllMovieData();
            setFormData({
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

            handleClose();
          }
        }
      } else {
        // Logic thêm mới
        const response = await createMovies(formData);
        console.log(response);
        alert("Tạo phim thành công");
        if (response.EC === 1) {
          getAllMovieData();
          setFormData({
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

          handleClose();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi.");
    }
  };

  const handleCloseModal = () => {
    setFormData({
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
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="movieModalLabel">Tạo mới phim</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Tiêu đề */}
          <TextField
            margin="dense"
            label="Tên Phim"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* Tóm tắt */}

          <FormControl fullWidth margin="dense">
            <InputLabel
              id="movieCategory-label"
              shrink={Boolean(formData.movieCategoryId)}
            >
              Thể loại phim
            </InputLabel>
            <Select
              labelId="movieCategory-label"
              id="movieCategoryId"
              name="movieCategoryId"
              label="ID danh mục phim"
              value={formData.movieCategoryId}
              onChange={handleChange}
              required
            >
              {dataCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({
                  ...formData,
                  img: file,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "16.5px 14px",
                fontSize: "1rem",
                lineHeight: "1.4375em",
                backgroundColor: "#fff",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                color: "rgba(0, 0, 0, 0.87)",
                boxSizing: "border-box",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #3f51b5")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(0, 0, 0, 0.23)")
              }
            />
          </Box>

          <TextField
            margin="dense"
            label="Tóm tắt"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          {/* Ngày phát hành */}
          <Box sx={{ marginTop: 2 }}>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "16.5px 14px",
                fontSize: "1rem",
                lineHeight: "1.4375em",
                backgroundColor: "#fff",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                color: "rgba(0, 0, 0, 0.87)",
                boxSizing: "border-box",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #3f51b5")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(0, 0, 0, 0.23)")
              }
            />
          </Box>
          {/* Thời lượng */}
          <TextField
            margin="dense"
            label="Thời lượng (phút)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
            required
          />
          {/* Đạo diễn */}
          <TextField
            margin="dense"
            label="Đạo diễn"
            name="director"
            value={formData.director}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            margin="dense"
            label="Năm phát hành"
            name="releaseYear"
            type="number"
            value={formData.releaseYear}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            margin="dense"
            label="Thể loại"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            fullWidth
            required
          />
          {/* Đánh giá */}

          <TextField
            margin="dense"
            label="Đánh giá"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            fullWidth
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="primary"
          size="small"
        >
          {selectedMovies ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
        <Button
          onClick={handleCloseModal}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieModal;
