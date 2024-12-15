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
  Skeleton,
  TextField,
  isSwitchOn,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Thêm thư viện UUID nếu bạn muốn tạo mã đơn hàng duy nhất

import { Payments } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { setItemCart, setTotalCart, setIdOder } from "../redux/authSlice";
import { enqueueSnackbar } from "notistack";
import { getThemeConfig } from "../services/themeService";
import AddressSelector from "../user-view/components/addressUser";
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

  userId,
  fetchCartItems,
  handleQuantityChange,
  color,
  phongCach,
  mucDich,
  kichCo,
  quantity,
  handleRemoveProduct,
  currentTheme,
}) => {
  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: currentTheme.backgroundColorLow,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
        <img
          src={`${api}/images/${image}`}
          alt={`${name} thumbnail`}
          style={{ marginRight: 16, width: "80px", borderRadius: "13px" }}
        />
        <Box>
          <Typography variant="h6" sx={{ color: currentTheme.color }}>
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
        <Typography sx={{ color: currentTheme.color }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </Typography>

        <Typography variant="body2" sx={{ color: currentTheme.color }}>
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
            onClick={() => handleQuantityChange(quantity - 1, id, "Delete")}
          >
            <Remove />
          </IconButton>
          <Typography variant="body1" sx={{ color: currentTheme.color }}>
            {quantity}
          </Typography>
          <IconButton
            sx={{ color: "#3ccaff" }}
            size="small"
            onClick={() => handleQuantityChange(quantity + 1, id, "Add")}
          >
            <Add />
          </IconButton>
        </Box>

        <Button
          sx={{ mt: 2 }}
          variant="text"
          color="error"
          onClick={() => handleRemoveProduct(id)}
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
  handleSummitThanhToan,
  currentTheme,

  userInfo,
  isSwitchOn,

  selectedWards,
  setSelectedDistrict,
  setSelectedProvince,
  setSelectStreetName,
  handleSwitchChange,

  setSoDienThoai,
  soDienThoai,

  selectStreetName,
  setSelectedWards,
  selectedDistrict,
  selectedProvince,
}) => (
  <Box
    sx={{
      backgroundColor: currentTheme.backgroundColorLow,
      p: 2,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" sx={{ color: currentTheme.color }}>
      Giỏ hàng
    </Typography>
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Typography sx={{ color: currentTheme.color }}>
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
    <Typography sx={{ color: currentTheme.color }}>
      Các hình thức thanh toán
    </Typography>{" "}
    <FormControl sx={{ mb: 2, minWidth: 300, mt: 2 }}>
      <InputLabel
        sx={{
          display: "flex",
          alignItems: "center",
          color: currentTheme.color,
        }}
      >
        <Payments sx={{ mr: 1 }} />
        Phương thức thanh toán
      </InputLabel>
      <Select
        value={selectPhuongThucThanhToan}
        label="Icon Phương thức thanh toán"
        onChange={(e) => setSelectPhuongThucThanhToan(e.target.value)}
        sx={{ color: currentTheme.color }}
      >
        {" "}
        <MenuItem value="">Xem tất cả</MenuItem>
        {paymentMethods.map((item) => (
          <MenuItem key={item.ID_THANH_TOAN} value={item.ID_THANH_TOAN}>
            {item.PHUONG_THUC_THANH_TOAN}
          </MenuItem>
        ))}
      </Select>
    </FormControl>{" "}
    <br />
    {/* ----------------- Cmt Code địa chỉ phương thức thanh toán ------------------ */}
    {isSwitchOn ? (
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Switch
          checked={isSwitchOn} // Liên kết trạng thái với Switch
          onChange={handleSwitchChange}
          color="primary"
        />
        {userInfo && (
          <>
            <Typography
              variant="body2"
              color="white"
              sx={{ fontSize: "11px", color: currentTheme.color }}
            >
              {`Địa chỉ: ${userInfo.DIA_CHI_STREETNAME}, ${userInfo?.DIA_CHI_Wards}, 
              ${userInfo?.DIA_CHI_Districts}, ${userInfo?.DIA_CHI_Provinces}`}
            </Typography>
          </>
        )}
      </Box>
    ) : (
      <>
        <Switch
          checked={isSwitchOn} // Liên kết trạng thái với Switch
          onChange={handleSwitchChange}
          color="primary"
        />{" "}
        <Typography
          variant="body2"
          color="white"
          sx={{ fontSize: "11px", color: currentTheme.color, mb: 2 }}
        >
          {`Địa chỉ: ${selectStreetName || " "}, ${
            selectedWards?.full_name || ""
          } 
        , ${selectedDistrict?.full_name || ""},  ${
            selectedProvince?.full_name || ""
          }`}
        </Typography>
        <AddressSelector
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedWards={selectedWards}
          //
          setSelectedProvince={setSelectedProvince}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedWards={setSelectedWards}
          backgroundColor={"#343437"}
          color={"#fff"}
        />{" "}
        <TextField
          label="Tên đường"
          variant="outlined"
          value={selectStreetName} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
          fullWidth
          InputProps={{
            style: { color: currentTheme.color }, // Màu chữ trong TextField
          }}
          onChange={(e) => setSelectStreetName(e.target.value)}
          InputLabelProps={{
            style: { color: currentTheme.color }, // Màu chữ nhãn
          }}
          sx={{
            mt: 2,
            backgroundColor: currentTheme.backgroundColorLow, // Màu nền của input
            "& .MuiInputLabel-root": { color: currentTheme.color }, // Màu chữ của label
            "& .MuiInputBase-input": { color: currentTheme.color }, // Màu chữ của input
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00000" }, // Màu viền
            },
            "& .MuiInputBase-root": {
              borderRadius: "4px", // Làm tròn góc nếu muốn
            },
          }}
        />{" "}
        <TextField
          label="Số điện thoại"
          variant="outlined"
          type="number"
          value={soDienThoai} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
          fullWidth
          InputProps={{
            style: { color: currentTheme.color }, // Màu chữ trong TextField
          }}
          onChange={(e) => setSoDienThoai(e.target.value)}
          InputLabelProps={{
            style: { color: currentTheme.color }, // Màu chữ nhãn
          }}
          sx={{
            mt: 2,
            backgroundColor: currentTheme.backgroundColorLow, // Màu nền của input
            "& .MuiInputLabel-root": { color: currentTheme.color }, // Màu chữ của label
            "& .MuiInputBase-input": { color: currentTheme.color }, // Màu chữ của input
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00000" }, // Màu viền
            },
            "& .MuiInputBase-root": {
              borderRadius: "4px", // Làm tròn góc nếu muốn
            },
          }}
        />
      </>
    )}
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Button
      variant="contained"
      onClick={() => handleSummitThanhToan()}
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
  const { isAuthenticated, userInfo, itemCart, totalCart } = useSelector(
    (state) => state.auth
  );
  const [tongTienCart, setTongTienCart] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectPhuongThucThanhToan, setSelectPhuongThucThanhToan] =
    useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
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
      const response = await axios.get(
        `${api}/gio-hang/use/cart-user/${userInfo.ID_NGUOI_DUNG}`
      );

      const data = response.data;

      // if (data.EC === 1) {
      dispatch(setTotalCart(data.totalQuantity));
      setTongTienCart(data.TOTAL_AMOUNT);
      setItems(data.DT);

      // Tính tổng giá trị giỏ hàng
      const total = data.DT.reduce(
        (acc, item) => acc + item.GIA * item.SO_LUONG_GIOHANG,
        0
      );
      setLoading(false);
      setSubtotal(total);
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

  const handleQuantityChange = async (newQuantity, id, title) => {
    try {
      if (newQuantity < 1) return; // Prevents quantity from going below 1

      if (title === "Add") {
        // Tăng số lượng
        const response = await axios.post(`${api}/gio-hang/add-single`, {
          userId: userInfo.ID_NGUOI_DUNG,
          productId: id,
          updateDate: new Date().toISOString(),
        });

        if (response.data.EC === 1) {
          fetchCartItems();

          // onQuantityChange(id, newQuantity);
        } else {
          console.error("Error adding quantity:", response.data.EM);
        }
      } else if (title === "Delete") {
        // Giảm số lượng
        const response = await axios.post(`${api}/gio-hang/remove-single`, {
          userId: userInfo.ID_NGUOI_DUNG,
          productId: id,
        });

        if (response.data.EC === 1) {
          fetchCartItems();

          // onQuantityChange(id, newQuantity);
        } else {
          console.error("Error removing quantity:", response.data.EM);
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveProduct = async (id) => {
    console.log("handleRemoveProduct", id);
    try {
      const response = await axios.post(`${api}/gio-hang/remove-products`, {
        userId: userInfo.ID_NGUOI_DUNG,
        productId: id,
      });

      if (response.data.EC === 1) {
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error removing product completely:", error);
    }
  };

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked); // Cập nhật trạng thái
  };
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWards, setSelectedWards] = useState(null);
  const [selectStreetName, setSelectStreetName] = useState(null);
  const [soDienThoai, setSoDienThoai] = useState(null);
  console.log("selectedWards", selectedWards);
  const handleSummitThanhToan = async () => {
    if (selectPhuongThucThanhToan === "") {
      enqueueSnackbar("Vui lòng chọn phương thức thanh toán!!");
      return;
    }
    // Lưu giỏ hàng vào Redux
    dispatch(setItemCart(items));

    // Tạo mã đơn hàng duy nhất
    const orderId = uuidv4();
    const orderInfo = `PhucShoes - Mã đơn hàng: ${orderId}`;
    const requestData = {
      idNguoiDung: userInfo.ID_NGUOI_DUNG,
      idThanhToan: selectPhuongThucThanhToan,
      tongTien: tongTienCart,
      trangThaiDonHang: "Đang chờ thanh toán",
      ID_ODER: orderInfo,
      items: items,
      email: userInfo.EMAIL,
      DIA_CHI_DON_HANG: isSwitchOn
        ? `${selectStreetName}, ${userInfo.DIA_CHI_Wards?.name}, ${userInfo.DIA_CHI_Districts?.name}, ${userInfo.DIA_CHI_Provinces?.name}`
        : `${selectStreetName}, ${selectedWards?.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`,
      SO_DIEN_THOAI_DON_HANG: isSwitchOn
        ? `${userInfo.SO_DIEN_THOAI}`
        : `${soDienThoai}`,
    };
    console.log("selectPhuongThucThanhToan", selectPhuongThucThanhToan);
    if (selectPhuongThucThanhToan === 1) {
      try {
        dispatch(setIdOder(orderId));
        const responsive = await axios.post(
          "http://emailserivce.somee.com/api/Momo/CreatePaymentUrl",
          {
            fullName: userInfo.HO_TEN,
            orderId: orderInfo,
            options: "mutil",
            orderInfo: orderInfo,
            returnUrl: "http://localhost:3000/checkout",
            amount: tongTienCart, // Gửi tổng tiền trong giỏ hàng
          }
        );
        axios.post(`${api}/don-hang`, requestData);
        const paymentUrl = responsive.data.url;

        window.location.href = paymentUrl;
      } catch (error) {
        console.error("Error during payment creation:", error);
      }
    } else if (selectPhuongThucThanhToan === 2) {
      const response = await axios.post(`${api}/don-hang`, requestData);
    }
  };

  if (loading) {
    return (
      <div>
        <Skeleton variant="rectangular" width="100%" height={100} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 4,
        backgroundColor: currentTheme.backgroundColor,
        justifyContent: "center",
      }}
    >
      {" "}
      <Grid item xs={12}>
        <Box sx={{ textAlign: "left", paddingLeft: 2 }}>
          {" "}
          <Typography variant="h4" sx={{ color: currentTheme.color }}>
            My Cart
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
          <Switch defaultChecked color="primary" />
          <Typography variant="body2" sx={{ color: currentTheme.color }}>
            Sort by:{" "}
          </Typography>
          <FormControl sx={{ ml: 1, minWidth: 120 }}>
            <Select sx={{ color: currentTheme.color }} defaultValue="Newest">
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
            quantity={item.TONG_SO_LUONG}
            handleRemoveProduct={handleRemoveProduct}
            handleQuantityChange={handleQuantityChange}
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
            currentTheme={currentTheme}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3.5} xl={4}>
        <CartSummary
          handleSummitThanhToan={handleSummitThanhToan}
          subtotal={subtotal}
          tongTienCart={tongTienCart}
          paymentMethods={paymentMethods}
          //
          selectPhuongThucThanhToan={selectPhuongThucThanhToan}
          setSelectPhuongThucThanhToan={setSelectPhuongThucThanhToan}
          currentTheme={currentTheme}
          //
          userInfo={userInfo}
          isSwitchOn={isSwitchOn}
          selectedWards={selectedWards}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedProvince={setSelectedProvince}
          setSelectStreetName={setSelectStreetName}
          handleSwitchChange={handleSwitchChange}
          setSoDienThoai={setSoDienThoai}
          soDienThoai={soDienThoai}
          selectStreetName={selectStreetName}
          setSelectedWards={setSelectedWards}
          selectedDistrict={selectedDistrict}
          selectedProvince={selectedProvince}
        />
      </Grid>
    </Grid>
  );
};

export default Cart;
