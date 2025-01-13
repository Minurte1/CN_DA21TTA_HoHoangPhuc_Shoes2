import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Drawer,
  IconButton,
  Box,
  Pagination,
  Tooltip,
} from "@mui/material";
import {
  FilterList,
  AddShoppingCart,
  ControlPoint,
  FavoriteBorder,
} from "@mui/icons-material";
import axios from "axios";
import ProductCarousel from "../../share-view/productCarousel";
import FilterShoes from "../../admin-view/pages/quanLySanPham/component/FilterShoe";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTotalCart } from "../../redux/authSlice";
import { enqueueSnackbar } from "notistack";
import { getThemeConfig } from "../../services/themeService";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import FavoriteIcon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const api = process.env.REACT_APP_URL_SERVER;

const BrowseProduct = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [thuongHieu, setThuongHieu] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [gioiTinh, setGioiTinh] = useState([]);

  // ----------------------------------------------
  const [phongCach, setPhongCach] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [mucDichSuDung, setMucDichSuDung] = useState([]);
  const [kichCo, setKichCo] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    fetchProduct();
    fetchData();
  }, []);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.post(`${api}/san-pham/use`, {
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG,
      });
      if (response.data.EC === 1) {
        setProducts(response.data.DT); // Set product data
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

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

  const handleBuyProduct = (id) => {
    navigate(`/selectShoe/${id}`);
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      // Nếu chưa, chuyển hướng đến trang đăng nhập
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        ID_SAN_PHAM: product.ID_SAN_PHAM,
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG, // ID người dùng
        NGAY_CAP_NHAT_GIOHANG: new Date().toISOString(),
      };

      const response = await axios.post(`${api}/gio-hang/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM);
        dispatch(setTotalCart(response.data.totalQuantity));
      } else {
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
        idSanPham: product.ID_SAN_PHAM,
        idNguoiDung: userInfo.ID_NGUOI_DUNG, // ID người dùng
      };

      const response = await axios.post(`${api}/yeu-thich/`, payload);

      if (response.data.EC === 1) {
        fetchProduct();
        enqueueSnackbar(response.data.EM, { variant: "success" });
      } else {
        enqueueSnackbar(response.data.EM, { variant: "info" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM);
    }
  };

  const removeFromFavorites = async (product) => {
    try {
      const response = await axios.post(`${api}/yeu-thich/delete`, {
        idSanPham: product.ID_SAN_PHAM,
        idNguoiDung: userInfo.ID_NGUOI_DUNG,
      });

      if (response.data.EC === 1) {
        fetchProduct();
        enqueueSnackbar(response.data.EM, { variant: "success" }); // Thông báo thành công
      } else {
        enqueueSnackbar(response.data.EM, { variant: "info" }); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" }); // Thông báo lỗi
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

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Số sản phẩm hiển thị mỗi trang

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Nếu không có từ khóa tìm kiếm, khôi phục lại tất cả sản phẩm
    if (term === "") {
      setFilteredProducts(products);
    } else {
      // Lọc sản phẩm theo từ khóa tìm kiếm
      const filtered = products.filter((product) =>
        product.TEN_SAN_PHAM.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = products;

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
    products,
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
  console.log("currentProducts", currentProducts);
  return (
    <>
      <Box>
        <div>
          <ProductCarousel
            api={api}
            products={products}
            fetchProducts={fetchProduct}
          />
        </div>

        <div style={{ display: "flex" }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {/* Product Grid */}
            <Grid item xs={12} sm={9} container spacing={2}>
              {currentProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{ position: "relative", cursor: "pointer" }}
                    onClick={() => handleBuyProduct(product.ID_SAN_PHAM)}
                  >
                    {" "}
                    {/* Đảm bảo Card có position: relative */}
                    <Tooltip title="Add to Wish" arrow>
                      {product.isLiked ? (
                        <FavoriteIcon
                          sx={{
                            position: "absolute", // Đặt icon ở góc trên bên phải
                            top: 8,
                            right: 8,
                            color: "red", // Màu đỏ khi liked
                            borderRadius: "50%", // Tạo hình tròn cho icon
                            margin: "8px",
                            fontSize: "23px",
                            cursor: "pointer",
                            transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động khi hover
                            "&:hover": {
                              transform: "scale(1.2)", // Phóng to icon khi hover
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                            removeFromFavorites(product); // Gọi hàm thêm vào giỏ hàng
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{
                            position: "absolute", // Đặt icon ở góc trên bên phải
                            top: 8,
                            right: 8,
                            color: "#101014", // Màu đen khi chưa liked
                            borderRadius: "50%", // Tạo hình tròn cho icon
                            margin: "8px",
                            fontSize: "23px",
                            cursor: "pointer",
                            transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động khi hover
                            "&:hover": {
                              transform: "scale(1.2)", // Phóng to icon khi hover
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                            handleAddToWish(product); // Gọi hàm thêm vào giỏ hàng
                          }}
                        />
                      )}
                    </Tooltip>
                    <CardMedia
                      component="img"
                      image={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                      alt={product.TEN_SAN_PHAM}
                      sx={{
                        height: {
                          xs: "210px",
                          sm: "210px",
                          md: "210px",
                          lg: "210px",
                        },
                        objectFit: "contain",
                        borderRadius: "15px",
                        transition: "filter 0.3s ease",
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          whiteSpace: "nowrap", // Đảm bảo văn bản không xuống dòng
                          overflow: "hidden", // Ẩn phần văn bản vượt quá chiều rộng
                          textOverflow: "ellipsis", // Thêm dấu "..." khi văn bản bị cắt bớt
                        }}
                      >
                        {product.TEN_SAN_PHAM}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          whiteSpace: "nowrap", // Đảm bảo văn bản không xuống dòng
                          overflow: "hidden", // Ẩn phần văn bản vượt quá chiều rộng
                          textOverflow: "ellipsis", // Thêm dấu "..." khi văn bản bị cắt bớt
                        }}
                      >
                        {`${product.GIA.toLocaleString("vi-VN")}đ`}
                        {product.KICH_CO ? ` - Size: ${product.KICH_CO}` : ``}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          whiteSpace: "nowrap", // Đảm bảo văn bản không xuống dòng
                          overflow: "hidden", // Ẩn phần văn bản vượt quá chiều rộng
                          textOverflow: "ellipsis", // Thêm dấu "..." khi văn bản bị cắt bớt
                        }}
                      >
                        {product.MO_TA_SAN_PHAM}
                      </Typography>

                      {/* <Tooltip title="Add to cart" arrow>
                        <AddShoppingCart
                          sx={{
                            cursor: "pointer",
                            mt: 2,
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              color: "#555",
                              transform: "scale(1.2)",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Ngừng sự kiện click lên card khi nhấn vào icon
                            // handleAddToCart(product);
                          }}
                        />
                      </Tooltip> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Desktop Filter Sidebar on Right */}
            <Grid item xs={12} sm={3} display={{ xs: "none", sm: "block" }}>
              {/* Filter Products */}
              <FilterShoes
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
                offStatus={true}
              />
            </Grid>

            {/* Drawer for Mobile Filter Sidebar */}
            <Drawer
              variant="temporary"
              anchor="right" // Mở Drawer từ bên phải
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
              }}
            ></Drawer>
          </Grid>

          {/* Mobile Filter Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // Căn bên phải cho nút filter trên mobile
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { sm: "none" },
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <FilterList />
          </IconButton>
        </div>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)} // Tổng số trang
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            ".MuiPagination-ul": {
              borderRadius: "8px", // Bo góc
              padding: "4px 8px", // Khoảng cách bên trong
            },
            ".MuiPaginationItem-root": {
              color: currentTheme.color, // Màu chữ đen
              fontWeight: "bold", // Chữ đậm
            },
            ".Mui-selected": {
              color: "#ffffff", // Màu chữ trắng
            },
            ".MuiPaginationItem-ellipsis": {
              color: "#999999", // Màu cho dấu "..."
            },
          }}
        />
      </Box>
    </>
  );
};

export default BrowseProduct;
