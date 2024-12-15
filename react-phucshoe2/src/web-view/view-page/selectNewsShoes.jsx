import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Pagination, // Import Pagination từ MUI
} from "@mui/material";
import { getThemeConfig } from "../../services/themeService";

const SelectNewsShoes = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]); // Lưu tất cả bài viết
  const [displayedData, setDisplayedData] = useState([]); // Dữ liệu sẽ hiển thị
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
  const [itemsPerPage] = useState(1); // Số lượng bài viết hiển thị trên mỗi trang
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");

  // Hàm lấy tất cả dữ liệu blog
  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/bai-viet/use/${id}`
      );
      const { EC, DT, EM } = response.data;

      if (EC === 1 && DT) {
        setBlogData(DT); // Lưu tất cả dữ liệu blog
        setDisplayedData(DT.slice(0, itemsPerPage)); // Hiển thị bài viết của trang đầu tiên
      } else {
        setError(EM || "Lỗi không xác định");
      }
    } catch (err) {
      setError("Lỗi kết nối tới API");
    } finally {
      setLoading(false);
    }
  };

  // Effect hook để lấy dữ liệu khi component mount
  useEffect(() => {
    fetchBlogData();
  }, [id]);

  // Hàm xử lý khi người dùng thay đổi trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Tính toán dữ liệu cần hiển thị dựa trên trang hiện tại
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(blogData.slice(startIndex, endIndex));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: currentTheme.backgroundColor,
      }}
      padding={2}
    >
      <Box
        sx={{
          width: "80%",
          textAlign: "left",
          backgroundColor: currentTheme.backgroundColor,
        }}
      >
        {displayedData.map((blog, index) => (
          <Card
            key={index}
            sx={{ backgroundColor: currentTheme.backgroundColor }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ color: currentTheme.color }}
                component="h1"
                gutterBottom
              >
                {blog.TIEU_DE}
              </Typography>
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
                {blog.NOI_DUNG_TIEU_DE}
              </Typography>
              <Box mt={2} sx={{ textAlign: "left" }}>
                <Typography
                  dangerouslySetInnerHTML={{ __html: blog.NOI_DUNG_BAIVIET }}
                  variant="body1"
                  sx={{
                    "& img": {
                      maxWidth: "50%",
                      height: "auto",
                    },
                  }}
                ></Typography>
              </Box>

              {blog.HINH_ANH_BAIVIET && (
                <Box mt={4}>
                  <img
                    src={`http://localhost:3002/images/${blog.HINH_ANH_BAIVIET}`}
                    alt="Blog Hình Ảnh"
                    style={{ maxWidth: "100%", borderRadius: 8 }}
                  />
                </Box>
              )}
              <Typography
                sx={{ color: currentTheme.color }}
                variant="body2"
                color="textSecondary"
                gutterBottom
              >
                Ngày tạo:{" "}
                {new Date(blog.NGAY_TAO_BLOG).toLocaleDateString("vi-VN")}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(blogData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SelectNewsShoes;
