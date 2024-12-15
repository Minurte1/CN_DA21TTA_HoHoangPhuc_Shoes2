import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import { getThemeConfig } from "../../services/themeService";
import { useNavigate } from "react-router-dom";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState([]);
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`${api}/bai-viet/use`);
        if (response.data.EC === 1) {
          setNewsData(response.data.DT); // Lưu dữ liệu từ API vào state
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData(); // Gọi hàm bất đồng bộ bên trong useEffect
  }, []);
  const handleSelectNewsShoes = (id) => {
    navigate(`/selectNewsShoe/${id}`);
  };
  // Lấy 2 bài viết đầu tiên
  const firstTwoNews = newsData.slice(0, 2);
  // Các bài viết còn lại
  const remainingNews = newsData.slice(2);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#124124",
      }}
    >
      <Box
        sx={{
          bgcolor: currentTheme.backgroundColorLow,
          color: currentTheme.color,
          width: "80%",
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
          PhucShoe tin tức
        </Typography>
        {/* Render 2 bài viết đầu tiên */}
        <Grid container spacing={2}>
          {" "}
          {firstTwoNews.map((news) => (
            <Grid item xs={12} md={6} key={news.ID_BAI_VIET}>
              <Card
                onClick={() => handleSelectNewsShoes(news.ID_BAI_VIET)}
                sx={{
                  bgcolor: currentTheme.backgroundColor,
                  color: currentTheme.color,
                  textAlign: "left",
                  width: "100%",
                  borderRadius: "13px",
                  cursor: "pointer",
                }}
              >
                {/* Hiển thị hình ảnh nếu có */}
                {news.HINH_ANH_BAIVIET && (
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "300px" }}
                    image={`http://localhost:3002/images/${news.HINH_ANH_BAIVIET}`} // Đường dẫn ảnh
                    alt={news.TIEU_DE}
                  />
                )}
                <Box>
                  <CardContent>
                    <Typography
                      sx={{
                        color: currentTheme.color,
                        fontSize: "0.875rem",
                        mt: 1,
                        fontFamily: "'Inter', sans-serif",
                      }}
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      {new Date(news.NGAY_TAO_BLOG).toLocaleDateString("vi-VN")}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: currentTheme.color,
                        mt: 1,
                        fontWeight: "600",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {news.TIEU_DE}
                    </Typography>{" "}
                    <Typography
                      variant="h6"
                      sx={{
                        color: currentTheme.color,
                        mt: 2,
                        display: "-webkit-box", // Tạo kiểu dáng box để cắt chữ
                        overflow: "hidden", // Ẩn phần vượt ra ngoài
                        WebkitBoxOrient: "vertical", // Đảm bảo sử dụng định dạng theo chiều dọc
                        WebkitLineClamp: 2, // Chỉ hiển thị tối đa 2 dòng
                        fontSize: "0.875rem", // Giảm kích thước chữ khi chữ vượt qua 2 dòng
                        opacity: 0.5, // Làm mờ chữ khi có nhiều dòng
                        textOverflow: "ellipsis", // Thêm dấu ba chấm khi nội dung bị cắt
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {news.NOI_DUNG_TIEU_DE}
                    </Typography>
                    {/* <Typography
                    variant="body2"
                    sx={{ color: "#aaa", mt: 1 }}
                    dangerouslySetInnerHTML={{
                      __html: news.NOI_DUNG_BAIVIET, // Render HTML từ API
                    }}
                  ></Typography> */}
                    <Typography
                      sx={{
                        size: "small",
                        variant: "text", // Dùng kiểu text thay vì outlined
                        color: currentTheme.secondaryColor, // Màu chữ chính
                        textTransform: "none", // Để chữ không bị viết hoa
                        fontSize: "1rem", // Tùy chỉnh kích thước chữ nếu cần
                        borderBottom: "1px solid", // Thêm đường viền dưới
                        borderColor: "primary.main", // Đặt màu đường viền là màu chính của theme
                        padding: 0, // Không có padding
                        display: "inline", // Để nút không chiếm hết chiều rộng
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Xem chi tiết
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Render các bài viết còn lại */}
        <Grid container spacing={2} mt={2}>
          {remainingNews.map((news) => (
            <Grid item xs={12} md={12} key={news.ID_BAI_VIET} mt={4}>
              <Divider
                sx={{
                  my: 1,
                  width: "100%",
                  opacity: "0.5",
                  backgroundColor: currentTheme.color,
                }}
              />

              <Card
                onClick={() => handleSelectNewsShoes(news.ID_BAI_VIET)}
                sx={{
                  backgroundColor: currentTheme.backgroundColor,
                  height: "100%",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                {news.HINH_ANH_BAIVIET && (
                  <CardMedia
                    component="img"
                    sx={{
                      width: "200px",
                      height: "110px",
                      paddingLeft: "20px",
                      marginTop: "20px",
                    }}
                    image={`http://localhost:3002/images/${news.HINH_ANH_BAIVIET}`}
                  />
                )}
                <Box>
                  <CardContent sx={{ textAlign: " left" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: currentTheme.color,
                        opacity: 0.5,
                        fontSize: "0.7rem",
                      }}
                    >
                      {new Date(news.NGAY_TAO_BLOG).toLocaleDateString("vi-VN")}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: currentTheme.color,
                        mt: 1,
                        fontWeight: "600",
                      }}
                    >
                      {news.TIEU_DE}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: currentTheme.color,
                        mt: 1,
                        width: "70%",
                        display: "-webkit-box", // Tạo kiểu dáng box để cắt chữ
                        overflow: "hidden", // Ẩn phần vượt ra ngoài
                        WebkitBoxOrient: "vertical", // Đảm bảo sử dụng định dạng theo chiều dọc
                        WebkitLineClamp: 2, // Chỉ hiển thị tối đa 2 dòng
                        fontSize: "0.7rem", // Giảm kích thước chữ khi chữ vượt qua 2 dòng
                        opacity: 0.5, // Làm mờ chữ khi có nhiều dòng
                        textOverflow: "ellipsis", // Thêm dấu ba chấm khi nội dung bị cắt
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {news.NOI_DUNG_TIEU_DE}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 4,
                        size: "small",
                        variant: "text", // Dùng kiểu text thay vì outlined
                        color: currentTheme.secondaryColor,
                        textTransform: "none", // Để chữ không bị viết hoa
                        fontSize: "1rem", // Tùy chỉnh kích thước chữ nếu cần
                        borderBottom: "1px solid", // Thêm đường viền dưới
                        borderColor: "primary.main", // Đặt màu đường viền là màu chính của theme
                        padding: 0, // Không có padding
                        display: "inline", // Để nút không chiếm hết chiều rộng
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Xem chi tiết
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewsComponent;
