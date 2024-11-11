import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Switch,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";
const api = process.env.REACT_APP_URL_SERVER;

const CartItem = ({
  id, // Assuming each item has a unique id
  name,
  price,
  description,
  gender,
  category,
  material,
  brand,
  quantityInCart,
  image,
  onQuantityChange, // Function passed to handle quantity updates
}) => {
  const [quantity, setQuantity] = useState(quantityInCart);

  const handleQuantityChange = async (newQuantity) => {
    try {
      if (newQuantity < 1) return; // Prevents the quantity from going below 1

      const response = await axios.put(
        `http://localhost:3002/san-pham/cart/update-quantity`,
        {
          itemId: id,
          newQuantity,
        }
      );

      if (response.data.success) {
        setQuantity(newQuantity); // Update UI on successful response
        onQuantityChange(id, newQuantity); // Update parent component/cart total
      } else {
        console.error("Error updating quantity:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: "#202024",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
        <img
          src={`${api}/images/${image}`}
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
          Số lượng trong giỏ:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            justifyContent: "right",
          }}
        >
          {" "}
          <IconButton
            sx={{ color: "#d32a28" }}
            size="small"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Remove />
          </IconButton>{" "}
          <Typography variant="body1" color="white">
            {quantity}
          </Typography>
          <IconButton
            sx={{ color: "#3ccaff" }}
            size="small"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Add />
          </IconButton>{" "}
        </Box>

        <Button
          sx={{ mt: 2 }}
          variant="text"
          color="error"
          onClick={() => handleQuantityChange(0)}
        >
          Remove
        </Button>
      </Box>
    </Card>
  );
};

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
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !userInfo) {
      // Redirect to login if user is not authenticated or userInfo is missing
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/san-pham/use/cart-user/${userInfo.ID_NGUOI_DUNG}`
        );
        const data = await response.json();
        if (data.EC === 1) {
          setItems(data.DT);
          // Calculate the total cart value
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
  }, [isAuthenticated, userInfo, navigate]);

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
      {" "}
      <Grid item xs={12}>
        <Box sx={{ textAlign: "left", paddingLeft: 2 }}>
          {" "}
          <Typography variant="h4" color="white">
            My Cart
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
          <Switch defaultChecked color="primary" />
          <Typography variant="body2" color="white">
            Sort by:{" "}
          </Typography>
          <FormControl sx={{ ml: 1, minWidth: 120 }}>
            <Select sx={{ color: "#c9d1d9" }} defaultValue="Newest">
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="On Sale">On Sale</MenuItem>
              <MenuItem value="Popular">Popular</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ backgroundColor: "#555", mb: 2 }} />
      </Grid>
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
