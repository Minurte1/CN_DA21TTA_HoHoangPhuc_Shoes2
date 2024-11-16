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
  InputLabel,
} from "@mui/material";

import { Payments } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { setTotalCart } from "../redux/authSlice";
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
  onQuantityChange,
  userId,
  fetchCartItems,

  color,
  phongCach,
  mucDich,
  kichCo,
}) => {
  const [quantity, setQuantity] = useState(quantityInCart);

  const handleQuantityChange = async (newQuantity) => {
    try {
      if (newQuantity < 1) return; // Prevents quantity from going below 1

      if (newQuantity > quantity) {
        // Tăng số lượng
        const response = await axios.post(`${api}/gio-hang/add-single`, {
          userId: userId,
          productId: id,
          updateDate: new Date().toISOString(),
        });

        if (response.data.EC === 1) {
          fetchCartItems();
          setQuantity(newQuantity);
          onQuantityChange(id, newQuantity);
        } else {
          console.error("Error adding quantity:", response.data.EM);
        }
      } else if (newQuantity < quantity) {
        // Giảm số lượng
        const response = await axios.post(`${api}/gio-hang/remove-single`, {
          userId: userId,
          productId: id,
        });

        if (response.data.EC === 1) {
          fetchCartItems();
          setQuantity(newQuantity);
          onQuantityChange(id, newQuantity);
        } else {
          console.error("Error removing quantity:", response.data.EM);
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  console.log("id", id);
  const handleRemoveProduct = async () => {
    try {
      while (quantity > 0) {
        const response = await axios.post(`${api}/gio-hang/remove-products`, {
          userId: userId,
          productId: id,
        });

        if (response.data.EC === 1) {
          fetchCartItems();
          setQuantity(quantity - 1);
          onQuantityChange(id, quantity - 1);
        } else {
          console.error("Error removing product:", response.data.EM);
          break;
        }
      }
    } catch (error) {
      console.error("Error removing product completely:", error);
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
          <Typography variant="body2" color="gray">
            {color}
          </Typography>
          <Typography variant="body2" color="gray">
            Kích cỡ: {kichCo}
          </Typography>
          <Typography variant="body2" color="gray">
            {mucDich}
          </Typography>
          <Typography variant="body2" color="gray">
            Phong cách: {phongCach}
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
          <IconButton
            sx={{ color: "#d32a28" }}
            size="small"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Remove />
          </IconButton>
          <Typography variant="body1" color="white">
            {quantity}
          </Typography>
          <IconButton
            sx={{ color: "#3ccaff" }}
            size="small"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Add />
          </IconButton>
        </Box>

        <Button
          sx={{ mt: 2 }}
          variant="text"
          color="error"
          onClick={handleRemoveProduct}
        >
          Remove
        </Button>
      </Box>
    </Card>
  );
};

const CartSummary = ({
  subtotal,
  tongTienCart,
  paymentMethods,
  selectPhuongThucThanhToan,
  setSelectPhuongThucThanhToan,
}) => (
  <Box sx={{ backgroundColor: "#202024", p: 2, borderRadius: 2 }}>
    <Typography variant="h6" color="white">
      Giỏ hàng
    </Typography>
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Typography color="white">
      {tongTienCart ? (
        <>
          {" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tongTienCart)}
        </>
      ) : (
        <>0đ</>
      )}
    </Typography>
    <Typography color="white">Các hình thức thanh toán</Typography>{" "}
    {/* Trạng thái */}
    <FormControl sx={{ mb: 2, minWidth: 300, mt: 2 }}>
      <InputLabel
        sx={{ display: "flex", alignItems: "center", color: "#c9d1d9" }}
      >
        <Payments sx={{ mr: 1 }} />
        Phương thức thanh toán
      </InputLabel>
      <Select
        value={selectPhuongThucThanhToan}
        label="Icon Phương thức thanh toán"
        onChange={(e) => setSelectPhuongThucThanhToan(e.target.value)}
        sx={{ color: "#c9d1d9" }}
      >
        {" "}
        <MenuItem value="">Xem tất cả</MenuItem>
        {paymentMethods.map((item) => (
          <MenuItem key={item.ID_THANH_TOAN} value={item.ID_THANH_TOAN}>
            {item.PHUONG_THUC_THANH_TOAN}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
  const [tongTienCart, setTongTienCart] = useState("");
  const [selectPhuongThucThanhToan, setSelectPhuongThucThanhToan] =
    useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated || !userInfo) {
      // Redirect to login if user is not authenticated or userInfo is missing
      navigate("/login");
      return;
    }

    fetchCartItems();
  }, [isAuthenticated, userInfo, navigate]);
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${api}/gio-hang/use/cart-user/${userInfo.ID_NGUOI_DUNG}`
      );
      const data = await response.json();

      // if (data.EC === 1) {
      dispatch(setTotalCart(data.totalQuantity));
      setTongTienCart(data.TOTAL_AMOUNT);
      setItems(data.DT);
      // Calculate the total cart value
      const total = data.DT.reduce(
        (acc, item) => acc + item.GIA * item.SO_LUONG_GIOHANG,
        0
      );

      setSubtotal(total);
      // } else {
      //   console.error("Error fetching cart items:", data.EM);
      // }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const [paymentMethods, setPaymentMethods] = useState([]);
  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(`${api}/thanh-toan/use`);
      if (response.data.EC === 1) {
        setPaymentMethods(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

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
            quantityInCart={item.TONG_SO_LUONG}
            image={item.HINH_ANH_SANPHAM}
            userId={userInfo.ID_NGUOI_DUNG}
            id={item.ID_SAN_PHAM}
            fetchCartItems={fetchCartItems}
            color={item.TEN_MAU_SAC}
            phongCach={item.TEN_PHONG_CACH}
            mucDich={item.TEN_MUC_DICH_SU_DUNG}
            kichCo={item.KICH_CO}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3.5} xl={4}>
        <CartSummary
          subtotal={subtotal}
          tongTienCart={tongTienCart}
          paymentMethods={paymentMethods}
          //
          selectPhuongThucThanhToan={selectPhuongThucThanhToan}
          setSelectPhuongThucThanhToan={setSelectPhuongThucThanhToan}
        />
      </Grid>
    </Grid>
  );
};

export default Cart;
