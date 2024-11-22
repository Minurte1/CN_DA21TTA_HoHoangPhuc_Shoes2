import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Paper,
  Divider,
  Skeleton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DanhGiaSanPhamUser = () => {
  const { id } = useParams(); // Nhận ID đơn hàng từ URL
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const api = process.env.REACT_APP_URL_SERVER;
  const [dataChiTietHoaDon, setDataChiTietHoaDon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Hàm lấy thông tin chi tiết sản phẩm
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${api}/chi-tiet-hoa-don/${id}`);
      if (response.data) {
        setLoading(false);
        setDataChiTietHoaDon(response.data.DT); // Lưu dữ liệu vào state
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch thông tin chi tiết khi productId thay đổi
  useEffect(() => {
    if (id) {
      fetchProductDetails(); // Gọi hàm fetchProductDetails khi có productId
    }
  }, [id]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = () => {
    // Gửi đánh giá và bình luận lên server
    console.log({
      id,
      rating,
      comments,
    });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Button onClick={() => navigate(-1)}>Trở về</Button>

      {/* Danh sách đơn hàng */}
      <Box mt={2}>
        <Paper sx={{ mb: 2, p: 2, textAlign: "left" }}>
          {/* Thông tin đơn hàng */}
          {loading ? (
            <Skeleton variant="text" width="80%" height={40} />
          ) : (
            <>
              <Typography variant="h6">{dataChiTietHoaDon.ID_ODER}</Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                Trạng thái:{" "}
                <Typography
                  component="span"
                  sx={{
                    color:
                      dataChiTietHoaDon.TRANG_THAI_DON_HANG ===
                      "Giao dịch thành công"
                        ? "green"
                        : "text.secondary",
                  }}
                >
                  {dataChiTietHoaDon.TRANG_THAI_DON_HANG}
                </Typography>
              </Typography>

              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                Tổng tiền: {dataChiTietHoaDon.TONG_TIEN.toLocaleString("vi-VN")}
                ₫
              </Typography>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Danh sách sản phẩm */}
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={120} />
          ) : (
            dataChiTietHoaDon.chiTietHoaDon?.map((product, prodIndex) => (
              <>
                {" "}
                <Box
                  key={prodIndex}
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <img
                    src={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                    alt={product.HINH_ANH_SANPHAM}
                    style={{ width: 80, height: 80, marginRight: 16 }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="body1">
                      {product.TEN_SAN_PHAM}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Số lượng: {product.SO_LUONG_SP}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: "#f60" }}>
                      Giá:{" "}
                      {product.GIA_SAN_PHAM_CHI_TIET.toLocaleString("vi-VN")}₫
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {" "}
                  {/* Đánh giá sản phẩm */}
                  {loading ? (
                    <>
                      <Skeleton variant="text" width="80%" height={40} />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={48}
                      />
                    </>
                  ) : (
                    <>
                      <Typography gutterBottom>Đánh giá sản phẩm</Typography>
                      <Box sx={{ mb: 3 }}>
                        <Typography gutterBottom>Đánh giá số sao:</Typography>
                        <Rating
                          value={rating}
                          onChange={(e, newValue) =>
                            handleRatingChange(newValue)
                          }
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography gutterBottom>Bình luận:</Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          value={comments}
                          onChange={handleCommentsChange}
                          placeholder="Nhập bình luận của bạn..."
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </>
            ))
          )}
        </Paper>
      </Box>
    </Paper>
  );
};

export default DanhGiaSanPhamUser;
