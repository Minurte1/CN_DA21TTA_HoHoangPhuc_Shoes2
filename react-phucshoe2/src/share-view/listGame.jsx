import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import "./css/listGame.css";
// Component ListGame nhận vào title và items
const ListGame = ({ title, items }) => (
  <Box>
    <Typography
      variant="h6"
      sx={{ marginBottom: 1, zIndex: 200, color: "#fff" }}
    >
      {title} &gt;
    </Typography>
    <Box
      sx={{
        flex: "1 1 30%",
        // padding: 2,
        display: "flex",
        flexDirection: "column",
        borderLeft: "0.3px solid rgba(255, 255, 255, 0.3)",
        paddingLeft: 2,
        paddingRight: 2,
      }}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: 2,
            backgroundColor: "#101014",
            color: "#fff",
            transition: "background-color 0.3s ease", // Thêm hiệu ứng chuyển tiếp cho nền
            "&:hover": {
              backgroundColor: "#181818", // Tăng độ sáng nền khi hover
            },
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{
                width: "50px",
                height: "75px",
                borderRadius: "10%",
                transition: "filter 0.3s ease", // Thêm hiệu ứng chuyển tiếp
              }}
              className="thumbnail" // Thêm lớp CSS cho hình ảnh
            />
            <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
              <Typography variant="body2" noWrap>
                {item.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "#bbb" }}>
                {item.price || item.date}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export default ListGame;
