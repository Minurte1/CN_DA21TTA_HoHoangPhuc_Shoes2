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
  Divider,
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Import icon Visibility
import InfoIcon from "@mui/icons-material/Info"; // Import icon Info
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import icon ExpandMore

import { useSelector } from "react-redux";
import ProductDetailModal from "../../admin-view/pages/thanhToan/modal/chiTietDonHang";
import { getThemeConfig } from "../../services/themeService";
import translations from "../../redux/data/translations";
const DonHangUser = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const apiUrl = process.env.REACT_APP_URL_SERVER;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(5); // Number of items per page
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
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
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Container
      sx={{
        height: currentOrders.length <= 5 ? "100vh" : "auto", // Kiểm tra số lượng sản phẩm
        backgroundColor: currentTheme.backgroundColor,
      }}
    >
      <Box
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          width: "100%",
          textAlign: "left",
          mt: 4,
          mb: 3,
        }}
      >
        <Typography variant="h5" color="primary">
          {t.orderListLabel}
        </Typography>
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
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.orderIdLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.userLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.phoneNumberLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.provinceLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.totalAmountLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.orderStatusLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.createdDateLabel}</b>
              </TableCell>
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.updatedDateLabel}</b>
              </TableCell>{" "}
              <TableCell sx={{ fontSize: "0.875rem", color: "#26bbff" }}>
                <b>{t.detailsLabel}</b>
              </TableCell>
            </TableRow>
          </TableHead>{" "}
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
                  {order.ID_ODER || "Không xác định"}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
                  {order.HO_TEN}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
                  {order.SO_DIEN_THOAI}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
                  {order.DIA_CHI_Provinces}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
                  {order.TONG_TIEN.toLocaleString()}đ
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color:
                      order.TRANG_THAI_DON_HANG ===
                      "Đã thanh toán thành công và đang chờ giao hàng"
                        ? "yellow"
                        : order.TRANG_THAI_DON_HANG === "Giao dịch thành công"
                        ? "#5ab96c"
                        : order.TRANG_THAI_DON_HANG === "Đang chờ thanh toán"
                        ? "#cc7c2c"
                        : "red",
                  }}
                >
                  {order.TRANG_THAI_DON_HANG}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
                  {order.NGAY_TAO_DONHANG
                    ? moment(order.NGAY_TAO_DONHANG).format("DD/MM/YYYY HH:mm")
                    : "N/A"}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.color }}
                >
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
            color: currentTheme.color, // Màu chữ trắng
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
