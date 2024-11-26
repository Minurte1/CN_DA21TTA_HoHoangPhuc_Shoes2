import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Grid,
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ProductDetailModal = ({ productId, onClose }) => {
  const [productDetails, setProductDetails] = useState(null);
  const api = process.env.REACT_APP_URL_SERVER;

  // Hàm lấy thông tin chi tiết sản phẩm
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${api}/chi-tiet-hoa-don/${productId}`);
      if (response.data) {
        setProductDetails(response.data.DT); // Lưu dữ liệu vào state
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch thông tin chi tiết khi productId thay đổi
  useEffect(() => {
    if (productId) {
      fetchProductDetails(); // Gọi hàm fetchProductDetails khi có productId
    }
  }, [productId]);

  if (!productDetails) return null; // Nếu chưa có dữ liệu thì không render gì

  const { chiTietHoaDon } = productDetails;
  console.log(productDetails);
  return (
    <Dialog
      open={Boolean(productId)}
      onClose={onClose}
      maxWidth="md" // Tăng kích thước modal (md = medium, bạn có thể thay đổi thành lg để modal rộng hơn)
      fullWidth // Để modal chiếm hết chiều rộng có thể
    >
      <DialogTitle>Chi Tiết Đơn Hàng</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {/* Cột bên trái chứa thông tin khách hàng */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6">Thông tin khách hàng:</Typography>
            <Typography>Email: {productDetails.EMAIL}</Typography>
            <Typography>
              Số điện thoại: {productDetails.SO_DIEN_THOAI_DON_HANG}
            </Typography>
            <Typography>
              Địa chỉ đơn hàng: {productDetails.DIA_CHI_DON_HANG}
            </Typography>
            <Typography>
              Ngày tạo đơn hàng:{" "}
              {new Date(productDetails.NGAY_TAO_DONHANG).toLocaleString()}
            </Typography>
            <Typography>
              Phương thức thanh toán: {productDetails.PHUONG_THUC_THANH_TOAN}
            </Typography>
            <Typography>
              Trạng thái đơn hàng: {productDetails.TRANG_THAI_DON_HANG}
            </Typography>
            <Typography>Mã đơn hàng: {productDetails.ID_ODER || ""}</Typography>
            <Typography>
              Mã hệ thống: {productDetails.ID_DON_HANG || ""}
            </Typography>{" "}
            <Typography>
              Tổng tiền đơn hàng:{" "}
              <b>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(productDetails.TONG_TIEN || 0)}
              </b>
            </Typography>
          </Grid>

          {/* Cột bên phải chứa Avatar */}
          <Grid item xs={12} md={4} sx={{ justifyContent: "flex-end" }}>
            {" "}
            <Typography variant="h6">Thông tin người dùng:</Typography>
            <Avatar
              src={`${api}/images/${productDetails.AVATAR}`}
              alt="Avatar"
              sx={{ width: 100, height: 100 }}
            />{" "}
            <Typography>Họ tên: {productDetails.HO_TEN}</Typography>
            <Typography>
              Ngày sinh:{" "}
              {new Date(productDetails.NGAY_SINH).toLocaleDateString()}
            </Typography>
            <Typography>
              Vai trò: {productDetails.VAI_TRO === "0" ? "Người dùng" : "Admin"}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Thông tin sản phẩm:
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Sản phẩm</strong>
                </TableCell>
                <TableCell>
                  <strong>Giá</strong>
                </TableCell>
                <TableCell>
                  <strong>Số lượng</strong>
                </TableCell>{" "}
                <TableCell>
                  <strong>Thành tiền</strong>
                </TableCell>{" "}
                <TableCell>
                  <strong>Mô tả</strong>
                </TableCell>
                <TableCell>
                  <strong>Thương hiệu</strong>
                </TableCell>
                <TableCell>
                  <strong>Danh mục</strong>
                </TableCell>
                <TableCell>
                  <strong>Giới tính</strong>
                </TableCell>
                <TableCell>
                  <strong>Chất liệu</strong>
                </TableCell>
                <TableCell>
                  <strong>Phong cách</strong>
                </TableCell>
                <TableCell>
                  <strong>Màu sắc</strong>
                </TableCell>
                <TableCell>
                  <strong>Mục đích sử dụng</strong>
                </TableCell>
                <TableCell>
                  <strong>Kích cỡ</strong>
                </TableCell>{" "}
                <TableCell>
                  <strong>Hình ảnh</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chiTietHoaDon.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.TEN_SAN_PHAM}</TableCell>{" "}
                  <TableCell>
                    {" "}
                    <b>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.GIA || 0)}
                    </b>
                  </TableCell>{" "}
                  <TableCell>{item.SO_LUONG_SP}</TableCell>{" "}
                  <TableCell>
                    {" "}
                    <b>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.GIA_SAN_PHAM_CHI_TIET || 0)}
                    </b>{" "}
                  </TableCell>{" "}
                  <TableCell>{item.MO_TA_SAN_PHAM}</TableCell>
                  <TableCell>{item.TEN_THUONG_HIEU}</TableCell>
                  <TableCell>{item.TEN_DANH_MUC}</TableCell>
                  <TableCell>{item.TEN_GIOI_TINH}</TableCell>
                  <TableCell>{item.TEN_CHAT_LIEU_}</TableCell>
                  <TableCell>{item.TEN_PHONG_CACH}</TableCell>
                  <TableCell>{item.TEN_MAU_SAC}</TableCell>
                  <TableCell>{item.TEN_MUC_DICH_SU_DUNG}</TableCell>
                  <TableCell>{item.KICH_CO}</TableCell>{" "}
                  <TableCell>
                    <img
                      src={`${api}/images/${item.HINH_ANH_SANPHAM}`}
                      alt="Avatar"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain", // Đảm bảo ảnh giữ tỷ lệ mà không bị bóp méo
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
