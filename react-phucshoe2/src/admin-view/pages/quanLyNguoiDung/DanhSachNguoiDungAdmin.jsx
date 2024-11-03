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
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

const DanhSachNguoiDungAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL_SERVER}/user`
        );
        if (response.data.EC == 1) {
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
      display="flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#101014",
        color: "#fff",
        // padding: "20px",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#101014", // Đổi màu nền bảng
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "none", // Loại bỏ bóng cho bảng
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#f0f6fc" }}>Avatar</TableCell>
              <TableCell sx={{ color: "#f0f6fc" }}>Họ Tên</TableCell>
              <TableCell sx={{ color: "#f0f6fc" }}>Email</TableCell>
              <TableCell sx={{ color: "#f0f6fc" }}>Ngày Tạo</TableCell>
              <TableCell sx={{ color: "#f0f6fc" }}>Vai Trò</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.ID_NGUOI_DUNG}>
                <TableCell>
                  <Avatar>
                    <PeopleIcon />
                  </Avatar>
                </TableCell>
                <TableCell sx={{ color: "#f0f6fc" }}>{user.HO_TEN}</TableCell>
                <TableCell sx={{ color: "#f0f6fc" }}>{user.EMAIL}</TableCell>
                <TableCell sx={{ color: "#f0f6fc" }}>
                  {new Date(user.NGAY_TAO_USER).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell sx={{ color: "#f0f6fc" }}>
                  {user.VAI_TRO === "1" ? "Quản Trị Viên" : "Người Dùng Thường"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DanhSachNguoiDungAdmin;
