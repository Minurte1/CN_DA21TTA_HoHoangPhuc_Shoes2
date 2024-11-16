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
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import axios from "axios";
import ProductCarousel from "../../share-view/productCarousel";
import FilterShoes from "../../admin-view/pages/quanLySanPham/component/FilterShoe";
const api = process.env.REACT_APP_URL_SERVER;

const BrowseProduct = () => {
  const [filter, setFilter] = useState("");
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

  useEffect(() => {
    fetchProduct();
    fetchData();
  }, []);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${api}/san-pham/use`);
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
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const [selectedThuongHieu, setSelectedThuongHieu] = useState("");
  const [selectedChatLieu, setSelectedChatLieu] = useState("");
  const [selectedTrangThai, setSelectedTrangThai] = useState("");

  const [selectMucDichSuDung, setSelectMucDichSuDung] = useState("");
  const [selectPhongCach, setSelectPhongCach] = useState("");
  const [selectKichCo, setSelectKichCo] = useState("");
  const [selectedMauSac, setSelectedMauSac] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

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
      if (selectMucDichSuDung) {
        updatedProducts = updatedProducts.filter(
          (product) => product.ID_MUC_DICH_SU_DUNG === selectMucDichSuDung
        );
      }
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
      if (selectKichCo) {
        updatedProducts = updatedProducts.filter(
          (product) => product.ID_KICH_CO === selectKichCo
        );
      }
      if (selectedMauSac) {
        updatedProducts = updatedProducts.filter(
          (product) => product.MAU_SAC_ID === selectedMauSac
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

      // Nếu có từ khóa tìm kiếm, lọc lại
      if (searchTerm) {
        updatedProducts = updatedProducts.filter((product) =>
          product.TEN_SAN_PHAM.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [
    selectedThuongHieu,
    selectedChatLieu,
    selectedTrangThai,
    searchTerm, // Thêm searchTerm vào dependency array
    products,
    selectKichCo,
    selectPhongCach,
    selectMucDichSuDung,
    selectedMauSac,
  ]);

  return (
    <>
      <Box>
        <div>
          <ProductCarousel api={api} products={products} />
        </div>

        <div style={{ display: "flex" }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {/* Product Grid */}
            <Grid item xs={12} sm={9} container spacing={2}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                      alt={product.TEN_SAN_PHAM}
                      sx={{
                        objectFit: "contain", // Đảm bảo toàn bộ hình ảnh được hiển thị
                        display: "block", // Đặt display là block
                        margin: "0 auto", // Căn giữa hình ảnh theo chiều ngang
                      }}
                    />

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.TEN_SAN_PHAM}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.MO_TA_SAN_PHAM}
                      </Typography>
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
            >
              {/* <SidebarFilter
                filter={filter}
                onFilterChange={handleFilterChange}
              /> */}
            </Drawer>
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
      </Box>
    </>
  );
};

// Sidebar filter component
// const SidebarFilter = ({ filter, onFilterChange }) => (
//   <div style={{ padding: "20px" }}>
//     {/* Filter Products */}
//     <FilterShoes
//       thuongHieu={thuongHieu}
//       chatLieu={chatLieu}
//       //
//       selectedThuongHieu={selectedThuongHieu}
//       selectedChatLieu={selectedChatLieu}
//       selectedTrangThai={selectedTrangThai}
//       //
//       selectedMauSac={selectedMauSac}
//       selectKichCo={selectKichCo}
//       selectPhongCach={selectPhongCach}
//       selectMucDichSuDung={selectMucDichSuDung}
//       //
//       setSelectedTrangThai={setSelectedTrangThai}
//       setSelectedChatLieu={setSelectedChatLieu}
//       setSelectedThuongHieu={setSelectedThuongHieu}
//       //
//       setSelectedMauSac={setSelectedMauSac}
//       setSelectPhongCach={setSelectPhongCach}
//       setSelectMucDichSuDung={setSelectMucDichSuDung}
//       setSelectKichCo={setSelectKichCo}
//       //
//       searchTerm={searchTerm}
//       handleSearchChange={handleSearchChange}
//       //
//       phongCach={phongCach}
//       mauSac={mauSac}
//       mucDichSuDung={mucDichSuDung}
//       kichCo={kichCo}
//     />
//   </div>
// );

export default BrowseProduct;
