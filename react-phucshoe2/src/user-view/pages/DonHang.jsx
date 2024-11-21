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
  Pagination,
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Import icon Visibility
import InfoIcon from "@mui/icons-material/Info"; // Import icon Info
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import icon ExpandMore

import { useSelector } from "react-redux";
import ProductDetailModal from "../../admin-view/pages/thanhToan/modal/chiTietDonHang";
const DonHangUser = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const apiUrl = process.env.REACT_APP_URL_SERVER;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/don-hang/${userInfo.ID_NGUOI_DUNG}`
      );
      if (response.data.EC === 1) {
        setOrders(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Hàm mở modal và truyền ID đơn hàng vào
  const handleViewDetails = (orderId) => {
    console.log("orderId", orderId);
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId(null);
  };

  // Hàm xử lý sự kiện thay đổi trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update current page
  };
  // Lấy dữ liệu đơn hàng theo trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem); // Cắt mảng đơn hàng theo trang
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
              </TableCell>{" "}
              <TableCell sx={{ fontSize: "0.875rem", color: "#ffffff" }}>
                <b>Chi Tiết</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order, index) => (
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
                </TableCell>{" "}
                <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                  <Button
                    onClick={() => handleViewDetails(order.ID_DON_HANG)}
                    startIcon={<VisibilityIcon sx={{ color: "#26bbff" }} />}
                  ></Button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      {/* Pagination */}
      <Pagination
        count={Math.ceil(orders.length / itemsPerPage)} // Tổng số trang
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          ".MuiPagination-ul": {
            borderRadius: "8px", // Bo góc
            padding: "4px 8px", // Khoảng cách bên trong
          },
          ".MuiPaginationItem-root": {
            color: "#c9d1d9", // Màu chữ đen
            fontWeight: "bold", // Chữ đậm
          },
          ".Mui-selected": {
            color: "#ffffff", // Màu chữ trắng
          },
          ".MuiPaginationItem-ellipsis": {
            color: "#999999", // Màu cho dấu "..."
          },
        }}
      />
      {/* Modal hiển thị thông tin chi tiết */}
      {openModal && (
        <ProductDetailModal
          productId={selectedOrderId} // Truyền ID đơn hàng vào modal
          onClose={handleCloseModal} // Hàm đóng modal
        />
      )}
    </Container>
  );
};

export default DonHangUser;
