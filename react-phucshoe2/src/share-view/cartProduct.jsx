import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const CartItem = ({ name, price, rating, tags, isFree }) => (
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
        src="https://via.placeholder.com/100"
        alt={`${name} thumbnail`}
        style={{ marginRight: 16 }}
      />
      <Box>
        <Typography variant="h6" color="white">
          {name}
        </Typography>
        <Typography variant="body2" color="gray">
          {rating}
        </Typography>
        <Typography variant="body2" color="gray">
          {tags}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ textAlign: "right" }}>
      <Typography variant="h6" color="white">
        {isFree ? "Free" : `${price} ₲`}
      </Typography>
      <Button variant="text" color="primary">
        Remove
      </Button>
    </Box>
  </Card>
);

const CartSummary = ({ subtotal }) => (
  <Box sx={{ backgroundColor: "#202024", p: 2, borderRadius: 2 }}>
    <Typography variant="h6" color="white">
      Games and Apps Summary
    </Typography>
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Typography color="white">Price: {subtotal} ₲</Typography>
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
          backgroundColor: "#3ccaff", // Màu sáng hơn khi hover
        },
      }}
      fullWidth
    >
      Check Out
    </Button>
  </Box>
);

const Cart = () => {
  const items = [
    {
      name: "Game Title",
      price: 261000,
      rating: "12+",
      tags: "Horror, Mild Swearing",
      isFree: false,
    },
    {
      name: "Blade of God X",
      price: 0,
      rating: "12+",
      tags: "Moderate Violence",
      isFree: true,
    },
  ];

  const subtotal = items.reduce(
    (acc, item) => acc + (item.isFree ? 0 : item.price),
    0
  );

  return (
    <Grid container spacing={2} sx={{ p: 4, backgroundColor: "#121212" }}>
      <Grid item xs={12} md={8}>
        {items.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <CartSummary subtotal={subtotal} />
      </Grid>
    </Grid>
  );
};

export default Cart;
