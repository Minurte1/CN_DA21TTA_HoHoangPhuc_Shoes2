import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import axios from "axios";

const NewsComponent = () => {
  const [newsData, setNewsData] = useState([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/bai-viet/use");
        setNewsData(response.data.DT); // Lưu dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData(); // Gọi hàm bất đồng bộ bên trong useEffect
  }, []);

  return (
    <Box sx={{ bgcolor: "#121212", color: "#fff", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        News
      </Typography>
      <Grid container spacing={2}>
        {newsData.map((news) => (
          <Grid item xs={12} md={6} key={news.ID_BAI_VIET}>
            <Card sx={{ bgcolor: "#1e1e1e", display: "flex", height: "100%" }}>
              {/* Hiển thị hình ảnh nếu có */}
              {news.HINH_ANH_BAIVIET && (
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={`http://localhost:3002/images/${news.HINH_ANH_BAIVIET}`} // Đường dẫn ảnh
                  alt={news.TIEU_DE}
                />
              )}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {new Date(news.NGAY_TAO_BLOG).toLocaleDateString("vi-VN")}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#fff", mt: 1 }}>
                    {news.TIEU_DE}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#aaa", mt: 1 }}
                    dangerouslySetInnerHTML={{
                      __html: news.NOI_DUNG_BAIVIET, // Render HTML từ API
                    }}
                  ></Typography>
                  <Button
                    sx={{ mt: 2 }}
                    size="small"
                    variant="outlined"
                    color="primary"
                  >
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsComponent;
