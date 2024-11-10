import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Typography, Card, Grid } from "@mui/material";

const api = process.env.REACT_APP_URL_SERVER;

const CartItem = ({
  name,
  price,
  description,
  gender,
  category,
  material,
  brand,
  quantityInCart,
  image,
}) => (
  <Card
    sx={{
      mb: 2,
      display: "flex",
      justifyContent: "space-between",
      p: 2,
      backgroundColor: "#202024",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src={`${api}/images/${image}`} // Đây là cách giả lập ảnh cho sản phẩm
        alt={`${name} thumbnail`}
        style={{ marginRight: 16, width: "80px", borderRadius: "13px" }}
      />
      <Box>
        <Typography variant="h6" color="white">
          {name}
        </Typography>
        <Typography variant="body2" color="gray">
          {description}
        </Typography>
        <Typography variant="body2" color="gray">
          {category} | {material} | {gender} | {brand}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ textAlign: "right" }}>
      <Typography color="white">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price)}
      </Typography>

      <Typography variant="body2" color="gray">
        Số lượng trong giỏ: {quantityInCart}
      </Typography>
      <Button variant="text" color="error">
        Remove
      </Button>
    </Box>
  </Card>
);

const CartSummary = ({ subtotal }) => (
  <Box sx={{ backgroundColor: "#202024", p: 2, borderRadius: 2 }}>
    <Typography variant="h6" color="white">
      Cart Summary
    </Typography>
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Typography color="white">
      Price:{" "}
      {new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(subtotal)}
    </Typography>

    <Typography color="white">Taxes: Calculated at Checkout</Typography>
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Button
      variant="contained"
      sx={{
        borderRadius: "14px",
        backgroundColor: "#26bbff",
        color: "#101014",
        fontWeight: "600",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: "#3ccaff",
        },
      }}
      fullWidth
    >
      Thanh toán
    </Button>
  </Box>
);

const Cart = () => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Hàm gọi API để lấy giỏ hàng
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/san-pham/use/cart-user/3"
        );
        const data = await response.json();
        if (data.EC === 1) {
          setItems(data.DT);
          // Tính tổng giá trị giỏ hàng
          const total = data.DT.reduce(
            (acc, item) => acc + item.GIA * item.SO_LUONG_GIOHANG,
            0
          );
          setSubtotal(total);
        } else {
          console.error("Error fetching cart items:", data.EM);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 4,
        backgroundColor: "#121212",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
        {items.map((item, index) => (
          <CartItem
            key={index}
            name={item.TEN_SAN_PHAM}
            price={item.GIA}
            description={item.MO_TA_SAN_PHAM}
            gender={item.TEN_GIOI_TINH}
            category={item.TEN_DANH_MUC}
            material={item.TEN_CHAT_LIEU_}
            brand={item.TEN_THUONG_HIEU}
            quantityInCart={item.SO_LUONG_GIOHANG}
            image={item.HINH_ANH_SANPHAM}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3.5} xl={4}>
        <CartSummary subtotal={subtotal} />
      </Grid>
    </Grid>
  );
};

export default Cart;
