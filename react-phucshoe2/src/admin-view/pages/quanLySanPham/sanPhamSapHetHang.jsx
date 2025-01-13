import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios"; // Import axios để gọi API
import translations from "../../../redux/data/translations";
import { getThemeConfig } from "../../../services/themeService";
import * as XLSX from "xlsx"; // Import thư viện xử lý Excel
import GetAppIcon from "@mui/icons-material/GetApp";
const ShoesSapHetHang = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [products, setProducts] = useState([]); // State lưu dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [openModal, setOpenModal] = useState(false); // Trạng thái modal
  const [loadingExport, setLoadingExport] = useState(false); // Trạng thái khi xuất dữ liệu

  // API endpoint để lấy sản phẩm (điều chỉnh theo backend của bạn)
  const api = process.env.REACT_APP_URL_SERVER;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api}/san-pham/products-under-20`);
        if (response.data.EC === 1) {
          setProducts(response.data.DT); // Lưu dữ liệu vào state
        } else {
          console.error("Lỗi khi lấy sản phẩm");
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      } finally {
        setLoading(false); // Đặt lại trạng thái loading sau khi đã gọi API
      }
    };

    fetchProducts();
  }, [api]);

  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");

  // Nếu dữ liệu đang tải, hiển thị loading
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleExportExcel = () => {
    setLoadingExport(true);
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Tạo và tải file Excel
    XLSX.writeFile(workbook, "products_under_20.xlsx");
    setLoadingExport(false);
    setOpenModal(false); // Đóng modal sau khi xuất xong
  };

  return (
    <div>
      {" "}
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
          mt: 4,
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Shoes Sắp Hết Hàng
        </Typography>
        <Button
          variant="outlined"
          startIcon={<GetAppIcon />}
          onClick={handleExportExcel}
          sx={{ marginBottom: 2, backgroundColor: "#fff", color: "black" }}
        >
          Export to Excel
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.color }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.productName}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.price}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.image}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>{t.Size}</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.color}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.ID_SAN_PHAM}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {product.ID_SAN_PHAM}
                </TableCell>
                <TableCell sx={{ color: "#1976d2" }}>
                  {product.TEN_SAN_PHAM}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {product.GIA.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell>
                  <img
                    src={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                    alt="Product"
                    width="50"
                  />
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {product.KICH_CO}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {product.TEN_MAU_SAC}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShoesSapHetHang;
