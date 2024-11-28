import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";

const SidebarMess = ({ selectedUser, setSelectedUser, users, userInfo }) => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [searchQuery, setSearchQuery] = useState("");

  // Lọc người dùng theo tên
  const filteredUsers = users.filter(
    (user) =>
      user.HO_TEN.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user.ID_NGUOI_DUNG !== userInfo.ID_NGUOI_DUNG // Loại bỏ người dùng hiện tại
  );

  return (
    <Box
      sx={{
        position: "fixed", // Sidebar cố định
        top: "60px", // Khoảng cách từ trên
        width: 240,
        height: "95vh", // Chiều cao sidebar

        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      {/* Trường tìm kiếm */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 2,
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
            backgroundColor: "#fff",
            borderRadius: "14px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1, // Tự động chiếm phần còn lại của chiều cao sidebar
          overflowY: "auto", // Cho phép cuộn theo chiều dọc
        }}
      >
        <List>
          {/* Hiển thị danh sách người dùng đã lọc */}
          {filteredUsers.map((user) => (
            <ListItemButton
              sx={{ color: "#fff", display: "flex", alignItems: "center" }}
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
