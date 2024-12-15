import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getThemeConfig } from "../../services/themeService";

const LichSuMuaHangUser = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const apiUrl = process.env.REACT_APP_URL_SERVER;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [dataChiTietHoaDon, setDataChiTietHoaDon] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Trạng thái mở modal
  const [actionType, setActionType] = useState(""); // Loại hành động (success or canceled)
  const [currentOrderId, setCurrentOrderId] = useState(null); // ID đơn hàng hiện tại
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );

  const navigate = useNavigate();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  // Gọi API khi tabIndex thay đổi
  useEffect(() => {
    fetchData();
  }, [tabIndex]);

  const fetchData = async () => {
    try {
      // Xác định endpoint API dựa trên tabIndex
      let endpoint = "";
      switch (tabIndex) {
        case 0: // Chờ xác nhận
          endpoint = `${apiUrl}/chi-tiet-hoa-don/dang-xu-ly/${userInfo.ID_NGUOI_DUNG}`;
          break;
        case 1: // Đã giao
          endpoint = `${apiUrl}/chi-tiet-hoa-don/giao-dich-thanh-cong/${userInfo.ID_NGUOI_DUNG}`;
          break;
        case 2: // Đã hủy
          endpoint = `${apiUrl}/chi-tiet-hoa-don/giao-dich-huy/${userInfo.ID_NGUOI_DUNG}`;
          break;

        default:
          endpoint = `${apiUrl}/chi-tiet-hoa-don/cho-thanh-toan/${userInfo.ID_NGUOI_DUNG}`;
      }

      // Gọi API với endpoint tương ứng
      const response = await axios.get(endpoint);

      if (response.data.EC === 1) {
        setDataChiTietHoaDon(response.data.DT);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };
  const handleUpdateStatusCanceled = async (orderId) => {
    try {
      // Gửi yêu cầu cập nhật trạng thái "Đã hủy"
      const response = await axios.put(
        `${apiUrl}/don-hang/${orderId}/canceled`
      );

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM); // Thông báo thành công
      } else {
        enqueueSnackbar(response.data.EM); // Thông báo lỗi
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      enqueueSnackbar("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
    } finally {
      fetchData();
    }
  }; // Mở modal với Hỏi update
  const handleOpenDialog = (type, orderId) => {
    setActionType(type);
    setCurrentOrderId(orderId);
    setOpenDialog(true);
  };

  // Đóng modal
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActionType("");
    setCurrentOrderId(null);
  }; // Xử lý khi người dùng xác nhận hành động trong modal
  const handleConfirmAction = () => {
    if (actionType === "canceled" && currentOrderId) {
      handleUpdateStatusCanceled(currentOrderId);
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 2, bgcolor: currentTheme.backgroundColor, height: "auto" }}>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <Tab sx={{ color: currentTheme.color }} label="Chờ xác nhận" />
        <Tab sx={{ color: currentTheme.color }} label="Đã giao" />
        <Tab sx={{ color: currentTheme.color }} label="Đã hủy" />
        {/* <Tab sx={{ color: color }} label="Tất cả" /> */}
        <Tab sx={{ color: currentTheme.color }} label="Chưa thanh toán" />
      </Tabs>
      {/* Danh sách đơn hàng */}
      <Box
        mt={2}
        sx={{ backgroundColor: currentTheme.backgroundColor, height: "100vh" }}
      >
        {dataChiTietHoaDon?.map((order, index) => (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: currentTheme.backgroundColor,
              }}
            >
              {" "}
              <Paper
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  textAlign: "left",
                  backgroundColor: currentTheme.backgroundColor,
                  color: currentTheme.color,
                }}
              >
                {" "}
                <Divider sx={{ my: 1, backgroundColor: "#555" }} />
                {/* Thông tin đơn hàng */}
                <Typography variant="h6" sx={{ color: currentTheme.color }}>
                  {order.ID_ODER}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: currentTheme.color }}
                >
                  Trạng thái:
                  <Typography
                    component="span"
                    sx={{
                      ml: 2,
                      fontWeight: 600,
                      color:
                        order.TRANG_THAI_DON_HANG === "Giao dịch thành công"
                          ? "#5ab96c"
                          : order.TRANG_THAI_DON_HANG ===
                            "Đã thanh toán thành công và đang chờ giao hàng"
                          ? "#cc7c2c"
                          : order.TRANG_THAI_DON_HANG === "Đang chờ thanh toán"
                          ? "#cc7c2c"
                          : order.TRANG_THAI_DON_HANG === "Đã hủy"
                          ? "red"
                          : currentTheme.color, // Bạn có thể thêm một màu mặc định nếu không khớp với bất kỳ điều kiện nào
                    }}
                  >
                    {order.TRANG_THAI_DON_HANG} || Với phương thức thanh toán{" "}
                    {order.PHUONG_THUC_THANH_TOAN}
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, color: currentTheme.color }}
                >
                  Tổng tiền: {order.TONG_TIEN.toLocaleString("vi-VN")}₫
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Danh sách sản phẩm */}
                {order.chiTietHoaDon?.map((product, prodIndex) => (
                  <Box
                    key={prodIndex}
                    display="flex"
                    alignItems="center"
                    sx={{
                      mb: 2,
                      backgroundColor: currentTheme.backgroundColor,
                    }}
                  >
                    <img
                      src={`${apiUrl}/images/${product.HINH_ANH_SANPHAM}`}
                      alt={product.HINH_ANH_SANPHAM}
                      style={{ width: 80, height: 80, marginRight: 16 }}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="body1">
                        {product.TEN_SAN_PHAM}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: currentTheme.color }}
                      >
                        Số lượng: {product.SO_LUONG_SP}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mt: 1, color: currentTheme.color }}
                      >
                        Giá:{" "}
                        {product.GIA_SAN_PHAM_CHI_TIET.toLocaleString("vi-VN")}₫
                      </Typography>
                    </Box>{" "}
                    {tabIndex === 1 ? (
                      <>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "green",
                            borderColor: (theme) =>
                              product.DANH_GIA !== null
                                ? "transparent"
                                : "green",
                            ":hover": { bgcolor: "rgba(0, 128, 0, 0.1)" },
                            "&.Mui-disabled": {
                              borderColor: "transparent", // Ẩn viền khi button bị disabled
                              color: "gray", // Tùy chỉnh màu chữ khi bị disable
                            },
                          }}
                          onClick={() =>
                            navigate(`/profile/danh-gia/${order.ID_DON_HANG}`)
                          }
                          disabled={product.DANH_GIA !== null}
                        >
                          {product.DANH_GIA !== null
                            ? "Đã Đánh Giá"
                            : "Đánh Giá"}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            ml: 2,
                            color: "#f60",
                            borderColor: "#f60",
                            ":hover": { bgcolor: "rgba(0, 0, 255, 0.1)" },
                          }}
                        >
                          Mua lại
                        </Button>{" "}
                      </>
                    ) : (
                      false
                    )}
                  </Box>
                ))}
              </Paper>{" "}
              {tabIndex === 0 ? (
                <>
                  {" "}
                  {/* Nút "Đã hủy" */}
                  <Button
                    variant="outlined"
                    sx={{
                      color: "red",
                      mr: 4,
                      mt: 4,
                      height: "50px",
                      width: "120px",
                      borderRadius: "10px",
                    }}
                    onClick={() =>
                      handleOpenDialog("canceled", order.ID_DON_HANG)
                    }
                    // startIcon={<CancelIcon sx={{ color: "#26bbff" }} />}
                  >
                    Hủy đơn
                  </Button>
                </>
              ) : (
                false
              )}{" "}
            </Box>
          </>
        ))}
      </Box>{" "}
      {/* Modal xác nhận */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận hành động</DialogTitle>
        <DialogContent>
          {actionType === "success" ? (
            <p>
              Bạn có chắc chắn muốn đánh dấu đơn hàng này là "Giao dịch thành
              công"?
            </p>
          ) : (
            <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LichSuMuaHangUser;
