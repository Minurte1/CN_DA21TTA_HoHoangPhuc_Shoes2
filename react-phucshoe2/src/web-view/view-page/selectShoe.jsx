import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Divider,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { setTotalCart } from "../../redux/authSlice";
import { Payments } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid"; // Thêm thư viện UUID nếu bạn muốn tạo mã đơn hàng duy nhất

import RecommenderProductCarousel from "../../share-view/productCarousel-recommender";
import AddressSelector from "../../user-view/components/addressUser";
import CommentsSection from "../component-view/binhLuan";
import { getThemeConfig } from "../../services/themeService";
const api = process.env.REACT_APP_URL_SERVER;

const SelectShoe = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [binhLuan, setBinhLuan] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [selectPhuongThucThanhToan, setSelectPhuongThucThanhToan] =
    useState("");
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
    if (!isAuthenticated) {
      setIsSwitchOn(false);
    }
  }, [id, isAuthenticated]);

  const fetchProduct = async (id) => {
    try {
      // Tạo các promise cho các API call
      const productPromise = axios.get(`${api}/san-pham/use/${id}`);
      const binhLuanPromise = axios.get(`${api}/binh-luan/${id}`);
      const paymentPromise = axios.get(`${api}/thanh-toan/use`);

      const [responseProduct, responseBinhLuan, responsePayment] =
        await Promise.all([productPromise, binhLuanPromise, paymentPromise]);
      if (responseProduct.data.EC === 1) {
        setProduct(responseProduct.data.DT);
      }

      if (responseBinhLuan.data.EC === 1) {
        setBinhLuan(responseBinhLuan.data.DT);
      }

      if (responsePayment.data.EC === 1) {
        setPaymentMethods(responsePayment.data.DT);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // THÊM VÀO GIỎ HÀNG
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        ID_SAN_PHAM: id,
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG, // ID người dùng
        NGAY_CAP_NHAT_GIOHANG: new Date().toISOString(),
      };

      const response = await axios.post(`${api}/gio-hang/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM);
        dispatch(setTotalCart(response.data.totalQuantity));

        console.log(response.data.EM); // Thêm vào giỏ hàng thành công
      } else {
        console.log("Lỗi:", response.data.EM); // Xử lý lỗi nếu có
        enqueueSnackbar(response.data.EM);
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM);
    }
  }; // Hàm handleAddToWish
  const handleAddToWish = async (product) => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        idSanPham: id,
        idNguoiDung: userInfo.ID_NGUOI_DUNG, // ID người dùng
      };

      const response = await axios.post(`${api}/yeu-thich/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM);
        console.log(response.data.EM); // Thêm vào yêu thích thành công
      } else {
        console.log("Lỗi:", response.data.EM); // Xử lý lỗi nếu có
        enqueueSnackbar(response.data.EM);
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM);
    }
  };

  //THAY ĐỔI ĐỊA CHỈ
  const [isSwitchOn, setIsSwitchOn] = useState(true); // Trạng thái của Switch
  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked); // Cập nhật trạng thái
  };
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWards, setSelectedWards] = useState(null);
  const [selectStreetName, setSelectStreetName] = useState(null);
  const [soDienThoai, setSoDienThoai] = useState(null);

  const handleSummitThanhToan = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      return;
    }
    if (selectPhuongThucThanhToan === "") {
      enqueueSnackbar("Vui lòng chọn phương thức thanh toán!!");
      return;
    }

    // Tạo mã đơn hàng duy nhất
    const orderId = uuidv4();
    const orderInfo = `PhucShoes - Mã đơn hàng: ${orderId}`;
    const requestData = {
      idNguoiDung: userInfo.ID_NGUOI_DUNG,
      idThanhToan: selectPhuongThucThanhToan,
      tongTien: product.GIA,
      trangThaiDonHang: "Đang chờ thanh toán",
      ID_ODER: orderInfo,
      items: [product],
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
        const responsive = await axios.post(
          "http://emailserivce.somee.com/api/Momo/CreatePaymentUrl",
          {
            fullName: userInfo.HO_TEN,
            orderId: orderInfo,
            options: "mutil",
            orderInfo: orderInfo,
            returnUrl: "http://localhost:3000/checkout",
            amount: product.GIA, // Gửi tổng tiền trong giỏ hàng
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
  if (!product) {
    return <div>Loading...</div>; // Add a loading state
  }
  console.log("product => ", userInfo);
  return (
    <Container maxWidth="lg" className="container-select-game">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box sx={{ textAlign: "left", borderRadius: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: "600", color: "#fff" }}>
              {product.TEN_SAN_PHAM} {/* Product Name */}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          ></Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={`${api}/images/${product.HINH_ANH_SANPHAM}`} // Dynamic image path
              alt={product.TEN_SAN_PHAM}
              style={{ maxWidth: "70%", height: "auto", borderRadius: "13px" }}
            />
          </Box>{" "}
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ color: currentTheme.color }}>
              Mô tả: {product.MO_TA_SAN_PHAM} {/* Product Description */}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ color: currentTheme.color }}>
              Mô tả chất liệu: {product.MO_TA_CHAT_LIEU}{" "}
              {/* Product Description */}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ color: currentTheme.color }}>
              Mô tả thể loại: {product.MO_TA_LOAI_DANH_MUC}{" "}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              backgroundColor: "#ec8070",
              textAlign: "left",
              borderRadius: 1,
              marginLeft: "-16px",
              display: "flex",
              mt: 2,
            }}
          >
            {" "}
            <CommentsSection reviews={binhLuan} />
          </Box>{" "}
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              backgroundColor: currentTheme.backgroundColorLow,
              color: currentTheme.color,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {product.TEN_SAN_PHAM}
            </Typography>
            <Box>
              <Typography sx={{ color: currentTheme.color }} variant="body2">
                Size: {product.KICH_CO || "N/A"}
              </Typography>
              <Typography variant="caption" sx={{ color: currentTheme.color }}>
                Chất liệu: {product.TEN_CHAT_LIEU_ || "N/A"} {/* Material */}
              </Typography>
            </Box>
            <Typography sx={{ color: currentTheme.color }} variant="h6">
              {product.GIA.toLocaleString()} VND
            </Typography>{" "}
            {/* Price */}
            <Button
              variant="contained"
              onClick={handleSummitThanhToan}
              sx={{
                borderRadius: "14px",
                paddingTop: "13px",
                paddingBottom: "13px",
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
              Buy Now
            </Button>{" "}
            <Button
              onClick={() => handleAddToWish()}
              sx={{
                borderRadius: "14px",
                paddingTop: "13px",
                paddingBottom: "13px",
                backgroundColor: "#343437",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#4b4b4e",
                },
              }}
              fullWidth
            >
              Add To Wish
            </Button>
            <Button
              onClick={() => handleAddToCart()}
              sx={{
                borderRadius: "14px",
                paddingTop: "13px",
                paddingBottom: "13px",
                backgroundColor: "#343437",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#4b4b4e",
                },
              }}
              fullWidth
            >
              Add To Cart
            </Button>
            <FormControl sx={{ mb: 2, mt: 2 }}>
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: currentTheme.color,
                  fontWeight: "500",
                }}
              >
                <Payments sx={{ mr: 1 }} />
                Phương thức thanh toán
              </InputLabel>
              <Select
                value={selectPhuongThucThanhToan}
                label="Icon Phương thức thanh toán"
                onChange={(e) => setSelectPhuongThucThanhToan(e.target.value)}
                sx={{
                  backgroundColor: currentTheme.backgroundColorLow,
                  color: currentTheme.color,
                }}
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
                  sx={{ fontSize: "11px", color: currentTheme.color }}
                >
                  {`Địa chỉ: ${selectStreetName || ""} ${selectedWards || ""} 
        ${selectedDistrict || ""} ${selectedProvince || ""}`}
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
            <Divider sx={{ backgroundColor: "#555", mb: 2 }} />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Kích cỡ: {product.TEN_DANH_MUC} {/* Product Description */}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Kích cỡ: {product.KICH_CO} {/* Product Description */}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Phong cách: {product.TEN_PHONG_CACH} {/* Product Description */}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Thương hiệu: {product.TEN_THUONG_HIEU}{" "}
                {/* Product Description */}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Đối tượng phù hợp nhất: {product.TEN_GIOI_TINH}{" "}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Số lượng trong kho còn : {product.SO_LUONG_SANPHAM}
                {/* {new Date(product.NGAY_TAO_SANPHAM).toLocaleDateString()} */}
              </Typography>{" "}
              <Typography
                variant="body2"
                sx={{
                  color: currentTheme.color,
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Màu sắc: {product.TEN_MAU_SAC}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {id && <RecommenderProductCarousel ID_SAN_PHAM={id} />}
    </Container>
  );
};

export default SelectShoe;
