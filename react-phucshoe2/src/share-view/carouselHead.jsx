import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./css/carouselHead.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCart } from "../redux/authSlice";
const api = process.env.REACT_APP_URL_SERVER;

const CarouselHead = ({ carouselProducts }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSelected, setIsSelected] = useState(""); // State để theo dõi trạng thái nhấp
  const [animateLogo, setAnimateLogo] = useState(false); // State để quản lý animation logo

  const navigate = useNavigate();
  // State to manage the current main image
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // Kiểm tra nếu có sản phẩm trong carouselProducts thì lấy hình ảnh đầu tiên
    if (carouselProducts && carouselProducts.length > 0) {
      setMainImage(carouselProducts[0].HINH_ANH_NEN_CAROUSEL);
    }
  }, [carouselProducts]); // Chạy khi carouselProducts thay đổi

  const handleClick = (product, index) => {
    setIsSelected(index); // Đảo ngược trạng thái khi nhấp
    setMainImage(product.HINH_ANH_NEN_CAROUSEL); // Cập nhật hình ảnh chính

    setAnimateLogo(true);

    setTimeout(() => {
      setAnimateLogo(false);
    }, 500);
  };
  const selectedProduct = carouselProducts.find(
    (product) => product.HINH_ANH_NEN_CAROUSEL === mainImage
  );
  console.log("selectedProduct", selectedProduct);
  const handleBuyProduct = (id) => {
    navigate(`/selectShoe/${id}`);
  };
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const handleAddToCart = async () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!isAuthenticated) {
      // Nếu chưa, chuyển hướng đến trang đăng nhập
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      // Nếu đã đăng nhập, thực hiện logic thêm vào giỏ hàng
      const payload = {
        ID_SAN_PHAM: selectedProduct.ID_SAN_PHAM,
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG, // ID người dùng
        NGAY_CAP_NHAT_GIOHANG: new Date().toISOString(),
      };

      const response = await axios.post(`${api}/gio-hang/`, payload);

      if (response.data.EC === 1) {
        dispatch(setTotalCart(response.data.totalQuantity));
        console.log(response.data.EM); // Thêm vào giỏ hàng thành công
      } else {
        console.log("Lỗi:", response.data.EM); // Xử lý lỗi nếu có
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#101014",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        className="main-image-container"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          backgroundColor: "#101014",
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${
            selectedProduct
              ? `${api}/images/${selectedProduct.HINH_ANH_NEN_CAROUSEL}`
              : "default-image-path"
          })`,
          backgroundSize: "cover", // Để ảnh phủ toàn bộ
          backgroundPosition: "center", // Căn giữa ảnh nền
        }}
      >
        <Box
          sx={{
            flex: 1, // Chiếm 50% chiều rộng
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // Căn dưới cùng theo chiều dọc
            alignItems: "flex-start", // Căn bên trái theo chiều ngang
            padding: 4,
            color: "#f50057",
          }}
        >
          {selectedProduct && (
            <img
              src={
                selectedProduct.HINH_ANH_ICON_CAROUSEL
                  ? `${api}/images/${selectedProduct.HINH_ANH_ICON_CAROUSEL}`
                  : "default-image-path" // Thay thế bằng đường dẫn ảnh mặc định nếu không tìm thấy
              }
              alt={`${
                selectedProduct.HINH_ANH_NEN_CAROUSEL
                  ? selectedProduct.HINH_ANH_NEN_CAROUSEL
                  : "Product"
              } Logo`}
              className={`${animateLogo ? "slide-in" : ""}`} // Áp dụng class animation
              style={{
                maxWidth: "150px", // Kích thước tối đa cho logo
                marginBottom: "16px", // Khoảng cách phía dưới logo
                zIndex: 3,
                borderRadius: "10px",
              }}
            />
          )}

          {carouselProducts.map((products, index) =>
            isSelected === index ? (
              <React.Fragment key={index}>
                <Typography
                  className={`component-game-description-background  ${
                    animateLogo ? "fade-in-up-text" : ""
                  }`}
                  variant="subtitle1"
                  sx={{
                    textAlign: "left",
                    mt: 1,
                    fontSize: { xs: "0.9rem", md: "1.25rem" },
                  }}
                >
                  {products.MO_TA_CAROUSEL}
                </Typography>
                <Typography
                  className="component-game-description-background"
                  variant="body1"
                  sx={{ mt: 1, mb: 2 }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(products.GIA)}
                </Typography>
              </React.Fragment>
            ) : null
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button
              className="component-game-btn-play"
              variant="contained"
              onClick={() => handleBuyProduct(selectedProduct.ID_SAN_PHAM)}
              sx={{
                zIndex: 2,
                backgroundColor: "white",
                color: "black",
                width: "250px",
                height: "50px",
                borderRadius: "14px",
              }}
            >
              Mua Ngay
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                zIndex: 2,
                color: "white",
                borderRadius: "14px",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <AddCircleOutlineIcon
                sx={{ marginRight: "10px", fontSize: "18px" }}
              />
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1, // Chiếm 50% chiều rộng bên phải
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "220px" },
          backgroundColor: "#101014",
          display: "flex",

          flexDirection: "column",
          // padding: 2,
          paddingBottom: 2,
          paddingLeft: 2,
          paddingTop: 1,

          borderRadius: "3%",

          mt: { xs: 2, md: 0 },
        }}
      >
        {carouselProducts.map((product, index) => (
          <div
            key={index}
            className={`component-game-slider-card ${
              isSelected === index ? "slider-game-active" : ""
            }`}
            onClick={() => {
              handleClick(product, index);
            }} // Gọi hàm khi nhấp vào
          >
            <div className="slider-select-game">
              <img
                component="img"
                src={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                className="component-game-img-slide"
                alt={product.HINH_ANH_SANPHAM}
                sx={{
                  objectFit: "contain",
                }}
                style={{ height: "70px" }}
              />

              <CardContent>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "13px",
                    textAlign: "left",
                    mb: 2,
                  }}
                  variant="body2"
                >
                  {product.TEN_SAN_PHAM}
                </Typography>
              </CardContent>
            </div>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default CarouselHead;
