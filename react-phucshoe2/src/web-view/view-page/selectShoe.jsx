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
      navigate("/login");
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
  const handleAddToCart = async (isAddCart) => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }
    if (selectedDetail === null) {
      return enqueueSnackbar("Vui lòng chọn size và màu sắc!", {
        variant: "error",
      });
    }
    try {
      const payload = {
        ID_SAN_PHAM: id,
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG, // ID người dùng
        NGAY_CAP_NHAT_GIOHANG: new Date().toISOString(),
        ID_SAN_PHAM_CHI_TIET: selectedDetail.ID_SAN_PHAM_CHI_TIET,
      };

      const response = await axios.post(`${api}/gio-hang/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        dispatch(setTotalCart(response.data.totalQuantity));
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
    } finally {
      if (!isAddCart) {
        navigate("/cart");
      }
    }
  };

  // Hàm handleAddToWish
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
        enqueueSnackbar(response.data.EM, { variant: "success" });
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
    }
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Get unique sizes
  const uniqueSizes = [
    ...new Set(product?.CHI_TIET_SAN_PHAM.map((item) => item.KICH_CO)),
  ];

  // Get available colors for selected size
  const availableColors = selectedSize
    ? product?.CHI_TIET_SAN_PHAM.filter((item) => item.KICH_CO === selectedSize)
    : [];

  const handleOptionChange = (type, value, detail) => {
    if (type === "size") {
      setSelectedSize(value);
      setSelectedColor(null);
      setSelectedDetail(null);
    } else if (type === "color") {
      setSelectedColor(value);
      // Find matching product detail
      const selected = product.CHI_TIET_SAN_PHAM.find(
        (item) => item.KICH_CO === selectedSize && item.MAU_SAC_ID === value
      );
      setSelectedDetail(selected);
    }
  };
  console.log(selectedDetail);
  if (!product) {
    return <div>Loading...</div>; // Add a loading state
  }

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
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "600" }}>
              {product.TEN_SAN_PHAM}
            </Typography>{" "}
            <Typography sx={{ color: currentTheme.color }} variant="h6">
              {product.GIA.toLocaleString()} VND
            </Typography>{" "}
            <div>
              <div
                style={{ borderBottom: "1px solid rgba(204, 204, 204, 0.5)" }}
              >
                <h4>Chọn kích cỡ</h4>
                {uniqueSizes.map((size, index) => (
                  <button
                    key={`size-${index}`}
                    style={{
                      border:
                        selectedSize === size
                          ? "2px solid black"
                          : "1px solid gray",
                      margin: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => handleOptionChange("size", size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {selectedSize && (
                <div
                  style={{ borderBottom: "1px solid rgba(204, 204, 204, 0.5)" }}
                >
                  <h4>Chọn màu sắc</h4>
                  {availableColors.map((detail, index) => (
                    <button
                      key={`color-${index}`}
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: detail.MA_MAU.toLowerCase(),
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        margin: "5px",
                        boxShadow:
                          selectedColor === detail.MAU_SAC_ID
                            ? `0 0 0 2px #fff, 0 0 0 4px ${detail.MA_MAU.toLowerCase()}`
                            : "none",
                      }}
                      onClick={() =>
                        handleOptionChange("color", detail.MAU_SAC_ID, detail)
                      }
                    />
                  ))}
                </div>
              )}

              <div>
                <h4>Tùy chọn đã chọn:</h4>
                {selectedDetail ? (
                  <>
                    <p>
                      ID sản phẩm chi tiết:{" "}
                      {selectedDetail.ID_SAN_PHAM_CHI_TIET}
                    </p>
                    <p>Kích cỡ: {selectedDetail.KICH_CO}</p>
                    <p>Màu sắc: {selectedDetail.TEN_MAU_SAC}</p>
                  </>
                ) : (
                  <p>Vui lòng chọn size và màu sắc</p>
                )}
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => handleAddToCart(false)}
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
              onClick={() => handleAddToCart(true)}
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
                Thể loại: {product.TEN_DANH_MUC} {/* Product Description */}
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
                Chất liệu: {product.TEN_CHAT_LIEU_ || "N/A"} {/* Material */}
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
                Số lượng trong kho còn : {product.SO_LUONG_SANPHAM}
                {/* {new Date(product.NGAY_TAO_SANPHAM).toLocaleDateString()} */}
              </Typography>{" "}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {id && <RecommenderProductCarousel ID_SAN_PHAM={id} />}
    </Container>
  );
};

export default SelectShoe;
