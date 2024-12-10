import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { getThemeConfig } from "../../../services/themeService";

const DanhSachNguoiDungAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // User được chọn để chỉnh sửa
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái mở/đóng của form
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const api = process.env.REACT_APP_URL_SERVER;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL_SERVER}/user`
        );
        if (response.data.EC === 1) {
          setUsers(response.data.DT);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Hàm mở dialog và hiển thị thông tin người dùng
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Hàm cập nhật thông tin người dùng
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_SERVER}/user/update`,
        selectedUser
      );
      if (response.data.EC === 1) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.ID_NGUOI_DUNG === selectedUser.ID_NGUOI_DUNG
              ? selectedUser
              : user
          )
        );
        setIsDialogOpen(false);
      } else {
        setError(response.data.EM);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm đóng dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Hàm xử lý thay đổi của form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (loading) {
    return <Typography variant="h6">Đang tải...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box
      // display="flex"
      style={{
        minHeight: "100vh",
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
      }}
    >
      <Typography
        variant="h5"
        mt={4}
        color="primary"
        sx={{ textAlign: "left" }}
        gutterBottom
      >
        Quản lý Carousel Sản Phẩm
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
          borderRadius: "8px",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.color }}>Avatar</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Họ Tên</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Email</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Ngày Tạo</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Vai Trò</TableCell>
              <TableCell sx={{ color: currentTheme.color }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.ID_NGUOI_DUNG}>
                <TableCell>
                  <Avatar
                    src={user.AVATAR ? `${api}/images/${user.AVATAR}` : ""}
                    alt={user.name || "User"}
                  >
                    {!user.AVATAR && <PeopleIcon />}
                  </Avatar>
                </TableCell>

                <TableCell sx={{ color: currentTheme.color }}>
                  {user.HO_TEN}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {user.EMAIL}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {new Date(user.NGAY_TAO_USER).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell
                  sx={{
                    color: user.VAI_TRO === "1" ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {user.VAI_TRO === "1" ? "Quản Trị Viên" : "Người Dùng Thường"}
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    Chỉnh sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dialog cập nhật người dùng */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Họ Tên"
            name="HO_TEN"
            value={selectedUser?.HO_TEN || ""}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="EMAIL"
            value={selectedUser?.EMAIL || ""}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Vai Trò"
            name="VAI_TRO"
            value={selectedUser?.VAI_TRO || ""}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số Điện Thoại"
            name="SO_DIEN_THOAI"
            value={selectedUser?.SO_DIEN_THOAI || ""}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Địa Chỉ"
            name="DIA_CHI"
            value={selectedUser?.DIA_CHI || ""}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Avatar URL"
            name="AVATAR"
            value={selectedUser?.AVATAR || ""}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DanhSachNguoiDungAdmin;
