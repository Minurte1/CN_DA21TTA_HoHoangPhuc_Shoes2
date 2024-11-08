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
} from "@mui/material";
import moment from "moment";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const api = process.env.REACT_APP_URL_SERVER;

const SanPhamManager = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [gioiTinh, setGioiTinh] = useState([]);

  const [formData, setFormData] = useState({
    idThuongHieu: "",
    idDanhMuc: "",
    gioiTinhId: "",
    chatLieuId: "",
    tenSanPham: "",
    gia: "",
    moTaSanPham: "",
    hinhAnhSanPham: "",
    trangThaiSanPham: 1,
    soLuongSanPham: "",
  });

  useEffect(() => {
    fetchData();
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
  const fetchData = async () => {
    try {
      const [
        thuongHieuResponse,
        danhMucResponse,
        chatLieuResponse,
        gioiTinhResponse,
      ] = await Promise.all([
        axios.get(`${api}/thuong-hieu/use`),
        axios.get(`${api}/loai-danh-muc/use`),
        axios.get(`${api}/chat-lieu/use`),
        axios.get(`${api}/gioi-tinh/use`),
      ]);

      if (thuongHieuResponse.data.EC === 1) {
        setThuongHieu(thuongHieuResponse.data.DT);
      }
      if (danhMucResponse.data.EC === 1) {
        setDanhMuc(danhMucResponse.data.DT);
      }
      if (chatLieuResponse.data.EC === 1) {
        setChatLieu(chatLieuResponse.data.DT);
      }
      if (gioiTinhResponse.data.EC === 1) {
        setGioiTinh(gioiTinhResponse.data.DT);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenDialog = (product = null) => {
    setCurrentProduct(product);
    setFormData({
      idThuongHieu: product ? product.ID_THUONG_HIEU : "",
      idDanhMuc: product ? product.ID_DANH_MUC : "",
      gioiTinhId: product ? product.GIOI_TINH_ID : "",
      chatLieuId: product ? product.CHAT_LIEU_ID : "",
      tenSanPham: product ? product.TEN_SAN_PHAM : "",
      gia: product ? product.GIA : "",
      moTaSanPham: product ? product.MO_TA_SAN_PHAM : "",
      hinhAnhSanPham: product ? product.HINH_ANH_SANPHAM : "",
      trangThaiSanPham: product ? product.TRANG_THAI_SANPHAM : 1,
      trangThaiSanPham: product ? product.SO_LUONG_SANPHAM : 1,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct(null);
    setFormData({
      idThuongHieu: "",
      idDanhMuc: "",
      gioiTinhId: "",
      chatLieuId: "",
      tenSanPham: "",
      gia: "",
      moTaSanPham: "",
      hinhAnhSanPham: "",
      trangThaiSanPham: 1,
      soLuongSanPham: "",
    });
  };

  const handleSave = async () => {
    try {
      if (currentProduct) {
        // Update product
        await axios.put(
          `${api}/san-pham/${currentProduct.ID_SAN_PHAM}`,
          formData
        );
      } else {
        // Create new product
        await axios.post(`${api}/san-pham`, formData);
      }
      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/san-pham/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Quản lý sản phẩm
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#c9d1d9" }}>ID</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Thương hiệu</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Thể loại</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Giá tiền</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Mô tả</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Hình ảnh</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Trạng thái</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                Ngày thêm vào hệ thống
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Ngày cập nhật</TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.ID_SAN_PHAM}>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.ID_SAN_PHAM}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.ID_THUONG_HIEU}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.ID_DANH_MUC}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.TEN_SAN_PHAM}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>{product.GIA}</TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.MO_TA_SAN_PHAM}
                </TableCell>
                <TableCell>
                  <img
                    src={product.HINH_ANH_SANPHAM}
                    alt="Product"
                    width="50"
                  />
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.TRANG_THAI_SANPHAM === 1
                    ? "Đang hoạt động"
                    : "Ngưng hoạt động"}
                </TableCell>{" "}
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {product.SO_LUONG_SANPHAM}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(product.NGAY_TAO_SANPHAM).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell sx={{ color: "#c9d1d9" }}>
                  {moment(product.NGAY_CAP_NHAT_SANPHAM).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(product)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(product.ID_SAN_PHAM)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding/Editing Product */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="thuong-hieu-label">Thương hiệu</InputLabel>
            <Select
              labelId="thuong-hieu-label"
              id="idThuongHieu"
              name="idThuongHieu"
              value={formData.idThuongHieu}
              onChange={handleChange}
              fullWidth
            >
              {thuongHieu.map((thuongHieuItem) => (
                <MenuItem
                  key={thuongHieuItem.ID_THUONG_HIEU}
                  value={thuongHieuItem.ID_THUONG_HIEU}
                >
                  {thuongHieuItem.TEN_THUONG_HIEU}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="thuong-hieu-label">Thể loại</InputLabel>
            <Select
              labelId="thuong-hieu-label"
              id="idDanhMuc"
              name="idDanhMuc"
              value={formData.idDanhMuc}
              onChange={handleChange}
              fullWidth
            >
              {danhMuc.map((thuongHieuItem) => (
                <MenuItem
                  key={thuongHieuItem.ID_DANH_MUC}
                  value={thuongHieuItem.ID_DANH_MUC}
                >
                  {thuongHieuItem.TEN_DANH_MUC}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <FormControl fullWidth margin="dense">
            <InputLabel id="thuong-hieu-label">Thể loại</InputLabel>
            <Select
              labelId="thuong-hieu-label"
              id="gioiTinhId"
              name="gioiTinhId"
              value={formData.gioiTinhId}
              onChange={handleChange}
              fullWidth
            >
              {gioiTinh.map((thuongHieuItem) => (
                <MenuItem
                  key={thuongHieuItem.GIOI_TINH_ID}
                  value={thuongHieuItem.GIOI_TINH_ID}
                >
                  {thuongHieuItem.TEN_GIOI_TINH}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <FormControl fullWidth margin="dense">
            <InputLabel id="thuong-hieu-label">Thể loại</InputLabel>
            <Select
              labelId="thuong-hieu-label"
              id="chatLieuId"
              name="chatLieuId"
              value={formData.chatLieuId}
              onChange={handleChange}
              fullWidth
            >
              {chatLieu.map((thuongHieuItem) => (
                <MenuItem
                  key={thuongHieuItem.CHAT_LIEU_ID_}
                  value={thuongHieuItem.CHAT_LIEU_ID_}
                >
                  {thuongHieuItem.TEN_CHAT_LIEU_}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Tên sản phẩm"
            type="text"
            fullWidth
            name="tenSanPham"
            value={formData.tenSanPham}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            type="text"
            fullWidth
            name="moTaSanPham"
            value={formData.moTaSanPham}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Giá tiền"
            type="number"
            fullWidth
            name="gia"
            value={formData.gia}
            onChange={handleChange}
          />{" "}
          <TextField
            margin="dense"
            label="Số lượng sản phẩm"
            type="number"
            fullWidth
            name="soLuongSanPham"
            value={formData.soLuongSanPham}
            onChange={handleChange}
          />
          <Select
            fullWidth
            label="Trạng thái"
            name="trangThaiSanPham"
            value={formData.trangThaiSanPham}
            onChange={handleChange}
          >
            <MenuItem value={1}>Đang hoạt động</MenuItem>
            <MenuItem value={0}>Ngưng hoạt động</MenuItem>
          </Select>{" "}
          <TextField
            margin="dense"
            label="Hình ảnh sản phẩm"
            type="file"
            fullWidth
            name="hinhAnhSanPham"
            value={formData.hinhAnhSanPham}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SanPhamManager;
