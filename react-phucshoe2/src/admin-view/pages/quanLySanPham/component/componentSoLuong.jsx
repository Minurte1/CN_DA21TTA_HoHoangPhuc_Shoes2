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
import { fetchProductDetails } from "./api";

export default function ProductDetailInput({ productId }) {
  const [formData, setFormData] = useState(null);
  const [quantityData, setQuantityData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setFormData(data);

        // Khởi tạo dữ liệu quantityData từ formData
        const initialData = {};
        data.CHI_TIET_SAN_PHAMM.forEach((item) => {
          const key = `${item.TEN_MAU_SAC}_${item.KICH_CO}`;
          initialData[key] = item.SOLUONG_SANPHAM_CHITIET;
        });
        setQuantityData(initialData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getData();
  }, [productId]);

  const handleChange = (color, size, value) => {
    setQuantityData((prev) => ({
      ...prev,
      [`${color}_${size}`]: Number(value),
    }));
  };

  const handleSave = () => {
    const updatedDetails = Object.entries(quantityData).map(([key, value]) => {
      const [color, size] = key.split("_");
      const detail = formData.CHI_TIET_SAN_PHAMM.find(
        (item) => item.TEN_MAU_SAC === color && item.KICH_CO === size
      );
      return {
        ...detail,
        SOLUONG_SANPHAM_CHITIET: value,
      };
    });

    console.log("Updated Product Details:", updatedDetails);
    // Gửi updatedDetails lên API
  };

  if (!formData) {
    return <div>Loading...</div>; // Hiển thị loader khi chưa có dữ liệu
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Màu sắc \ Kích cỡ</TableCell>
            {formData.kichCoId?.map((id, index) => (
              <TableCell key={index}>
                {
                  formData.CHI_TIET_SAN_PHAMM?.find(
                    (item) => item.ID_KICH_CO === id
                  )?.KICH_CO
                }
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.mauSacId?.map((id) => {
            const colorItem = formData.CHI_TIET_SAN_PHAMM.find(
              (item) => item.MAU_SAC_ID === id
            );
            return (
              <TableRow key={colorItem.TEN_MAU_SAC}>
                <TableCell>{colorItem.TEN_MAU_SAC}</TableCell>
                {formData.kichCoId?.map((sizeId) => {
                  const sizeItem = formData?.CHI_TIET_SAN_PHAMM?.find(
                    (item) =>
                      item.MAU_SAC_ID === id && item.ID_KICH_CO === sizeId
                  );
                  const size = sizeItem ? sizeItem.KICH_CO : "";
                  const key = `${colorItem.TEN_MAU_SAC}_${size}`;
                  return (
                    <TableCell key={key}>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={quantityData[key] || ""}
                        onChange={(e) =>
                          handleChange(
                            colorItem.TEN_MAU_SAC,
                            size,
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Lưu
      </Button>
    </div>
  );
}
