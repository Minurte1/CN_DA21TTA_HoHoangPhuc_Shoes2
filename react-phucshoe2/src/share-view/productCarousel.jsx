import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./css/productCarousel.css";
const ProductCarousel = () => {
  const fakeProducts = [
    {
      title: "G.I. Joe: Wrath of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 150000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Return of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 200000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Cobra Strikes",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 180000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Cobra Reborn",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 220000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: The Rise of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 175000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Revenge of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 190000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Battle of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 210000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: The Rise of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 175000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Revenge of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 190000, // Giá tiền giả
    },
    {
      title: "G.I. Joe: Battle of Cobra",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/db072d8ba2e44017b45abb915f058267/gi-joe-wrath-of-cobra-1nfti.jpg?resize=1&w=360&h=480&quality=medium",
      price: 210000, // Giá tiền giả
    },
  ];

  useEffect(() => {
    setProductLength(fakeProducts.length);
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productLength, setProductLength] = useState("");
  const [disable, setDisable] = useState(false);
  const nextSlide = () => {
    if (currentIndex < productLength) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setDisable(true);
    }
    if (currentIndex > productLength) {
      setProductLength(productLength - 4);
      setDisable(false);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setDisable(false);
    }
    if (currentIndex > productLength) {
      setProductLength(productLength + 4);
      setDisable(false);
    }
  };

  return (
    <>
      <div className="container-product-carousel mt-4 mb-4">
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
          disabled={disable} // Sửa điều kiện kiểm tra
          sx={{
            position: "absolute",
            // left: { xs: "0", sm: "0", md: "0", lg: "0" }, // Đặt bên trái cho màn hình nhỏ
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
          Discover Something New{" "}
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
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${fakeProducts.length * 100}%`,
            }}
          >
            {fakeProducts.map((product, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: "#101014",
                  color: "#fff",
                  padding: 1,
                  flexShrink: 0,
                  cursor: "pointer",
                  width: { xs: "100%", sm: "30%", md: "33.33%", lg: "20%" }, // Responsive width
                  transition: "background-color 0.3s ease, transform 0.3s ease", // Thêm hiệu ứng chuyển tiếp
                  "&:hover": {
                    backgroundColor: "#181818", // Sáng hơn khi hover
                    filter: "brightness(1.1)", // Làm sáng hơn khi hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    height: {
                      xs: "260px",
                      sm: "260px",
                      md: "auto",
                      lg: "auto",
                    },
                    objectFit: "contain",
                    borderRadius: "15px",
                    transition: "filter 0.3s ease", // Thêm hiệu ứng chuyển tiếp cho hình ảnh
                  }}
                  className="card-image" // Thêm lớp CSS cho hình ảnh
                />
                <CardContent sx={{ ml: 2 }}>
                  <Typography variant="body2" sx={{ textAlign: "left" }}>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "left",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    {product.price
                      ? `${product.price.toLocaleString("vi-VN")}đ`
                      : "Giá không có sẵn"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ProductCarousel;
