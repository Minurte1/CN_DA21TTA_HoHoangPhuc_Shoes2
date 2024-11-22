import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LichSuMuaHangUser = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const apiUrl = process.env.REACT_APP_URL_SERVER;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [dataChiTietHoaDon, setDataChiTietHoaDon] = useState([]);

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
        case 3: // Tất cả
          endpoint = `${apiUrl}/chi-tiet-hoa-don/${userInfo.ID_NGUOI_DUNG}`;
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
  console.log("dataChiTietHoaDon", dataChiTietHoaDon);
  return (
    <Box sx={{ p: 2, bgcolor: "#f6f6f6" }}>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Chờ xác nhận" />
        <Tab label="Đã giao" />
        <Tab label="Đã hủy" />
        <Tab label="Tất cả" />
        <Tab label="Chưa thanh toán" />
      </Tabs>

      {/* Danh sách đơn hàng */}
      <Box mt={2}>
        {dataChiTietHoaDon?.map((order, index) => (
          <Paper key={index} sx={{ mb: 2, p: 2, textAlign: "left" }}>
            {/* Thông tin đơn hàng */}
            <Typography variant="h6">{order.ID_ODER}</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              Trạng thái:{" "}
              <Typography
                component="span"
                sx={{
                  color:
                    order.TRANG_THAI_DON_HANG === "Giao dịch thành công"
                      ? "green"
                      : "text.secondary",
                }}
              >
                {order.TRANG_THAI_DON_HANG}
              </Typography>
            </Typography>

            <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
              Tổng tiền: {order.TONG_TIEN.toLocaleString("vi-VN")}₫
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Danh sách sản phẩm */}
            {order.chiTietHoaDon?.map((product, prodIndex) => (
              <Box
                key={prodIndex}
                display="flex"
                alignItems="center"
                sx={{ mb: 2 }}
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
                  <Typography variant="body2" color="text.secondary">
                    Số lượng: {product.SO_LUONG_SP}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: "#f60" }}>
                    Giá: {product.GIA_SAN_PHAM_CHI_TIET.toLocaleString("vi-VN")}
                    ₫
                  </Typography>
                </Box>{" "}
                {tabIndex === 1 ? (
                  <>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "green",
                        borderColor: "green",
                        ":hover": { bgcolor: "rgba(0, 128, 0, 0.1)" },
                      }}
                      onClick={() =>
                        navigate(`/profile/danh-gia/${order.ID_DON_HANG}`)
                      }
                      disabled={product.DANH_GIA !== null} // Kiểm tra điều kiện nếu DANH_GIA khác null thì vô hiệu hóa button
                    >
                      Đánh giá
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
                    </Button>
                  </>
                ) : (
                  false
                )}
              </Box>
            ))}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default LichSuMuaHangUser;
