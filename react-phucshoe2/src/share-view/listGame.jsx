import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import "./css/listGame.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { setTotalCart } from "../redux/authSlice";
import translations from "../redux/data/translations";
import { getThemeConfig } from "../services/themeService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ListGame = ({ title, items, api }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBuyProduct = (id) => {
    navigate(`/selectShoe/${id}`);
  };
  const language = useSelector((state) => state.language.language);
  const t = translations[language].homeProductCarousel;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      // Nếu chưa, chuyển hướng đến trang đăng nhập
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        ID_SAN_PHAM: product.ID_SAN_PHAM,
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG, // ID người dùng
        NGAY_CAP_NHAT_GIOHANG: new Date().toISOString(),
      };

      const response = await axios.post(`${api}/gio-hang/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" }); // Thông báo lỗi
        dispatch(setTotalCart(response.data.totalQuantity));
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" }); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" }); // Thông báo lỗi
    }
  }; // Hàm handleAddToWish
  const handleAddToWish = async (product) => {
    if (!isAuthenticated) {
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        idSanPham: product.ID_SAN_PHAM,
        idNguoiDung: userInfo.ID_NGUOI_DUNG, // ID người dùng
      };

      const response = await axios.post(`${api}/yeu-thich/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" }); // Thông báo lỗi
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" }); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" }); // Thông báo lỗi
    }
  };
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ marginBottom: 1, zIndex: 200, color: currentTheme.color }}
      >
        {title} &gt;
      </Typography>
      <Box
        sx={{
          flex: "1 1 30%",
          // padding: 2,
          display: "flex",
          flexDirection: "column",
          borderLeft: "0.3px solid rgba(255, 255, 255, 0.3)",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            onClick={() => handleBuyProduct(item.ID_SAN_PHAM)}
            sx={{
              cursor: "pointer",

              marginBottom: 2,
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.color,
              transition: "background-color 0.3s ease", // Thêm hiệu ứng chuyển tiếp cho nền
              "&:hover": {
                backgroundColor: currentTheme.accentColor, // Tăng độ sáng nền khi hover
              },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={`${api}/images/${item.HINH_ANH_SANPHAM}`}
                alt={item.TEN_SAN_PHAM}
                style={{
                  width: "50px",
                  height: "75px",
                  borderRadius: "10%",
                  transition: "filter 0.3s ease", // Thêm hiệu ứng chuyển tiếp
                }}
                className="thumbnail" // Thêm lớp CSS cho hình ảnh
              />
              <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                <Typography variant="body2" noWrap>
                  {item.TEN_SAN_PHAM}
                </Typography>
                <Typography variant="caption" sx={{ color: "#bbb" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.GIA)}
                </Typography>
              </Box>
              {/* Thêm IconButton cho các icon */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Tooltip và hiệu ứng cho Add to Cart */}
                <Tooltip title={t.AddToCart} arrow>
                  <IconButton
                    sx={{
                      color: currentTheme.color,
                      position: "relative", // Để áp dụng các hiệu ứng trên icon
                      fontSize: "20px",
                      transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động khi hover
                      "&:hover": {
                        transform: "scale(1.2)", // Phóng to icon khi hover
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                      handleAddToCart(item); // Gọi hàm thêm vào giỏ hàng
                    }}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip>

                {/* Tooltip và hiệu ứng cho Add to Wish */}
                <Tooltip title={t.AddToWish} arrow>
                  <IconButton
                    sx={{
                      color: currentTheme.color,
                      position: "relative", // Để áp dụng các hiệu ứng trên icon
                      fontSize: "20px",
                      transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động khi hover
                      "&:hover": {
                        transform: "scale(1.2)", // Phóng to icon khi hover
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                      handleAddToWish(item); // Gọi hàm thêm vào giỏ hàng
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
export default ListGame;
