import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const fakeProducts = [
  {
    title: "Diplomacy is Not an Option",
    thumbnail:
      "https://cdn2.unrealengine.com/en-egs-dotw-diplomacy-is-not-an-option-breaker-1920x1080-24f9c71e94aa.jpg?resize=1&w=854&h=480&quality=medium", // Đường dẫn hình ảnh của sản phẩm
    discount: "-35%",
    originalPrice: "₫385,000",
    salePrice: "₫250,250",
  },
  {
    title: "Aquatico",
    thumbnail:
      "https://cdn2.unrealengine.com/en-egs-dotw-aquatico-breaker-1920x1080-40def064cccf.jpg?resize=1&w=854&h=480&quality=medium",
    discount: "-65%",
    originalPrice: "₫233,000",
    salePrice: "₫81,550",
  },
  {
    title: "Aquatico",
    thumbnail:
      "https://cdn2.unrealengine.com/en-sales-specials-dotw-breaker-asset-1920x1080-1313ee288796.jpg?resize=1&w=854&h=480&quality=medium",
    discount: "-65%",
    originalPrice: "₫233,000",
    salePrice: "₫81,550",
  },
  {
    title: "Diplomacy is Not an Option",
    thumbnail:
      "https://cdn2.unrealengine.com/en-egs-dotw-diplomacy-is-not-an-option-breaker-1920x1080-24f9c71e94aa.jpg?resize=1&w=854&h=480&quality=medium", // Đường dẫn hình ảnh của sản phẩm
    discount: "-35%",
    originalPrice: "₫385,000",
    salePrice: "₫250,250",
  },
];

const CartProduct = () => {
  return (
    <Box sx={{ padding: "20px", width: "100%" }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {fakeProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: "auto",
                backgroundColor: "#101014",
                color: "#fff",
                filter: "brightness(0.9)",
                cursor: "pointer",
                transition: "filter 0.3s ease, transform 0.3s ease", // Thêm hiệu ứng chuyển tiếp
                "&:hover": {
                  filter: "brightness(1.1)", // Sáng hơn khi hover
                  transform: "scale(1.02)", // Tăng kích thước nhẹ khi hover
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ objectFit: "contain", height: "200px" }} // Cố định chiều cao để giữ nguyên tỷ lệ
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "left" }}
                >
                  {product.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{
                      backgroundColor: "#26bbff",
                      borderRadius: "10px",
                      padding: "1px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      color: "#101014",
                      marginRight: "10px",
                    }}
                  >
                    {product.discount}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      opacity: 0.7,
                      marginRight: "10px",
                    }}
                  >
                    {product.originalPrice}
                  </Typography>

                  <Typography sx={{ color: "#fff" }}>
                    {product.salePrice}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CartProduct;
