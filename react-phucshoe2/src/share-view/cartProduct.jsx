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
  Popover,
  List,
  ListItem,
  ListItemText,
  Popper,
  Modal,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Thêm thư viện UUID nếu bạn muốn tạo mã đơn hàng duy nhất
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setItemCart, setTotalCart, setIdOder } from "../redux/authSlice";
import { enqueueSnackbar } from "notistack";
import { getThemeConfig } from "../services/themeService";
import CartItem from "./component/CartItem";
import CartSummary from "./component/CartSummary";
const api = process.env.REACT_APP_URL_SERVER;

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
        ? `${userInfo.DIA_CHI_STREETNAME}, ${userInfo.DIA_CHI_Wards}, ${userInfo.DIA_CHI_Districts}, ${userInfo.DIA_CHI_Provinces}`
        : `${selectStreetName}, ${selectedWards?.full_name}, ${selectedDistrict?.full_name}, ${selectedProvince?.full_name}`,
      SO_DIEN_THOAI_DON_HANG: isSwitchOn
        ? `${userInfo.SO_DIEN_THOAI}`
        : `${soDienThoai}`,
    };

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

      if (response.data.EC == 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        fetchCartItems();
      }
    }
  };
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
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
        <Box>
          <Button variant="contained" onClick={handleOpen}>
            Add to Cart
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="product-details-title"
            aria-describedby="product-details-description"
            disableScrollLock // Để tránh khóa scroll trang
            BackdropProps={{
              style: { backgroundColor: "transparent" }, // Nền trong suốt
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: anchorEl
                  ? anchorEl.getBoundingClientRect().top + window.scrollY
                  : "50%",
                left: anchorEl
                  ? anchorEl.getBoundingClientRect().right + 10
                  : "50%",
                transform: anchorEl ? "none" : "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                border: "2px solid #ccc",
                boxShadow: 24,
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography
                id="product-details-title"
                variant="h6"
                component="h2"
              >
                Product Details
              </Typography>
              <Typography id="product-details-description" sx={{ mt: 2 }}>
                Sizes: S, M, L, XL
              </Typography>
              <Typography>Colors: Red, Blue, Green</Typography>
            </Box>
          </Modal>
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
