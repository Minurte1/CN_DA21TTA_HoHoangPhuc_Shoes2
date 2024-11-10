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

const CartProduct = ({ products, api }) => {
  return (
    <Box sx={{ padding: "20px", width: "100%" }}>
      <Grid container spacing={2} justifyContent="flex-start">
        {products && products.length > 0 ? (
          products.map((product, index) => {
            // Tạo discount ngẫu nhiên trong khoảng 10% đến 30%
            const discountPercentage =
              Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            const originalPrice = (
              product.GIA *
              (1 + discountPercentage / 100)
            ).toFixed(0);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: "auto",
                    backgroundColor: "#101014",
                    color: "#fff",
                    filter: "brightness(0.9)",
                    cursor: "pointer",
                    transition: "filter 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      filter: "brightness(1.1)",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "contain", height: "200px" }}
                    image={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                    alt={product.TEN_SAN_PHAM}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      {product.TEN_SAN_PHAM}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      {/* Hiển thị discount ngẫu nhiên */}
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{
                          backgroundColor: "#26bbff",
                          borderRadius: "10px",
                          padding: "1px 5px",
                          color: "#101014",
                          marginRight: "10px",
                        }}
                      >
                        {`${discountPercentage}% `}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          opacity: 0.7,
                          marginRight: "10px",
                        }}
                      >
                        {parseInt(originalPrice).toLocaleString("vi-VN")} ₫
                      </Typography>

                      {/* Giá thật, định dạng theo VND */}
                      <Typography sx={{ color: "#fff" }}>
                        {parseInt(product.GIA).toLocaleString("vi-VN")} ₫
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No products available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CartProduct;
