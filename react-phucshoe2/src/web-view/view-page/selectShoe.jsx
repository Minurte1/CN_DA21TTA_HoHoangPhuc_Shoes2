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

import RecommenderProductCarousel from "../../share-view/productCarousel-recommender";
import AddressSelector from "../../user-view/components/addressUser";
const api = process.env.REACT_APP_URL_SERVER;

const SelectShoe = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null to handle loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [selectPhuongThucThanhToan, setSelectPhuongThucThanhToan] =
    useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${api}/san-pham/use/${id}`);
      if (response.data.EC === 1) {
        setProduct(response.data.DT); // Set product data
      }
      const response_Payment = await axios.get(`${api}/thanh-toan/use`);
      if (response_Payment.data.EC === 1) {
        setPaymentMethods(response_Payment.data.DT);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // THÊM VÀO GIỎ HÀNG
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Nếu chưa, chuyển hướng đến trang đăng nhập
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
            <Typography sx={{ color: "#fff" }}>
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
            <Typography sx={{ color: "#fff" }}>
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
            <Typography sx={{ color: "#fff" }}>
              Mô tả thể loại: {product.MO_TA_LOAI_DANH_MUC}{" "}
              {/* Product Description */}
            </Typography>
          </Box>{" "}
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              backgroundColor: "#2c2c2e",
              color: "#fff",
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
              <Typography variant="body2">
                Size: {product.KICH_CO || "N/A"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                Chất liệu: {product.TEN_CHAT_LIEU_ || "N/A"} {/* Material */}
              </Typography>
            </Box>
            <Typography variant="h6">
              {product.GIA.toLocaleString()} VND
            </Typography>{" "}
            {/* Price */}
            <Button
              variant="contained"
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
            <FormControl sx={{ mb: 2 }}>
              <InputLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
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
                sx={{ backgroundColor: "#343437" }}
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

                <Typography
                  variant="body2"
                  color="white"
                  sx={{ fontSize: "11px" }}
                >
                  {userInfo && (
                    <>
                      {`Địa chỉ: ${userInfo?.DIA_CHI_Wards}, 
              ${userInfo?.DIA_CHI_Districts}, ${userInfo?.DIA_CHI_Provinces}`}
                    </>
                  )}
                </Typography>
              </Box>
            ) : (
              <>
                <Switch
                  checked={isSwitchOn} // Liên kết trạng thái với Switch
                  onChange={handleSwitchChange}
                  color="primary"
                />
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
                    style: { color: "#fff" }, // Màu chữ trong TextField
                  }}
                  onChange={(e) => setSelectStreetName(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" }, // Màu chữ nhãn
                  }}
                  sx={{
                    backgroundColor: "#343437", // Màu nền của input
                    "& .MuiInputLabel-root": { color: "#fff" }, // Màu chữ của label
                    "& .MuiInputBase-input": { color: "#fff" }, // Màu chữ của input
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
