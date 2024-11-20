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
const api = process.env.REACT_APP_URL_SERVER;
const WishlistItem = ({
  name,
  price,
  rating,
  tags,
  inCart,
  image,
  gender,
  category,
  material,
  brand,
  dateLiked,
  handleAddToCart,
  isLoading,
  idProduct,
}) => {
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
          src={`${api}/images/${image}`} // Replace with correct image URL
          alt={`${name} thumbnail`}
          style={{ marginRight: 16, width: "80px", borderRadius: "13px" }}
        />
        <Box>
          <Typography variant="h6" color="white">
            {name}
          </Typography>
          <Typography variant="body2" color="gray">
            {gender} | {category} | {material} | {brand}
          </Typography>
          <Typography variant="body2" color="gray">
            Rating: {rating}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h6" color="white">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </Typography>
        <Button
          variant="text"
          sx={{
            color: "#c9d1d9",
            textTransform: "none",
            mr: 2,
            "&:hover": {
              color: "#fffff", // Change text color on hover
            },
          }}
        >
          Remove
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: "14px",
            backgroundColor: inCart ? "#cccccc" : "#26bbff",
            color: inCart ? "#666666" : "#101014",
            fontWeight: "600",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: inCart ? "#b3b3b3" : "#3ccaff",
            },
          }}
          onClick={() => handleAddToCart(idProduct)}
          disabled={inCart || isLoading} // Vô hiệu hóa nút nếu sản phẩm đã trong giỏ hàng hoặc đang xử lý
        >
          {isLoading
            ? "Processing..."
            : inCart
            ? "View In Cart"
            : "Add To Cart"}
        </Button>
      </Box>
    </Card>
  );
};

const WishlistFilters = ({
  thuongHieu,
  chatLieu,
  selectedThuongHieu,
  selectedChatLieu,
  selectedTrangThai,
  searchTerm,

  handleSearchChange,
  setSelectedTrangThai,
  setSelectedChatLieu,
  setSelectedThuongHieu,
  setSelectedMauSac,

  selectKichCo,
  selectPhongCach,
  selectMucDichSuDung,
  selectedMauSac,

  //
  setSelectPhongCach,
  setSelectMucDichSuDung,
  setSelectKichCo,
  //
  phongCach,
  mauSac,
  mucDichSuDung,
  kichCo,
}) => (
  <Box
    sx={{ backgroundColor: "#202024", p: 2, borderRadius: 2, color: "white" }}
  >
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
  </Box>
);

const WishlistProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = items;
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
    try {
      setIsLoading(true);
      const updateDate = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Lấy ngày giờ hiện tại và định dạng

      const response = await axios.post(
        `${api}/yeu-thich/add-cart/delete-wish`,
        {
          userId: userInfo.ID_NGUOI_DUNG,
          productId: idProduct,
          updateDate,
        }
      );

      console.log("responsive ", response.data);
      if (response.data.EC === 1) {
        // Cập nhật trạng thái giỏ hàng thành công
        fetchWishlistItems();
        dispatch(setTotalCart(response.data.totalQuantity));
        enqueueSnackbar(response.data.EM); // Hiển thị thông báo
      } else {
        enqueueSnackbar(response.data.EM); // Hiển thị lỗi từ API
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      enqueueSnackbar("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    } finally {
      setIsLoading(false);
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
      sx={{ p: 4, backgroundColor: "#121212", justifyContent: "center" }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" color="white">
          My Wishlist
        </Typography>
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
      <Grid item xs={12} md={7} lg={7}>
        {loading ? (
          <Typography color="white">Loading...</Typography>
        ) : (
          filteredProducts.map((item, index) => (
            <WishlistItem
              isLoading={isLoading}
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
      </Grid>
      <Grid item xs={12} md={4}>
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
        />
      </Grid>
    </Grid>
  );
};

export default WishlistProducts;
