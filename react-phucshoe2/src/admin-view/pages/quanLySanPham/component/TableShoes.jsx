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
import { useSelector } from "react-redux";
import translations from "../../../../redux/data/translations";

const TableShoes = ({
  filteredProducts,
  handleOpenDialog,
  handleDelete,
  api,
}) => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

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
              {t.brandLabel}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              {t.categoryLabel}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              {t.materialLabel}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              {t.productName}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>{t.price}</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              {t.descriptionLabel}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>{t.image}</TableCell>
            <TableCell sx={{ color: currentTheme.color }}>{t.status}</TableCell>
            {/* <TableCell sx={{ color: currentTheme.color }}>Số lượng</TableCell> */}
            <TableCell sx={{ color: currentTheme.color }}>
              {t.dateAdded}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              {t.dateUpdated}
            </TableCell>
            <TableCell sx={{ color: currentTheme.color }}>
              {t.actions}
            </TableCell>
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
                  ? t.activeStatus
                  : t.inactiveStatus}
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
