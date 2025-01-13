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

import ProductDetailModal from "./modal/chiTietDonHang";
import { getThemeConfig } from "../../../services/themeService";
import translations from "../../../redux/data/translations";
import { useSelector } from "react-redux";
import ExportExcelModal from "./modal/xuatExcelDonHang";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import GetAppIcon from "@mui/icons-material/GetApp";
import { enqueueSnackbar } from "notistack";
const TatCaDonHangAdmin = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const api = process.env.REACT_APP_URL_SERVER;
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${api}/don-hang`);
      if (response.data.EC === 1) {
        setOrders(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const [openModalExcel, setOpenModalExcel] = useState(false);

  // Hàm mở modal để chọn thời gian và trạng thái
  const handleOpenExportModal = () => {
    setOpenModalExcel(true);
  };

  // Hàm đóng modal
  const handleCloseExportModal = () => {
    setOpenModalExcel(false);
  };
  // Hàm gửi dữ liệu cho API và xuất Excel
  const handleExport = async (startDate, endDate, status) => {
    const api = process.env.REACT_APP_URL_SERVER;
    try {
      const response = await axios.post(`${api}/chi-tiet-hoa-don/all-excel`, {
        startDate,
        endDate,
        status,
      });
      if (response.data.EC === 1) {
        const excelData = response.data.DT;

        // Dữ liệu cho sheet "Hóa Đơn"
        const orderSummaryData = excelData.map((order) => ({
          "Mã đơn hàng": order.ID_ODER,
          "Tên người dùng": order.HO_TEN,
          "Số điện thoại": order.SO_DIEN_THOAI,
          "Địa chỉ": order.DIA_CHI,
          "Phương thức thanh toán": order.PHUONG_THUC_THANH_TOAN,
          "Ngày tạo đơn hàng": order.NGAY_TAO_DONHANG,
          "Tổng tiền đơn hàng": order.TONG_TIEN,
        }));

        // Dữ liệu cho sheet "Chi Tiết Hóa Đơn"
        const orderDetailsData = excelData
          .map((order) => {
            const { chiTietHoaDon } = order;
            return chiTietHoaDon.map((item) => ({
              "Mã đơn hàng": order.ID_ODER,
              "Sản phẩm": item.TEN_SAN_PHAM,
              "Màu sắc": item.TEN_MAU_SAC,
              "Kích cỡ": item.KICH_CO,
              "Số lượng": item.SO_LUONG_SP,
              "Giá sản phẩm": item.GIA_SAN_PHAM_CHI_TIET,
              "Giá tiền: (Giá x Số lượng)":
                item.SO_LUONG_SP * item.GIA_SAN_PHAM_CHI_TIET,
            }));
          })
          .flat();

        // Tạo sheet cho Hóa Đơn
        const orderSummarySheet = XLSX.utils.json_to_sheet(orderSummaryData);

        // Tạo sheet cho Chi Tiết Hóa Đơn
        const orderDetailsSheet = XLSX.utils.json_to_sheet(orderDetailsData);

        // Tạo workbook và thêm các sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, orderSummarySheet, "Hóa Đơn");
        XLSX.utils.book_append_sheet(wb, orderDetailsSheet, "Chi Tiết Hóa Đơn");

        // Xuất file Excel
        const fileName = `hoa_don_${startDate}_${endDate}.xlsx`;
        XLSX.writeFile(wb, fileName);

        // Thông báo xuất thành công
        enqueueSnackbar("Dữ liệu đã được xuất thành công.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Có lỗi xảy ra khi xuất dữ liệu.", { variant: "info" });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.EM || "Lỗi hệ thống", {
        variant: "info",
      });
    } finally {
      setOpenModal(false);
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
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(7); // Number of items per page
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update current page
  };
  // Lấy dữ liệu đơn hàng theo trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem); // Cắt mảng đơn hàng theo trang
  return (
    <Container
      sx={{ height: "auto", backgroundColor: currentTheme.backgroundColor }}
    >
      <Box sx={{ width: "100%", textAlign: "left", mt: 4, mb: 3 }}>
        <Typography variant="h5" color="primary">
          {t.allOrders}
        </Typography>
      </Box>{" "}
      <Box sx={{ width: "100%", textAlign: "left", mt: 4, mb: 3 }}>
        {/* Nút "Xuất Excel" */}
        <Button
          onClick={handleOpenExportModal}
          variant="outlined"
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
          startIcon={<GetAppIcon />}
        >
          Xuất Excel
        </Button>

        {/* Modal chọn khoảng thời gian và trạng thái */}
        <ExportExcelModal
          open={openModalExcel}
          onClose={handleCloseExportModal}
          onExport={handleExport}
        />
      </Box>{" "}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
          height: "100vh",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.orderIdLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.userLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.phoneNumberLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.provinceLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.totalAmountLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.orderStatusLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.createdDateLabel}</b>
              </TableCell>
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.updatedDateLabel}</b>
              </TableCell>{" "}
              <TableCell
                sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
              >
                <b>{t.detailsLabel}</b>
              </TableCell>{" "}
            </TableRow>
          </TableHead>
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
                    color:
                      order.TRANG_THAI_DON_HANG ===
                      "Đã thanh toán thành công và đang chờ giao hàng"
                        ? "#cc7c2c"
                        : order.TRANG_THAI_DON_HANG === "Giao dịch thành công"
                        ? "#73ec8b"
                        : order.TRANG_THAI_DON_HANG === "Đang chờ thanh toán"
                        ? "#cc7c2c"
                        : order.TRANG_THAI_DON_HANG === "Đơn hàng đang giao"
                        ? "#2cadff"
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
                <TableCell
                  sx={{ fontSize: "0.875rem", color: currentTheme.colorTitle }}
                >
                  <Button
                    onClick={() => handleViewDetails(order.ID_DON_HANG)}
                    startIcon={
                      <VisibilityIcon sx={{ color: currentTheme.colorTitle }} />
                    }
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

export default TatCaDonHangAdmin;
