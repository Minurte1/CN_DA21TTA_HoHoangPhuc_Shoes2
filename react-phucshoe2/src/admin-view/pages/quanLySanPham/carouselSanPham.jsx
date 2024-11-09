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

const CarouselManager = () => {
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCarouselProduct, setCurrentCarouselProduct] = useState(null);
  const [idSanPham, setIdSanPham] = useState("");
  const [hinhAnhNenCarousel, setHinhAnhNenCarousel] = useState("");
  const [hinhAnhIconCarousel, setHinhAnhIconCarousel] = useState("");
  const [moTaCarousel, setMoTaCarousel] = useState("");
  const [trangThaiCarousel, setTrangThaiCarousel] = useState(1); // Mặc định

  useEffect(() => {
    fetchCarouselProducts();
  }, []);

  const fetchCarouselProducts = async () => {
    try {
      const response = await axios.get(`${api}/carousel-products`); // Update with your API endpoint
      console.log("fetchCarouselProducts", response.data);
      if (response.data.EC === 1) {
        setCarouselProducts(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching carousel products:", error);
    }
  };

  const handleOpenDialog = (carouselProduct = null) => {
    setCurrentCarouselProduct(carouselProduct);
    setIdSanPham(carouselProduct ? carouselProduct.ID_SAN_PHAM : "");
    setHinhAnhNenCarousel(
      carouselProduct ? carouselProduct.HINH_ANH_NEN_CAROUSEL : ""
    );
    setHinhAnhIconCarousel(
      carouselProduct ? carouselProduct.HINH_ANH_ICON_CAROUSEL : ""
    );
    setMoTaCarousel(carouselProduct ? carouselProduct.MO_TA_CAROUSEL : "");
    setTrangThaiCarousel(
      carouselProduct ? carouselProduct.TRANG_THAI_CAROUSEL : 1
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIdSanPham("");
    setCurrentCarouselProduct(null);
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("MO_TA_CAROUSEL", moTaCarousel);
    formData.append("TRANG_THAI_CAROUSEL", trangThaiCarousel);

    // Gửi cả hai ảnh trong một lần
    if (hinhAnhNenCarousel) {
      formData.append("images", hinhAnhNenCarousel); // Ảnh nền
    }
    if (hinhAnhIconCarousel) {
      formData.append("images", hinhAnhIconCarousel); // Ảnh icon
    }

    try {
      let response;
      if (currentCarouselProduct) {
        // Cập nhật sản phẩm carousel
        response = await axios.put(
          `${api}/carousel-products/${currentCarouselProduct.ID_CAROUSEL}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Thêm mới sản phẩm carousel
        response = await axios.post(`${api}/carousel-products/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.EC === 1) {
        fetchCarouselProducts();
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving carousel product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/carousel-products/${id}`);
      fetchCarouselProducts();
    } catch (error) {
      console.error("Error deleting carousel product:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Quản lý Carousel Sản Phẩm
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
          Thêm sản phẩm carousel
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Hình ảnh nền</TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>Hình ảnh icon</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Mô tả</TableCell>{" "}
              <TableCell sx={{ color: "#c9d1d9" }}>Trạng thái</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày tạo</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày cập nhật</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carouselProducts.map((product) => (
              <TableRow key={product.ID_CAROUSEL}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.ID_CAROUSEL}
                </TableCell>{" "}
                <TableCell>
                  <img
                    src={`${api}/images/${product.HINH_ANH_NEN_CAROUSEL}`}
                    alt="Product"
                    width="50"
                  />
                </TableCell>{" "}
                <TableCell>
                  <img
                    src={`${api}/images/${product.HINH_ANH_ICON_CAROUSEL}`}
                    alt="Product"
                    width="50"
                  />
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.MO_TA_CAROUSEL}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.TRANG_THAI_CAROUSEL === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(product.NGAY_TAO_CAROUSEL).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(product.NGAY_CAP_NHAT_CAROUSEL).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(product.ID_CAROUSEL)}
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
          {currentCarouselProduct ? "Sửa Carousel" : "Thêm Carousel"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Hình ảnh nền"
            type="file"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true, // Đảm bảo label vẫn hiển thị nếu có hình ảnh đã chọn
            }}
            onChange={(e) => setHinhAnhNenCarousel(e.target.files[0])} // Lấy file đã chọn
            InputProps={{
              accept: "image/*", // Chỉ cho phép chọn hình ảnh
            }}
          />

          <TextField
            margin="dense"
            label="Hình ảnh icon"
            type="file"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true, // Đảm bảo label vẫn hiển thị nếu có hình ảnh đã chọn
            }}
            onChange={(e) => setHinhAnhIconCarousel(e.target.files[0])} // Lấy file đã chọn
            InputProps={{
              accept: "image/*", // Chỉ cho phép chọn hình ảnh
            }}
          />

          <TextField
            margin="dense"
            label="Mô tả"
            type="text"
            fullWidth
            variant="outlined"
            value={moTaCarousel}
            onChange={(e) => setMoTaCarousel(e.target.value)}
          />
          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            variant="outlined"
            value={trangThaiCarousel}
            onChange={(e) => setTrangThaiCarousel(e.target.value)}
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
            {currentCarouselProduct ? "Sửa" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CarouselManager;
