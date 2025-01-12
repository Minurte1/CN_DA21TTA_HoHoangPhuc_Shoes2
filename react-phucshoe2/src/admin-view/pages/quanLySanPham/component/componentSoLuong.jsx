import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import translations from "../../../../redux/data/translations";
import { useSelector } from "react-redux";

const api = process.env.REACT_APP_URL_SERVER;

export default function ProductDetailInput({ products }) {
  const [productDetails, setProductDetails] = useState([]);
  const [quantityData, setQuantityData] = useState({});
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

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

  console.log("quantityData", quantityData);
  const handleSummit = async () => {
    // Tạo một mảng mới chứa tất cả các chi tiết từ quantityData
    const updatedDetails = [];

    const existingDetails = [];
    const newDetails = [];

    // Duyệt qua mỗi item trong quantityData để tạo thông tin chi tiết mới
    Object.keys(quantityData).forEach((key) => {
      const [mauSac, kichCo] = key.split("_");

      // Kiểm tra nếu chi tiết sản phẩm đã có trong productDetails
      const existingItem = productDetails.find(
        (item) => item.TEN_MAU_SAC === mauSac && item.KICH_CO === kichCo
      );

      const newDetail = {
        mauSacId: mauSac,
        kichCoId: kichCo,
        soLuongSanPhamChiTiet: quantityData[key],
      };
      console.log("existingItem", existingItem);
      if (existingItem) {
        // Nếu đã có, cập nhật thông tin chi tiết
        newDetail.idSanPhamChiTiet = existingItem.ID_SAN_PHAM_CHI_TIET;
        existingDetails.push(newDetail); // Thêm vào mảng existingDetails
      } else {
        // Nếu chưa có, thêm vào mảng newDetails
        newDetails.push(newDetail);
      }

      updatedDetails.push(newDetail); // Thêm vào updatedDetails
    });

    try {
      const response = await axios.put(
        `${api}/san-pham/chi-tiet/${products.ID_SAN_PHAM}`,
        {
          chiTietSanPham: updatedDetails,
          existingDetails: existingDetails,
          newDetails: newDetails, // Gửi mảng chi tiết mới nếu có
        }
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
            <TableCell>
              {t.color} \ {t.Size}
            </TableCell>
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
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{ mt: 2 }}
          variant="text"
          color="primary"
          onClick={handleSummit}
        >
          {t.save}
        </Button>
      </Box>
    </div>
  );
}
