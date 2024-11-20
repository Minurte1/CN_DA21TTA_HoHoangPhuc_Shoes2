import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isOpenOTP, setIsOpenOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [countdown, setCountdown] = useState(0); // State to track countdown time
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
  const [email, setEmail] = useState("");
  const apiUrl = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  // Gửi yêu cầu thay đổi mật khẩu
  const handleUpdatePassword = async () => {
    // Kiểm tra mật khẩu mới và mật khẩu xác nhận có giống nhau không
    if (newPassword !== confirmNewPassword) {
      enqueueSnackbar("Mật khẩu không trùng khớp với nhau!! ", {
        variant: "error",
      });
      return;
    }

    // // Kiểm tra mật khẩu có độ dài tối thiểu
    // if (newPassword.length < 8) {
    //   enqueueSnackbar("Mật khẩu mới phải có ít nhất 8 ký tự!", {
    //     variant: "error",
    //   });
    //   return;
    // }

    // // Kiểm tra mật khẩu có chứa ký tự đặc biệt hoặc chữ hoa để bảo mật
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    // if (!passwordRegex.test(newPassword)) {
    //   enqueueSnackbar(
    //     "Mật khẩu mới phải có chữ hoa, chữ số và ký tự đặc biệt!",
    //     { variant: "error" }
    //   );
    //   return;
    // }

    try {
      // Gửi yêu cầu thay đổi mật khẩu
      const response = await axios.post(`${apiUrl}/update-password`, {
        email: email,
        newPassword: newPassword,
      });

      // Kiểm tra kết quả trả về từ server
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        setCountdown(0);
        setIsOpenChangePassword(false);
        setOtp("");
        navigate("/login");
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi hệ thống, vui lòng thử lại", { variant: "error" });
    }
  };

  // Gửi OTP
  const handleSendOtp = async () => {
    if (countdown > 0) return; // Prevent sending OTP if countdown is active

    try {
      const response = await axios.post(`${apiUrl}/send-otp`, {
        email: email,
      });
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        setCountdown(60); // Set countdown to 60 seconds
        setIsOtpSent(true); // Mark OTP as sent
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi gửi OTP, vui lòng thử lại", { variant: "error" });
    }
  };

  // Kiểm tra OTP
  const handleCheckOtp = async () => {
    try {
      const response = await axios.post(`${apiUrl}/check-otp`, {
        email: email,
        otp: otp,
      });
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        setIsOtpSent(false);
        setIsOpenChangePassword(true);
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi kiểm tra OTP, vui lòng thử lại", {
        variant: "error",
      });
    }
  };

  // Chạy countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full height
        backgroundColor: "#202020",
        padding: 2, // Thêm padding cho màn hình nhỏ
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
          color: "#fff",
          width: { xs: "100%", sm: "80%", md: "450px" }, // Responsive width
          maxWidth: "500px",
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        {" "}
        <Button variant="text" sx={{ color: "#ffffff", width: "100%" }}>
          Quên mật khẩu
        </Button>
        <Box>
          {isOpenChangePassword ? (
            <>
              <TextField
                label="Mật khẩu mới"
                variant="outlined"
                sx={{
                  color: "#c9d1d9",
                  width: "100%",
                  "& .MuiInputBase-input": { color: "#c9d1d9" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#c9d1d9",
                  },
                }}
                type="password"
                fullWidth
                value={newPassword}
                InputLabelProps={{ style: { color: "#ccc" } }}
                inputProps={{ style: { color: "#fff" } }}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: 20 }}
              />
              <TextField
                label="Xác nhận mật khẩu mới"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                inputProps={{ style: { color: "#fff" } }}
                sx={{
                  color: "#c9d1d9",
                  width: "100%",
                  "& .MuiInputBase-input": { color: "#c9d1d9" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#c9d1d9",
                  },
                }}
                fullWidth
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{ marginBottom: 20 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdatePassword()}
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#101014",
                }}
              >
                Cập nhật mật khẩu
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2 }}
                InputLabelProps={{ style: { color: "#ccc" } }}
                inputProps={{ style: { color: "#fff" } }}
              />
              <TextField
                label="Mã OTP"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "#ccc" } }}
                inputProps={{ style: { color: "#fff" } }}
                sx={{
                  color: "#c9d1d9",
                  width: "100%",
                  "& .MuiInputBase-input": { color: "#c9d1d9" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#c9d1d9",
                  },
                }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ marginBottom: 20 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSendOtp}
                        disabled={countdown > 0}
                      >
                        <ReplayIcon sx={{ color: "#c9d1d9" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="body1"
                sx={{ color: "#ffffff", textAlign: "right" }}
              >
                {countdown > 1 ? `${countdown}s` : ""}
              </Typography>
              <Button
                onClick={handleCheckOtp}
                variant="contained"
                sx={{ backgroundColor: "#3ccaff", color: "#121212" }}
                fullWidth
                type="submit"
              >
                Xác nhận OTP
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
