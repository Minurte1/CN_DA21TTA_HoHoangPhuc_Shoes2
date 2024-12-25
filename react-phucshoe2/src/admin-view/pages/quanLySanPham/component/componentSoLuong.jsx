import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const api = process.env.REACT_APP_URL_SERVER;

export default function ProductDetailInput({ products }) {
  const [productDetails, setProductDetails] = useState([]);
  const [quantityData, setQuantityData] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${api}/san-pham/chi-tiet/${products.ID_SAN_PHAM}`
        );
        const data = response.data.DT;

        setProductDetails(data);

        // Tạo dữ liệu ban đầu cho quantityData
        const initialData = {};
        data.forEach((item) => {
          const key = `${item.TEN_MAU_SAC}_${item.KICH_CO}`;
          initialData[key] = item.SOLUONG_SANPHAM_CHITIET || "";
        });
        setQuantityData(initialData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [products]);

  const handleChange = (color, size, value) => {
    setQuantityData((prev) => ({
      ...prev,
      [`${color}_${size}`]: value,
    }));
  };

  const handleSummit = async () => {
    const updatedDetails = productDetails.map((item) => {
      const key = `${item.TEN_MAU_SAC}_${item.KICH_CO}`;
      return {
        idSanPhamChiTiet: item.ID_SAN_PHAM_CHI_TIET,
        mauSacId: item.MAU_SAC_ID,
        kichCoId: item.ID_KICH_CO,
        soLuongSanPhamChiTiet: quantityData[key] || null,
      };
    });

    try {
      const response = await axios.put(
        `${api}/san-pham/chi-tiet/${products.ID_SAN_PHAM}`,
        { chiTietSanPham: updatedDetails }
      );
      console.log(response.data);
      alert("Cập nhật thành công");
    } catch (error) {
      console.error("Error updating product details:", error);
      alert("Có lỗi xảy ra khi cập nhật chi tiết sản phẩm");
    }
  };

  // Lấy danh sách các màu sắc và kích cỡ duy nhất
  const colors = [...new Set(productDetails.map((item) => item.TEN_MAU_SAC))];
  const sizes = [...new Set(productDetails.map((item) => item.KICH_CO))];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Màu sắc \ Kích cỡ</TableCell>
            {sizes.map((size, index) => (
              <TableCell key={index}>{size}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map((color) => (
            <TableRow key={color}>
              <TableCell>{color}</TableCell>
              {sizes.map((size) => {
                const key = `${color}_${size}`;
                const isDisabled = !productDetails.some(
                  (item) => item.TEN_MAU_SAC === color && item.KICH_CO === size
                );

                return (
                  <TableCell key={key}>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={quantityData[key] || ""}
                      onChange={(e) =>
                        handleChange(color, size, e.target.value)
                      }
                      disabled={isDisabled} // Disable nếu không có trong dữ liệu
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleSummit}>
        Lưu
      </Button>
    </div>
  );
}
