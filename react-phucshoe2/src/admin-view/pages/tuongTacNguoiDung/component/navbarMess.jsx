import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";
import { getThemeConfig } from "../../../../services/themeService";

const SidebarMess = ({ selectedUser, setSelectedUser, users, userInfo }) => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollTop, setScrollTop] = useState(66); // Ban đầu là 66px
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");

  // Lọc người dùng theo tên
  const filteredUsers = users.filter(
    (user) =>
      user.HO_TEN.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user.ID_NGUOI_DUNG !== userInfo.ID_NGUOI_DUNG // Loại bỏ người dùng hiện tại
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 0) {
        setScrollTop(0); // Nếu cuộn xuống, đặt top thành 0px
      } else {
        setScrollTop(66); // Nếu cuộn lên, đặt top thành 66px
      }
    };

    // Lắng nghe sự kiện cuộn
    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed", // Sidebar cố định
        top: `${scrollTop}px`, // Giá trị top thay đổi dựa trên vị trí cuộn
        width: 240,
        height: "100vh", // Chiều cao sidebar
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        transition: "top 0.3s ease", // Hiệu ứng mượt khi thay đổi top
      }}
    >
      {/* Trường tìm kiếm */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 2,
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
          mt: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm người dùng"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            height: "50px",
            backgroundColor: currentTheme.backgroundColor,
            color: currentTheme.color,
            borderRadius: "14px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
          flex: 1, // Tự động chiếm phần còn lại của chiều cao sidebar
          overflowY: "auto", // Cho phép cuộn theo chiều dọc
        }}
      >
        <List>
          {/* Hiển thị danh sách người dùng đã lọc */}
          {filteredUsers.map((user) => (
            <ListItemButton
              sx={{
                backgroundColor: currentTheme.backgroundColor,
                color: currentTheme.color,
                display: "flex",
                alignItems: "center",
              }}
              key={user.ID_NGUOI_DUNG}
              selected={selectedUser?.ID_NGUOI_DUNG === user.ID_NGUOI_DUNG}
              onClick={() => setSelectedUser(user)}
            >
              {/* Avatar người dùng */}
              <Avatar
                alt={user.HO_TEN}
                src={`${api}/images/${user.AVATAR}`} // Đường dẫn ảnh đại diện (nếu có)
                sx={{ marginRight: 2, bgcolor: "#3f51b5" }} // Màu nền nếu không có ảnh
              >
                {user.HO_TEN?.charAt(0)} {/* Chữ cái đầu tiên của tên */}
              </Avatar>
              {/* Tên người dùng */}
              <ListItemText primary={user.HO_TEN} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SidebarMess;
