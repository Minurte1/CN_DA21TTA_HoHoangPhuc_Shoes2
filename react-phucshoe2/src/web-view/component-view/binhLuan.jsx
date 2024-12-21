import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Box,
  Avatar,
  Rating,
  MenuItem,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getThemeConfig } from "../../services/themeService";

const CommentsSection = ({ reviews }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showReviews, setShowReviews] = useState(reviews.slice(0, 10));
  const [starFilter, setStarFilter] = useState("Tất cả"); // Lọc theo số sao
  const [timeFilter, setTimeFilter] = useState("latest"); // Lọc theo thời gian

  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const api = process.env.REACT_APP_URL_SERVER;

  // Hàm lọc theo số sao
  const handleStarFilterChange = (event) => {
    const star = event.target.value;
    setStarFilter(star);

    let filteredReviews = [...reviews];
    if (star !== "Tất cả") {
      // Lọc theo số sao
      filteredReviews = filteredReviews.filter(
        (review) => parseInt(review.DANH_GIA) === parseInt(star)
      );
    }
    // Lọc thời gian
    filterByTime(filteredReviews, timeFilter);
  };

  // Hàm lọc theo thời gian
  const handleTimeFilterChange = (event) => {
    const option = event.target.value;
    setTimeFilter(option);

    filterByTime(showReviews, option);
  };

  // Lọc thời gian
  const filterByTime = (data, option) => {
    let filteredReviews = [...data];
    if (option === "latest") {
      filteredReviews.sort(
        (a, b) =>
          new Date(b.NGAY_CAP_NHAT_DONHANG) - new Date(a.NGAY_CAP_NHAT_DONHANG)
      );
    } else if (option === "oldest") {
      filteredReviews.sort(
        (a, b) =>
          new Date(a.NGAY_CAP_NHAT_DONHANG) - new Date(b.NGAY_CAP_NHAT_DONHANG)
      );
    }
    setShowReviews(
      filteredReviews.slice(0, showAll ? filteredReviews.length : 10)
    );
  };

  // Xử lý khi bấm "Xem tất cả" hoặc "Thu gọn"
  const handleShowAll = () => {
    setShowAll(true);
    setShowReviews(reviews);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };
  console.log("comments", reviews);

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Xem bình luận ({reviews.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              paddingBottom: 2,
              backgroundColor: currentTheme.backgroundColor,
            }}
          >
            {/* Bộ lọc */}
            <Box sx={{ marginBottom: 2, display: "flex" }}>
              <Box>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  Lọc theo số sao:
                </Typography>
                <Select
                  value={starFilter}
                  onChange={handleStarFilterChange}
                  sx={{ color: "#fff", backgroundColor: "#202020", width: 200 }}
                >
                  <MenuItem value="Tất cả">Tất cả</MenuItem>
                  <MenuItem value="5">5 sao</MenuItem>
                  <MenuItem value="4">4 sao</MenuItem>
                  <MenuItem value="3">3 sao</MenuItem>
                  <MenuItem value="2">2 sao</MenuItem>
                  <MenuItem value="1">1 sao</MenuItem>
                </Select>{" "}
              </Box>

              <Box sx={{ marginLeft: "10px" }}>
                {/* Bộ lọc thời gian */}
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  Lọc theo thời gian bình luận:
                </Typography>
                <Select
                  value={timeFilter}
                  onChange={handleTimeFilterChange}
                  sx={{ color: "#fff", backgroundColor: "#202020" }}
                >
                  <MenuItem value="latest">Lượt bình luận mới nhất</MenuItem>
                  <MenuItem value="oldest">Lượt bình luận cũ nhất</MenuItem>
                </Select>
              </Box>
            </Box>

            {/* Danh sách bình luận */}
            {showReviews.length === 0 ? (
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  marginTop: 2,
                  color: "gray",
                }}
              >
                Hãy mua sản phẩm này để trở thành người bình luận đầu tiên.
              </Typography>
            ) : (
              showReviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 2,
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <Avatar
                      alt={review.HO_TEN}
                      src={`${api}/images/${review.AVATAR}`}
                      sx={{
                        width: 40,
                        height: 40,
                        marginRight: 2,
                      }}
                    />
                    <Typography variant="body1">{review.HO_TEN}</Typography>
                  </Box>
                  <Box sx={{ marginBottom: 1, display: "flex" }}>
                    <Rating
                      value={parseFloat(review.DANH_GIA)}
                      readOnly
                      precision={0.5}
                      sx={{ marginTop: 0.5, fontSize: 13 }}
                    />{" "}
                    <Typography sx={{ marginLeft: 1, fontSize: 11, mt: 0.5 }}>
                      Màu {review.TEN_MAU_SAC},
                    </Typography>
                    <Typography sx={{ marginLeft: 1, fontSize: 11, mt: 0.5 }}>
                      Size: {review.KICH_CO}
                    </Typography>
                  </Box>

                  <Typography variant="body2">{review.BINH_LUAN}</Typography>
                </Box>
              ))
            )}

            {/* Nút Xem tất cả / Thu gọn */}
            {reviews.length > 10 && !showAll && (
              <Button onClick={handleShowAll} sx={{ marginTop: 2 }}>
                Xem tất cả
              </Button>
            )}
            {showAll && reviews.length > 10 && (
              <Button onClick={handleShowLess} sx={{ marginTop: 2 }}>
                Thu gọn
              </Button>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CommentsSection;
