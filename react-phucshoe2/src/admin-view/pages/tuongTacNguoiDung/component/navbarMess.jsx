import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";

const SidebarMess = ({ selectedUser, setSelectedUser, users }) => {
  // State lưu giá trị tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // Lọc người dùng theo tên
  const filteredUsers = users.filter((user) =>
    user.HO_TEN.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        position: "fixed", // Sidebar cố định
        top: "60px", // Khoảng cách từ trên
        width: 240,
        height: "95vh", // Chiều cao sidebar
        bgcolor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000, // Sidebar luôn ở trên các phần tử khác
      }}
    >
      {/* Trường tìm kiếm */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm người dùng"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
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
              key={user.ID_NGUOI_DUNG}
              selected={selectedUser?.ID_NGUOI_DUNG === user.ID_NGUOI_DUNG}
              onClick={() => setSelectedUser(user)}
            >
              <ListItemText primary={user.HO_TEN} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SidebarMess;
