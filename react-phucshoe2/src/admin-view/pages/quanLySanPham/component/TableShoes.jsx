import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { getThemeConfig } from "../../../../services/themeService";

const TableShoes = ({
  filteredProducts,
  handleOpenDialog,
  handleDelete,
  api,
}) => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  return (
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
              Thương hiệu
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Thể loại</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Chất liệu</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              Tên sản phẩm
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Giá tiền</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Mô tả</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Hình ảnh</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Trạng thái</TableCell>
            {/* <TableCell sx={{ color: currentTheme.color }}>Số lượng</TableCell> */}
            <TableCell sx={{ color: currentTheme.color }}>
              Ngày thêm vào hệ thống
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              Ngày cập nhật
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.ID_SAN_PHAM}>
              <TableCell sx={{ color: currentTheme.color }}>
                {product.ID_SAN_PHAM}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {product.TEN_THUONG_HIEU}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {product.TEN_DANH_MUC}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {product.TEN_CHAT_LIEU_}
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
              <TableCell sx={{ color: currentTheme.color }}>
                {product.MO_TA_SAN_PHAM}
              </TableCell>
              <TableCell>
                <img
                  src={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                  alt="Product"
                  width="50"
                />
              </TableCell>
              <TableCell
                sx={{
                  color: product.TRANG_THAI_SANPHAM === 1 ? "#008000" : "red",
                }}
              >
                {product.TRANG_THAI_SANPHAM === 1
                  ? "Đang hoạt động"
                  : "Ngưng hoạt động"}
              </TableCell>
              {/* <TableCell sx={{ color: currentTheme.color }}>
                {product.SO_LUONG_SANPHAM}
              </TableCell> */}
              <TableCell sx={{ color: currentTheme.color }}>
                {moment(product.NGAY_TAO_SANPHAM).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {moment(product.NGAY_CAP_NHAT_SANPHAM).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleOpenDialog(product)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(product.ID_SAN_PHAM)}
                  color="secondary"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableShoes;
