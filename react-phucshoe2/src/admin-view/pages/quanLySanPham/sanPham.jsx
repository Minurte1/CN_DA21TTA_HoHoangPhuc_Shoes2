import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import FilterShoes from "./component/FilterShoe";
import TableShoes from "./component/TableShoes";
import DialogShoes from "./component/DialogShoes";

const api = process.env.REACT_APP_URL_SERVER;

const SanPhamManager = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // ----------------------------------------------
  const [thuongHieu, setThuongHieu] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [gioiTinh, setGioiTinh] = useState([]);

  // ----------------------------------------------
  const [phongCach, setPhongCach] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [mucDichSuDung, setMucDichSuDung] = useState([]);
  const [kichCo, setKichCo] = useState([]);

  // ----------------------------------------------
  const [option, setOption] = useState(true);

  const [formData, setFormData] = useState({
    idThuongHieu: "",
    idDanhMuc: "",
    gioiTinhId: "",
    chatLieuId: "",
    tenSanPham: "",
    gia: "",
    moTaSanPham: "",
    images: null,
    trangThaiSanPham: 1,
    soLuongSanPham: "",

    phongCachId: "",
    mauSacId: "",
    mucDichSuDungId: "",
    kichCoId: "",

    optionFormData: true,
  });

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${api}/san-pham`);
      if (response.data.EC === 1) {
        setProducts(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
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

  const handleOpenDialog = (product = null) => {
    setCurrentProduct(product);
    setFormData({
      idThuongHieu: product ? product.ID_THUONG_HIEU : "",
      idDanhMuc: product ? product.ID_DANH_MUC : "",
      gioiTinhId: product ? product.GIOI_TINH_ID : "",
      chatLieuId: product ? product.CHAT_LIEU_ID_ : "",
      tenSanPham: product ? product.TEN_SAN_PHAM : "",
      gia: product ? product.GIA : "",
      moTaSanPham: product ? product.MO_TA_SAN_PHAM : "",
      soLuongSanPham: product ? product.SO_LUONG_SANPHAM : "",
      images: product ? product.HINH_ANH_SANPHAM : "",
      trangThaiSanPham: product ? product.TRANG_THAI_SANPHAM : 1,

      phongCachId: product ? product.ID_PHUONG_CACH : "",
      mauSacId: product ? product.MAU_SAC_ID : "",
      mucDichSuDungId: product ? product.ID_MUC_DICH_SU_DUNG : "",
      kichCoId: product ? product.ID_KICH_CO : "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct(null);
    setFormData({
      idThuongHieu: "",
      idDanhMuc: "",
      gioiTinhId: "",
      chatLieuId: "",
      tenSanPham: "",
      gia: "",
      moTaSanPham: "",
      images: null,
      trangThaiSanPham: 1,
      soLuongSanPham: "",

      phongCachId: "",
      mauSacId: "",
      mucDichSuDungId: "",
      kichCoId: "",
    });
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      // Append each field in formData to formDataToSend
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      // Add option value to formDataToSend
      formDataToSend.append("option", option);

      if (currentProduct) {
        // Update product
        await axios.put(
          `${api}/san-pham/${currentProduct.ID_SAN_PHAM}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new product
        await axios.post(`${api}/san-pham`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/san-pham/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Separate handler for file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: e.target.files[0], // Store the file object
    }));
  };

  // filter products

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
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Quản lý sản phẩm
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Add Product
        </Button>
      </Box>

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
      {/* Show Products */}
      <TableShoes
        filteredProducts={filteredProducts}
        handleOpenDialog={handleOpenDialog}
        handleDelete={handleDelete}
        api={api}
      />
      {/* Dialog for Adding/Editing Product */}
      <DialogShoes
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        currentProduct={currentProduct}
        handleChange={handleChange}
        handleSave={handleSave}
        handleFileChange={handleFileChange}
        //
        formData={formData}
        //
        thuongHieu={thuongHieu}
        danhMuc={danhMuc}
        gioiTinh={gioiTinh}
        chatLieu={chatLieu}
        //
        phongCach={phongCach}
        mauSac={mauSac}
        mucDichSuDung={mucDichSuDung}
        kichCo={kichCo}
        setOption={setOption}
        option={option}
      />
    </Container>
  );
};

export default SanPhamManager;
