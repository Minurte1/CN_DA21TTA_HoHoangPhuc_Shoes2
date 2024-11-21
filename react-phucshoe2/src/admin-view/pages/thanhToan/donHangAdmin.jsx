import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import moment from "moment";
import axios from "axios";

const DonHangAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3002/don-hang");
      if (response.data.EC === 1) {
        setOrders(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4, mb: 3 }}>
        <Typography variant="h5" color="primary">
          Danh Sách Đơn Hàng
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>ID Đơn Hàng</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Người dùng</b>
              </TableCell>

              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Số điện thoại</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Tỉnh thành</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Tổng Tiền</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Trạng Thái</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Ngày Tạo</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Ngày Cập Nhật</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.ID_ODER || "Không xác định"}
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.HO_TEN}
                </TableCell>

                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.SO_DIEN_THOAI}
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.DIA_CHI_Provinces}
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.TONG_TIEN.toLocaleString()}đ
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.875rem",
                    color:
                      order.TRANG_THAI_DON_HANG ===
                      "Đã thanh toán thành công và đang chờ giao hàng"
                        ? "yellow"
                        : order.TRANG_THAI_DON_HANG === "Hoàn tất"
                        ? "green"
                        : "#ffffff",
                  }}
                >
                  {order.TRANG_THAI_DON_HANG}
                </TableCell>

                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.NGAY_TAO_DONHANG
                    ? moment(order.NGAY_TAO_DONHANG).format("DD/MM/YYYY HH:mm")
                    : "N/A"}
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.NGAY_CAP_NHAT_DONHANG
                    ? moment(order.NGAY_CAP_NHAT_DONHANG).format(
                        "DD/MM/YYYY HH:mm"
                      )
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DonHangAdmin;
