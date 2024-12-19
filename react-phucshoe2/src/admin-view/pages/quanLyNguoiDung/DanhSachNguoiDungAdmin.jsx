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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { getThemeConfig } from "../../../services/themeService";
import AddressSelector from "../../../user-view/components/addressUser";

const DanhSachNguoiDungAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // User được chọn để chỉnh sửa
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái mở/đóng của form
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const api = process.env.REACT_APP_URL_SERVER;

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWards, setSelectedWards] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);
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

  // Hàm mở dialog và hiển thị thông tin người dùng
  const handleEditClick = (user) => {
    setSelectedProvince(user.DIA_CHI_Provinces);
    setSelectedDistrict(user.DIA_CHI_Districts);
    setSelectedWards(user.DIA_CHI_Wards);
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Hàm cập nhật thông tin người dùng
  const handleSave = async () => {
    console.log("selectedUser trước khi cập nhật:", selectedUser);

    // Cập nhật địa chỉ vào selectedUser
    const updatedUser = {
      ...selectedUser,
      DIA_CHI_Provinces: selectedProvince?.full_name || "",
      DIA_CHI_Districts: selectedDistrict?.full_name || "",
      DIA_CHI_Wards: selectedWards?.full_name || "",
      DIA_CHI:
        selectedUser?.DIA_CHI_STREETNAME &&
        selectedProvince?.full_name &&
        selectedDistrict?.full_name &&
        selectedWards?.full_name
          ? `${selectedUser.DIA_CHI_STREETNAME}, ${selectedWards.full_name}, ${selectedDistrict.full_name}, ${selectedProvince.full_name}`
          : "",
    };

    console.log("selectedUser sau khi cập nhật:", updatedUser);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_SERVER}/user/${updatedUser.ID_NGUOI_DUNG}`,
        updatedUser
      );
      if (response.data.EC === 1) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.ID_NGUOI_DUNG === updatedUser.ID_NGUOI_DUNG
              ? updatedUser
              : user
          )
        );
        fetchUsers();
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
        Quản lý người dùng
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
              <TableCell sx={{ color: currentTheme.color }}>
                Trạng thái
              </TableCell>
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
                <TableCell
                  sx={{
                    color: user.TRANG_THAI_USER === "1" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {user.TRANG_THAI_USER === "1"
                    ? "Đang hoạt động"
                    : "Ngưng hoạt động"}
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="vai-tro-label">Vai Trò</InputLabel>
            <Select
              labelId="vai-tro-label"
              id="vai-tro-select"
              label="Vai trò"
              name="VAI_TRO"
              value={selectedUser?.VAI_TRO || ""}
              onChange={handleInputChange}
            >
              <MenuItem value="0">Người dùng thường</MenuItem>
              <MenuItem value="1">Quản trị</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="vai-tro-label">Trạng thái tài khoản</InputLabel>
            <Select
              labelId="vai-tro-label"
              id="vai-tro-select"
              label="Trạng thái tài khoản"
              name="TRANG_THAI_USER"
              value={selectedUser?.TRANG_THAI_USER || ""}
              onChange={handleInputChange}
            >
              <MenuItem value="0">Ngưng hoạt động</MenuItem>
              <MenuItem value="1">Đang hoạt động</MenuItem>
            </Select>
          </FormControl>
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
            disabled
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
          />{" "}
          <FormControl fullWidth margin="normal">
            <AddressSelector
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              selectedWards={selectedWards}
              //
              setSelectedProvince={setSelectedProvince}
              setSelectedDistrict={setSelectedDistrict}
              setSelectedWards={setSelectedWards}
            />
          </FormControl>{" "}
          <TextField
            fullWidth
            label="Tên đường"
            name="DIA_CHI_STREETNAME"
            value={selectedUser?.DIA_CHI_STREETNAME || ""}
            onChange={handleInputChange}
            margin="normal"
          />{" "}
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
