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
  FormControl,
  InputLabel,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import moment from "moment";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import axios from "axios";
import { getThemeConfig } from "../../../services/themeService";

const api = process.env.REACT_APP_URL_SERVER;

const CarouselManager = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCarouselProduct, setCurrentCarouselProduct] = useState(null);
  const [idSanPham, setIdSanPham] = useState("");
  const [hinhAnhNenCarousel, setHinhAnhNenCarousel] = useState("");
  const [hinhAnhIconCarousel, setHinhAnhIconCarousel] = useState("");
  const [moTaCarousel, setMoTaCarousel] = useState("");
  const [trangThaiCarousel, setTrangThaiCarousel] = useState(1); // Mặc định
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchCarouselProducts();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${api}/san-pham`);
      if (response.data.EC === 1) {
        setProducts(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCarouselProducts = async () => {
    try {
      const response = await axios.get(`${api}/carousel-products`); // Update with your API endpoint

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
    formData.append("ID_SAN_PHAM", idSanPham);
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
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input

  const [filteredProducts, setFilteredProducts] = useState(products);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.TEN_SAN_PHAM.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
          mt: 4,
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
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

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.color }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                Hình ảnh nền
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.color }}>
                Hình ảnh icon
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Mô tả</TableCell>{" "}
              <TableCell sx={{ color: currentTheme.color }}>
                Trạng thái
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Ngày tạo</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                Ngày cập nhật
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carouselProducts.map((product) => (
              <TableRow key={product.ID_CAROUSEL}>
                <TableCell sx={{ color: currentTheme.color }}>
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
                <TableCell sx={{ color: currentTheme.color }}>
                  {product.MO_TA_CAROUSEL}
                </TableCell>{" "}
                <TableCell
                  sx={{
                    color:
                      product.TRANG_THAI_CAROUSEL === 1 ? "#008000" : "red",
                  }}
                >
                  {product.TRANG_THAI_CAROUSEL === 1
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(product.NGAY_TAO_CAROUSEL).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
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
          <FormControl fullWidth margin="dense">
            <Autocomplete
              id="chatLieuId"
              value={
                filteredProducts.find(
                  (product) => product.ID_SAN_PHAM === idSanPham
                ) || null
              } // Kiểm tra và gán giá trị mặc định đúng
              onChange={
                (e, newValue) => setIdSanPham(newValue?.ID_SAN_PHAM || "") // Cập nhật idSanPham khi thay đổi lựa chọn
              }
              options={filteredProducts}
              getOptionLabel={(option) => option.TEN_SAN_PHAM || ""}
              isOptionEqualToValue={(option, value) =>
                option.ID_SAN_PHAM === value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.TEN_SAN_PHAM.toLowerCase().includes(
                    searchTerm.toLowerCase()
                  )
                )
              }
            />
          </FormControl>

          {/* <TextField
            autoFocus
            margin="dense"
            label="ID Sản phẩm"
            type="text"
            fullWidth
            variant="outlined"
            value={idSanPham}
            onChange={(e) => setIdSanPham(e.target.value)}
          /> */}
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
