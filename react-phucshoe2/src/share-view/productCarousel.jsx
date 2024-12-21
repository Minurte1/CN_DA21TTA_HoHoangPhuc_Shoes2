import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./css/productCarousel.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setTotalCart } from "../redux/authSlice";
import { enqueueSnackbar } from "notistack";
import translations from "../redux/data/translations";
import { getThemeConfig } from "../services/themeService";
const ProductCarousel = ({ title, products, api }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productLength, setProductLength] = useState(0);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const t = translations[language].homeProductCarousel;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setProductLength(products.length);
    }
  }, [products]);

  const nextSlide = () => {
    if (currentIndex + 5 < productLength) {
      setCurrentIndex((prevIndex) => prevIndex + 5);
    } else {
      setCurrentIndex(productLength - (productLength % 5)); // Đảm bảo không vượt quá
    }
  };

  const prevSlide = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 5);
    } else {
      setCurrentIndex(0); // Đảm bảo không đi lùi quá đầu
    }
  };

  useEffect(() => {
    // Nếu đã đến sản phẩm cuối, vô hiệu hóa nút next
    setDisable(currentIndex + 5 >= productLength);
  }, [currentIndex, productLength]);

  const handleBuyProduct = (id) => {
    navigate(`/selectShoe/${id}`);
  };

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
        enqueueSnackbar(response.data.EM, { variant: "success" });
        dispatch(setTotalCart(response.data.totalQuantity));
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
    }
  };
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
        enqueueSnackbar(response.data.EM, { variant: "success" });
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
    }
  };

  return (
    <div
      className="container-product-carousel mt-4 mb-4"
      style={{ width: "100%" }}
    >
      <IconButton
        onClick={prevSlide}
        disabled={currentIndex === 0} // Vô hiệu hóa nếu đang ở đầu danh sách
        sx={{
          position: "absolute",
          right: "0",
          marginRight: "90px",
          top: "0%",
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "#444447",
          width: "30px",
          color: "#fff", // Màu chữ
          height: "30px",
          "&:hover": {
            backgroundColor: "#636366", // Màu khi hover
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "15px", color: "#fff" }} />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        disabled={disable} // Vô hiệu hóa nếu đã đến cuối danh sách
        sx={{
          position: "absolute",
          right: 0,
          top: "0%",
          transform: "translateY(-50%)",
          zIndex: 1,
          marginRight: "40px",
          backgroundColor: "#343437", // Màu nền
          color: "#fff", // Màu chữ
          borderRadius: "50%", // Bo tròn để tạo hình tròn
          backgroundColor: "#444447",
          width: "30px",
          height: "30px",
          "&:hover": {
            backgroundColor: "#636366", // Màu khi hover
          },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: "15px", color: "#fff" }} />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          textAlign: "left",
          color: "#fff",
          cursor: "pointer",
          display: "inline-flex", // Thay đổi cách hiển thị để mũi tên nằm cạnh chữ
          alignItems: "center", // Căn giữa chữ và mũi tên theo chiều dọc
          "&:hover .arrow-icon": {
            marginLeft: "15px", // Di chuyển mũi tên sang trái 10px khi hover
            transition: "margin-left 0.3s ease", // Hiệu ứng chuyển tiếp
          },
        }}
      >
        {title}
        <ArrowForwardIosIcon
          className="arrow-icon"
          sx={{ fontSize: "19px", color: "#fff", marginLeft: "10px" }}
        />
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          padding: "20px 0",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease",
            transform: `translateX(-${(currentIndex * 100) / 5}%)`,
            width: `100%`, // Mỗi lần chuyển 5 sản phẩm
          }}
        >
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: currentTheme.backgroundColor,
                  color: currentTheme.color,
                  padding: 1,
                  flexShrink: 0,
                  margin: "2px",
                  cursor: "pointer",
                  width: { xs: "100%", sm: "30%", md: "260px", lg: "260px" },
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  position: "relative", // Đặt relative để đặt icon ở góc trên bên phải
                  "&:hover": {
                    backgroundColor: currentTheme.accentColor,
                    filter: "brightness(1.1)",
                  },
                }}
                onClick={() => handleBuyProduct(product.ID_SAN_PHAM)}
              >
                <Tooltip title={t.AddToWish} arrow>
                  <FavoriteBorderIcon
                    sx={{
                      position: "absolute", // Đặt icon ở góc trên bên phải
                      top: 8,
                      right: 8,
                      color: "#101014", // Màu icon
                      borderRadius: "50%", // Tạo hình tròn cho icon
                      margin: "8px",
                      fontSize: "23px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động khi hover
                      "&:hover": {
                        transform: "scale(1.2)", // Phóng to icon khi hover
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                      handleAddToWish(product); // Gọi hàm thêm vào giỏ hàng
                    }}
                  />
                </Tooltip>
                <CardMedia
                  component="img"
                  image={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                  alt={product.title}
                  sx={{
                    height: {
                      xs: "260px",
                      sm: "260px",
                      md: "260px",
                      lg: "260px",
                    },
                    objectFit: "contain",
                    borderRadius: "15px",
                    transition: "filter 0.3s ease",
                  }}
                />
                <CardContent sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ textAlign: "left" }}>
                    {product.TEN_SAN_PHAM}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      marginTop: "4px",
                      justifyContent: "space-between",
                    }}
                  >
                    {product.GIA
                      ? `${product.GIA.toLocaleString("vi-VN")}đ`
                      : "Giá không có sẵn"}{" "}
                    {/* <Tooltip title={t.AddToCart} arrow>
                      <AddShoppingCartIcon
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "#555", // Màu nền khi hover
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                          // handleAddToCart(product);
                        }}
                      />
                    </Tooltip> */}
                  </Typography>{" "}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Không có sản phẩm nào
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ProductCarousel;
