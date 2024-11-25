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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const CommentsSection = ({ reviews }) => {
  const [expanded, setExpanded] = useState(false); // Điều khiển xem bình luận
  const [showAll, setShowAll] = useState(false); // Điều khiển xem tất cả bình luận
  const [showReviews, setShowReviews] = useState(reviews.slice(0, 10)); // Mặc định chỉ hiển thị 10 bình luận đầu tiên
  const api = process.env.REACT_APP_URL_SERVER;

  // Hàm xử lý khi bấm "Xem tất cả"
  const handleShowAll = () => {
    setShowAll(true);
    setShowReviews(reviews); // Hiển thị tất cả bình luận
  };

  // Hàm xử lý khi bấm "Thu gọn"
  const handleShowLess = () => {
    setShowAll(false);
    setShowReviews(reviews.slice(0, 10)); // Hiển thị lại 10 bình luận đầu tiên
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        sx={{ backgroundColor: "#101014", color: "#fff" }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Xem bình luận ({reviews.length}){" "}
            {expanded ? "" : <ArrowDropDownIcon />}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ paddingBottom: 2, backgroundColor: "#101014" }}>
            {showReviews.map((review, index) => (
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
                <Box sx={{ marginBottom: 1 }}>
                  <Rating
                    value={parseFloat(review.DANH_GIA)} // Chuyển đổi giá trị DANH_GIA thành số float
                    readOnly
                    precision={0.5} // Để cho phép đánh giá với độ chính xác 0.5 sao
                    sx={{ marginTop: 0.5, fontSize: 13 }} // Căn chỉnh cho Rating
                  />
                </Box>
                <Typography variant="body2">{review.BINH_LUAN}</Typography>
              </Box>
            ))}

            {/* Hiển thị nút Xem tất cả / Thu gọn */}
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
