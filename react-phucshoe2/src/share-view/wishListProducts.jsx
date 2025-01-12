import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import FilterShoes from "../admin-view/pages/quanLySanPham/component/FilterShoe";
import { enqueueSnackbar } from "notistack";
import { setTotalCart } from "../redux/authSlice";
import { getThemeConfig } from "../services/themeService";
import WishlistItem from "./component/WishListItem";
import WishlistFilters from "./component/WishListFilter";
import translations from "../redux/data/translations";
const api = process.env.REACT_APP_URL_SERVER;

const WishlistProducts = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [thuongHieu, setThuongHieu] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [gioiTinh, setGioiTinh] = useState([]);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  // ----------------------------------------------
  const [phongCach, setPhongCach] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [mucDichSuDung, setMucDichSuDung] = useState([]);
  const [kichCo, setKichCo] = useState([]);
  useEffect(() => {
    if (!isAuthenticated || !userInfo) {
      // Redirect to login if the user is not authenticated or if userInfo is missing
      navigate("/login");
      return;
    }

    fetchWishlistItems();
  }, [isAuthenticated, userInfo, navigate]);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/san-pham/use/wishlist-user/${userInfo.ID_NGUOI_DUNG}`
      );
      const sortedItems = response.data.DT.sort(
        (a, b) => new Date(b.NGAY_YEU_THICH) - new Date(a.NGAY_YEU_THICH)
      );
      setItems(sortedItems);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        thuongHieuResponse,
        danhMucResponse,
        chatLieuResponse,
        gioiTinhResponse,
        phongCachResponse,
        mauSacResponse,
        mucDichSuDungResponse,
        kichCoResponse,
      ] = await Promise.all([
        axios.get(`${api}/thuong-hieu/use`),
        axios.get(`${api}/loai-danh-muc/use`),
        axios.get(`${api}/chat-lieu/use`),
        axios.get(`${api}/gioi-tinh/use`),

        axios.get(`${api}/phong-cach/use`),
        axios.get(`${api}/mau-sac/use`),
        axios.get(`${api}/muc-dich-su-dung/use`),
        axios.get(`${api}/kich-co/use`),
      ]);

      if (thuongHieuResponse.data.EC === 1) {
        setThuongHieu(thuongHieuResponse.data.DT);
      }
      if (danhMucResponse.data.EC === 1) {
        setDanhMuc(danhMucResponse.data.DT);
      }
      if (chatLieuResponse.data.EC === 1) {
        setChatLieu(chatLieuResponse.data.DT);
      }
      if (gioiTinhResponse.data.EC === 1) {
        setGioiTinh(gioiTinhResponse.data.DT);
      }
      if (phongCachResponse.data.EC === 1) {
        setPhongCach(phongCachResponse.data.DT);
      }
      if (mauSacResponse.data.EC === 1) {
        setMauSac(mauSacResponse.data.DT);
      }
      if (mucDichSuDungResponse.data.EC === 1) {
        setMucDichSuDung(mucDichSuDungResponse.data.DT);
      }
      if (kichCoResponse.data.EC === 1) {
        setKichCo(kichCoResponse.data.DT);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //filter products
  const [selectedThuongHieu, setSelectedThuongHieu] = useState("");
  const [selectedChatLieu, setSelectedChatLieu] = useState("");
  const [selectedTrangThai, setSelectedTrangThai] = useState("");

  const [selectMucDichSuDung, setSelectMucDichSuDung] = useState("");
  const [selectPhongCach, setSelectPhongCach] = useState("");
  const [selectKichCo, setSelectKichCo] = useState("");
  const [selectedMauSac, setSelectedMauSac] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Số sản phẩm hiển thị mỗi trang

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Nếu không có từ khóa tìm kiếm, khôi phục lại tất cả sản phẩm
    if (term === "") {
      setFilteredProducts(items);
    } else {
      // Lọc sản phẩm theo từ khóa tìm kiếm
      const filtered = items.filter((product) =>
        product.TEN_SAN_PHAM.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  console.log("items", items);
  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = items;

      // Parse CHI_TIET_SAN_PHAM for each product
      updatedProducts = updatedProducts.map((product) => {
        const details = product.CHI_TIET_SAN_PHAM
          ? product.CHI_TIET_SAN_PHAM.split(", ").map((detail) => {
              const [mauSac, kichCo] = detail.split(" - ");
              return { mauSac, kichCo };
            })
          : [];
        return { ...product, parsedDetails: details };
      });
      console.log("updatedProducts", updatedProducts);
      if (selectMucDichSuDung) {
        updatedProducts = updatedProducts.filter(
          (product) => product.ID_MUC_DICH_SU_DUNG === selectMucDichSuDung
        );
      }

      if (selectPhongCach) {
        updatedProducts = updatedProducts.filter(
          (product) => product.ID_PHUONG_CACH === selectPhongCach
        );
      }

      // Filter by size using parsed details
      if (selectKichCo) {
        updatedProducts = updatedProducts.filter((product) =>
          product.parsedDetails.some((detail) => detail.kichCo === selectKichCo)
        );
      }
      console.log("selectedMauSac", selectedMauSac);
      // Filter by color using parsed details
      if (selectedMauSac) {
        updatedProducts = updatedProducts.filter((product) =>
          product.parsedDetails.some(
            (detail) => detail.mauSac === selectedMauSac
          )
        );
      }

      if (selectedThuongHieu) {
        updatedProducts = updatedProducts.filter(
          (product) => product.ID_THUONG_HIEU === selectedThuongHieu
        );
      }

      if (selectedChatLieu) {
        updatedProducts = updatedProducts.filter(
          (product) => product.CHAT_LIEU_ID_ === selectedChatLieu
        );
      }

      if (selectedTrangThai !== "") {
        updatedProducts = updatedProducts.filter(
          (product) => product.TRANG_THAI_SANPHAM === selectedTrangThai
        );
      }

      if (searchTerm) {
        updatedProducts = updatedProducts.filter((product) =>
          product.TEN_SAN_PHAM.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Remove temporary parsedDetails before setting state
      updatedProducts = updatedProducts.map(
        ({ parsedDetails, ...product }) => product
      );
      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [
    selectedThuongHieu,
    selectedChatLieu,
    selectedTrangThai,
    searchTerm,
    items,
    selectKichCo,
    selectPhongCach,
    selectMucDichSuDung,
    selectedMauSac,
  ]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = async (idProduct) => {
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
        ID_SAN_PHAM: idProduct,
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
    }
  };
  const removeFromFavorites = async (idSanPham) => {
    try {
      const response = await axios.post(`${api}/yeu-thich/delete`, {
        idSanPham: idSanPham,
        idNguoiDung: userInfo.ID_NGUOI_DUNG,
      });

      if (response.data.EC === 1) {
        fetchWishlistItems();
        enqueueSnackbar(response.data.EM, { variant: "success" }); // Thông báo thành công
      } else {
        fetchWishlistItems();
        enqueueSnackbar(response.data.EM, { variant: "error" }); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" }); // Thông báo lỗi
    }
  };
  const [openViewProduct, setOpenViewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewProduct = (product) => {
    setOpenViewProduct(true);
    setSelectedProduct(product);
  };

  console.log("selectedProduct", selectedProduct);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Get unique sizes
  const uniqueSizes = [
    ...new Set(selectedProduct?.CHI_TIET_SAN_PHAMM.map((item) => item.KICH_CO)),
  ];

  // Get available colors for selected size
  const availableColors = selectedSize
    ? selectedProduct?.CHI_TIET_SAN_PHAMM.filter(
        (item) => item.KICH_CO === selectedSize
      )
    : [];

  const handleOptionChange = (type, value, detail) => {
    if (type === "size") {
      setSelectedSize(value);
      setSelectedColor(null);
      setSelectedDetail(null);
    } else if (type === "color") {
      setSelectedColor(value);
      // Find matching product detail
      const selected = selectedProduct.CHI_TIET_SAN_PHAMM.find(
        (item) => item.KICH_CO === selectedSize && item.MAU_SAC_ID === value
      );
      setSelectedDetail(selected);
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
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ color: currentTheme.color }}>
          {t.favorite}
        </Typography>

        <Divider sx={{ backgroundColor: "#555", mb: 2, mt: 4 }} />
      </Grid>
      <Grid item xs={12} md={8} lg={7}>
        {loading ? (
          <Typography color="white">{t.loadingButton}</Typography>
        ) : (
          filteredProducts.map((item, index) => (
            <WishlistItem
              handleViewProduct={handleViewProduct}
              item={item}
              isLoading={isLoading}
              removeFromFavorites={removeFromFavorites}
              setLoading={setLoading}
              handleAddToCart={handleAddToCart}
              key={index}
              idProduct={item.ID_SAN_PHAM}
              name={item.TEN_SAN_PHAM}
              price={item.GIA}
              rating="N/A" // You can replace it with actual rating if available
              tags={`${item.TEN_GIOI_TINH} | ${item.TEN_DANH_MUC} | ${item.TEN_CHAT_LIEU_} | ${item.TEN_THUONG_HIEU}`}
              inCart={false} // Assuming the value can be dynamically set
              image={item.HINH_ANH_SANPHAM}
              gender={item.TEN_GIOI_TINH}
              category={item.TEN_DANH_MUC}
              material={item.TEN_CHAT_LIEU_}
              brand={item.TEN_THUONG_HIEU}
              dateLiked={item.NGAY_YEU_THICH}
            />
          ))
        )}
      </Grid>{" "}
      {openViewProduct ? (
        <>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                defaultChecked
                color="primary"
                onClick={() => setOpenViewProduct(false)}
              />
              <Typography variant="body2" sx={{ color: currentTheme.color }}>
                {t.sortBy}:{" "}
              </Typography>
              <FormControl sx={{ ml: 1, minWidth: 120 }}>
                <Select
                  disabled={true}
                  sx={{ color: currentTheme.color }}
                  defaultValue="Newest"
                >
                  <MenuItem value="Newest">{t.newest}</MenuItem>

                  <MenuItem value="Popular">{t.popular}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Card sx={{ p: 2, backgroundColor: currentTheme.backgroundColor }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Grid item xs={9} md={9}>
                    {" "}
                    <Typography
                      variant="h5"
                      sx={{ color: currentTheme.color, mb: 1 }}
                    >
                      {selectedProduct?.TEN_SAN_PHAM}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={3} md={3}>
                    {" "}
                    <Typography
                      variant="body2"
                      color="gray"
                      sx={{ ml: 2, color: currentTheme.color, mb: 1 }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(selectedProduct?.GIA)}
                    </Typography>
                  </Grid>
                </Box>

                <img
                  src={`${api}/images/${selectedProduct?.HINH_ANH_SANPHAM}`}
                  alt={selectedProduct?.TEN_SAN_PHAM}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>{" "}
              <div>
                <div
                  style={{ borderBottom: "1px solid rgba(204, 204, 204, 0.5)" }}
                >
                  <h4>{t.selectSize}</h4>
                  {uniqueSizes.map((size, index) => (
                    <button
                      key={`size-${index}`}
                      style={{
                        backgroundColor:
                          selectedSize === size ? "#007bff" : "#f1f1f1", // Màu nền khi được chọn và không chọn
                        color: selectedSize === size ? "white" : "#333", // Màu chữ khi được chọn và không chọn
                        border:
                          selectedSize === size
                            ? "2px solid #007bff"
                            : "1px solid #ccc", // Viền khi được chọn và không chọn
                        borderRadius: "8px", // Góc bo tròn
                        padding: "8px 15px", // Padding cho nút
                        margin: "5px", // Khoảng cách giữa các nút
                        fontSize: "16px", // Kích thước chữ
                        cursor: "pointer", // Con trỏ chuột khi hover
                        transition: "all 0.3s ease", // Hiệu ứng chuyển đổi mượt mà
                      }}
                      onClick={() => handleOptionChange("size", size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {selectedSize && (
                  <div
                    style={
                      {
                        // borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
                      }
                    }
                  >
                    <h4>{t.selectColor}</h4>
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

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleAddToCart(selectedProduct?.ID_SAN_PHAM)
                    }
                    sx={{
                      backgroundColor: "#3ccaff",
                      color: "#000",
                      borderRadius: "14px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {t.AddToCart}
                  </Button>
                </Box>
              </div>
            </Card>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                defaultChecked
                color="primary"
                onClick={() => setOpenViewProduct(true)}
              />
              <Typography variant="body2" sx={{ color: currentTheme.color }}>
                {t.sortBy}:{" "}
              </Typography>
              <FormControl sx={{ ml: 1, minWidth: 120 }}>
                <Select
                  sx={{ color: currentTheme.color }}
                  defaultValue="Newest"
                >
                  <MenuItem value="Newest">{t.newest}</MenuItem>
                  <MenuItem value="On Sale">{t.onSale}</MenuItem>
                  <MenuItem value="Popular">{t.popular}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <WishlistFilters
              thuongHieu={thuongHieu}
              chatLieu={chatLieu}
              //
              selectedThuongHieu={selectedThuongHieu}
              selectedChatLieu={selectedChatLieu}
              selectedTrangThai={selectedTrangThai}
              //
              selectedMauSac={selectedMauSac}
              selectKichCo={selectKichCo}
              selectPhongCach={selectPhongCach}
              selectMucDichSuDung={selectMucDichSuDung}
              //
              setSelectedTrangThai={setSelectedTrangThai}
              setSelectedChatLieu={setSelectedChatLieu}
              setSelectedThuongHieu={setSelectedThuongHieu}
              //
              setSelectedMauSac={setSelectedMauSac}
              setSelectPhongCach={setSelectPhongCach}
              setSelectMucDichSuDung={setSelectMucDichSuDung}
              setSelectKichCo={setSelectKichCo}
              //
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              //
              phongCach={phongCach}
              mauSac={mauSac}
              mucDichSuDung={mucDichSuDung}
              kichCo={kichCo}
              //
              currentTheme={currentTheme}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default WishlistProducts;
