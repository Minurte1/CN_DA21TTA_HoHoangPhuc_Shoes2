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

const TableShoes = ({
  filteredProducts,
  handleOpenDialog,
  handleDelete,
  api,
}) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#101014" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#26bbff" }}>ID</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Thương hiệu</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Thể loại</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Chất liệu</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Tên sản phẩm</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Giá tiền</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Mô tả</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Hình ảnh</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Trạng thái</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Số lượng</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>
              Ngày thêm vào hệ thống
            </TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Ngày cập nhật</TableCell>
            <TableCell sx={{ color: "#26bbff" }}>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.ID_SAN_PHAM}>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {product.ID_SAN_PHAM}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {product.TEN_THUONG_HIEU}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {product.TEN_DANH_MUC}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {product.TEN_CHAT_LIEU_}
              </TableCell>
              <TableCell sx={{ color: "#1976d2" }}>
                {product.TEN_SAN_PHAM}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {product.GIA.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
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
                  color: product.TRANG_THAI_SANPHAM === 1 ? "#73ec8b" : "red",
                }}
              >
                {product.TRANG_THAI_SANPHAM === 1
                  ? "Đang hoạt động"
                  : "Ngưng hoạt động"}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {product.SO_LUONG_SANPHAM}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
                {moment(product.NGAY_TAO_SANPHAM).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell sx={{ color: "#c9d1d9" }}>
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
