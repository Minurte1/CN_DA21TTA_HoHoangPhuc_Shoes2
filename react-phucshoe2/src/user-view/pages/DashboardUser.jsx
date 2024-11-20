import React, { useEffect, useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { setTotalCart } from "../../redux/authSlice";
import AddressSelector from "../components/addressUser";
import AvatarChanger from "../components/avatarUser";
import moment from "moment";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const api = process.env.REACT_APP_URL_SERVER;

const UserProfile = () => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dataUser?.NGAY_SINH || null);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWards, setSelectedWards] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchDataUser();
  }, []);
  const fetchDataUser = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${api}/user/${userInfo.ID_NGUOI_DUNG}`);
      if (response.data.EC === 1) {
        setDataUser(response.data.DT[0]);
        setCurrentAvatar(response.data.DT[0].AVATAR);
        setSelectedProvince(response.data.DT[0].DIA_CHI_Provinces);
        setSelectedDistrict(response.data.DT[0].DIA_CHI_Districts);
        setSelectedWards(response.data.DT[0].DIA_CHI_Wards);
        // Kiểm tra và cập nhật selectedDate
        if (response.data.DT[0].NGAY_SINH) {
          const formattedDate = dayjs(response.data.DT[0].NGAY_SINH);
          if (formattedDate.isValid()) {
            setSelectedDate(formattedDate); // Cập nhật giá trị ngày hợp lệ
          } else {
            setSelectedDate(null); // Nếu không hợp lệ, đặt lại là null
          }
        }
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM);
    }
  };
  // Hàm callback để cập nhật avatar mới từ AvatarChanger
  const handleAvatarChange = (newAvatar) => {
    setCurrentAvatar(URL.createObjectURL(newAvatar));
  };

  const handleProfileUpdate = async () => {
    const updatedData = {
      HO_TEN: dataUser.HO_TEN,
      SO_DIEN_THOAI: dataUser.SO_DIEN_THOAI,
      NGAY_SINH: selectedDate,

      DIA_CHI_Provinces: selectedProvince.name_with_type,
      DIA_CHI_Districts: selectedDistrict.name_with_type,
      DIA_CHI_Wards: selectedWards.name_with_type,
    };

    try {
      const response = await axios.put(
        `${api}/user/${userInfo.ID_NGUOI_DUNG}`,
        updatedData
      );

      if (response.data.EC === 1) {
        enqueueSnackbar("Thông tin đã được cập nhật thành công", {
          variant: "success",
        });
        setDataUser(response.data.DT[0]);
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar("Lỗi hệ thống, vui lòng thử lại", { variant: "error" });
    }
  };
  const formattedDate = moment(dataUser?.NGAY_TAO_USER).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  return (
    <Box
      display="flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#101014",
        color: "#fff",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          padding: "40px",
          backgroundColor: "#0d1117", // Nền cho container
          color: "#fff", // Màu chữ
        }}
      >
        <AvatarChanger
          userId={userInfo?.ID_NGUOI_DUNG}
          currentAvatar={`${api}/images/${currentAvatar}`}
          onAvatarChange={handleAvatarChange}
        />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={dataUser?.EMAIL || ""} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
            // onChange={(e) =>
            //   setDataUser({ ...dataUser, EMAIL: e.target.value })
            // }
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
            }}
          />{" "}
          <TextField
            label="Họ và tên"
            variant="outlined"
            fullWidth
            value={dataUser?.HO_TEN || ""} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
            onChange={(e) =>
              setDataUser({ ...dataUser, HO_TEN: e.target.value })
            }
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
              ml: 2,
            }}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <TextField
            label="Số điện thoại"
            variant="outlined"
            value={dataUser?.SO_DIEN_THOAI || ""} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
            onChange={(e) =>
              setDataUser({ ...dataUser, SO_DIEN_THOAI: e.target.value })
            }
            fullWidth
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
            }}
          />{" "}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày sinh"
              value={selectedDate}
              sx={{
                backgroundColor: "#151b23", // Màu nền của input
                "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
                "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#3d444d" }, // Màu viền
                },
                "& .MuiInputBase-root": {
                  borderRadius: "4px", // Làm tròn góc nếu muốn
                },
                ml: 2,
                "& .MuiSvgIcon-root": {
                  color: "#f0ffff", // Màu của icon
                },
                width: "820px",
              }}
              onChange={(newDate) => {
                setSelectedDate(newDate); // Cập nhật giá trị mới
                setDataUser({ ...dataUser, NGAY_SINH: newDate }); // Cập nhật dataUser với giá trị ngày sinh
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: { color: "#fff" }, // Màu chữ trong TextField
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" }, // Màu chữ nhãn
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <AddressSelector
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedWards={selectedWards}
          //
          setSelectedProvince={setSelectedProvince}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedWards={setSelectedWards}
        />

        {/* ----------------Các thông tin khác --------------------------- */}

        <Typography
          variant="h6"
          style={{ marginBottom: "20px", color: "#fff", marginTop: "8px" }}
        >
          Các thông tin khác
        </Typography>
        <Box display="flex" gap={2} mb={4}>
          <TextField
            label="Vai trò"
            variant="outlined"
            value={
              dataUser?.VAI_TRO === "1"
                ? "Admin"
                : dataUser?.VAI_TRO === "0"
                ? "Người dùng bình thường"
                : dataUser?.VAI_TRO === "1.5"
                ? "Người dùng cấp cao"
                : "Chưa xác định"
            }
            defaultValue="9"
            fullWidth
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
            }}
          />
          <TextField
            label="Trạng thái tài khoản"
            variant="outlined"
            value={
              dataUser?.TRANG_THAI_USER === "1"
                ? "Đang hoạt động"
                : dataUser?.TRANG_THAI_USER === "0"
                ? "Ngưng hoạt động"
                : dataUser?.TRANG_THAI_USER === "1.5"
                ? "Bị Hạn chế"
                : "Chưa xác định"
            }
            defaultValue="H***g"
            fullWidth
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
            }}
          />
        </Box>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Ngày cập nhật tài khoản"
            variant="outlined"
            value={dataUser?.NGAY_CAP_NHAT_USER || ""} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
            fullWidth
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
            }}
          />

          <TextField
            label="Ngày tạo tài khoản"
            variant="outlined"
            fullWidth
            value={formattedDate || ""} // Hiển thị ngày đã được định dạng // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
            InputProps={{
              style: { color: "#fff" }, // Màu chữ trong TextField
            }}
            InputLabelProps={{
              style: { color: "#fff" }, // Màu chữ nhãn
            }}
            sx={{
              backgroundColor: "#151b23", // Màu nền của input
              "& .MuiInputLabel-root": { color: "#f0ffff" }, // Màu chữ của label
              "& .MuiInputBase-input": { color: "#f0ffff" }, // Màu chữ của input
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3d444d" }, // Màu viền
              },
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Làm tròn góc nếu muốn
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", backgroundColor: "#26bbff" }}
          onClick={handleProfileUpdate} // Gọi hàm cập nhật thông tin
        >
          Save Changes
        </Button>
      </Container>
    </Box>
  );
};

export default UserProfile;
