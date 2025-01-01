import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import translations from "../../redux/data/translations";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getThemeConfig } from "../../services/themeService";
const api = process.env.REACT_APP_URL_SERVER;

const RegistrationForm = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpenThongTinUser, setIsOpenThongTinUser] = useState(true);
  const language = useSelector((state) => state.language.language);
  const t = translations[language].register;
  const [isAgreed, setIsAgreed] = useState(false); // Theo dõi checkbox 'terms of service'
  const [isSubscribed, setIsSubscribed] = useState(false); // Theo dõi checkbox 'news'
  const [isOpenOTP, setIsOpenOTP] = useState(true);
  const scrollRef = useRef(null); // Tạo ref cho phần tử cuộn tới

  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isOver18 = (dateOfBirth) => {
    const age = dayjs().diff(dayjs(dateOfBirth), "year");
    return age >= 18;
  };
  const handleOpenThongTinUser = () => {
    if (!isOpenThongTinUser) {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth", // Cuộn mượt mà
          block: "center", // Cuộn tới giữa màn hình
        });
      }
    }
    if (selectedDate && isOver18(selectedDate)) {
      setIsOpenThongTinUser(!isOpenThongTinUser);
    } else {
      enqueueSnackbar("Bạn phải trên 18 tuổi để tạo tài khoản.");
    }
  };

  //Register
  const handleRegister = async () => {
    if (formData.password !== confirmPassword) {
      enqueueSnackbar("Mật khẩu không trùng khớp!", { variant: "error" });
      return;
    }

    try {
      const response = await axios.post(`${api}/register`, { formData });
      const { EC, EM } = response.data;

      enqueueSnackbar(EM, { variant: EC === 1 ? "success" : "error" });

      if (EC === 1) {
        setCountdown(0);
        navigate("/login");
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.EM || "Đã xảy ra lỗi", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setCountdown(0);
    }
  };

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0); // State to track countdown time
  // Handle OTP send
  const handleSendOtp = async () => {
    if (countdown > 0) return; // Prevent sending OTP if countdown is active

    try {
      const response = await axios.post(`${api}/send-otp`, {
        email: formData.email,
      });
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM);
        setCountdown(60); // Set countdown to 60 seconds
        setIsOtpSent(true); // Mark OTP as sent
      } else {
        enqueueSnackbar(response.data.EM);
      }
    } catch (error) {}
  };
  //handle Check OTP
  const handleCheckOtp = async () => {
    try {
      const response = await axios.post(`${api}/check-otp`, {
        email: formData.email,
        otp: otp,
      });
      if (response.data.EC === 1) {
        // enqueueSnackbar(response.data.EM);
        handleRegister();
      } else {
        enqueueSnackbar(response.data.EM);
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.EM || "Đã xảy ra lỗi", {
        variant: "error",
      });
    }
  };
  // Start countdown timer
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
        backgroundColor: currentTheme.backgroundColorLow,
        height: "160vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: currentTheme.backgroundColor,
            textAlign: "center",
            color: currentTheme.color,
          }}
          ref={scrollRef} // Gán ref cho phần tử này
        >
          {" "}
          {isOpenThongTinUser ? (
            <>
              <Typography variant="h6" component="h1" gutterBottom>
                {t.createAccount ? t.createAccount : " Create Account"}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                {t.dateOfBirthPrompt
                  ? t.dateOfBirthPrompt
                  : `Please enter your date of birth. This is to help you have a safe
                and fun experience whatever your age `}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label={
                    t.dateAndTimeOfBirth
                      ? t.dateAndTimeOfBirth
                      : "Ngày và Giờ Sinh"
                  }
                  value={selectedDate}
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: currentTheme.color, // Màu chữ
                    },
                    "& .MuiInputLabel-root": {
                      color: currentTheme.color, // Màu chữ label
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: currentTheme.color, // Màu viền
                      },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#c1c1c1", // Màu viền khi hover
                      },
                    "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#c1c1c1", // Màu viền khi focused
                      },
                    "& .MuiSvgIcon-root": {
                      color: currentTheme.color, // Màu của icon lịch
                    },
                  }}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  backgroundColor: "#26bbff",
                  color: "#101014",
                  width: "50%",
                }}
                onClick={() => handleOpenThongTinUser()}
              >
                {t.continue ? t.continue : "Tiếp tục"}
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {t.alreadyHaveAccount
                  ? t.alreadyHaveAccount
                  : "Bạn đã có tài khoản chưa?"}{" "}
                &nbsp;
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: currentTheme.color }}
                >
                  {t.signIn ? t.signIn : "Đăng nhập"}
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: currentTheme.color }}
                >
                  {t.privacyPolicy
                    ? t.privacyPolicy
                    : "Chính Sách Quyền Riêng Tư"}
                </Link>
              </Typography>
            </>
          ) : (
            <>
              {isOpenOTP ? (
                <>
                  {" "}
                  <Container
                    maxWidth="xs"
                    style={{
                      marginTop: "50px",
                      backgroundColor: currentTheme.backgroundColor,
                      padding: "20px",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{ color: currentTheme.color, textAlign: "center" }}
                    >
                      Tạo tài khoản
                    </Typography>
                    <TextField
                      label="Địa chỉ Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      InputProps={{
                        style: { color: currentTheme.color },
                      }}
                      InputLabelProps={{ style: { color: currentTheme.color } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: currentTheme.color,
                          },
                          "&:hover fieldset": {
                            borderColor: "#26bbff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#26bbff",
                          },
                        },
                      }}
                    />
                    <TextField
                      label="Tên đầy đủ"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      InputProps={{ style: { color: currentTheme.color } }}
                      InputLabelProps={{ style: { color: currentTheme.color } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: currentTheme.color,
                          },
                          "&:hover fieldset": {
                            borderColor: "#26bbff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#26bbff",
                          },
                        },
                      }}
                    />
                    <TextField
                      label="Số điện thoại"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      InputProps={{ style: { color: currentTheme.color } }}
                      InputLabelProps={{ style: { color: currentTheme.color } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: currentTheme.color,
                          },
                          "&:hover fieldset": {
                            borderColor: "#26bbff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#26bbff",
                          },
                        },
                      }}
                    />{" "}
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      InputProps={{ style: { color: currentTheme.color } }}
                      InputLabelProps={{ style: { color: currentTheme.color } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: currentTheme.color,
                          },
                          "&:hover fieldset": {
                            borderColor: "#26bbff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#26bbff",
                          },
                        },
                      }}
                    />{" "}
                    <TextField
                      label="Xác nhận mật khẩu"
                      type="password"
                      variant="outlined"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      fullWidth
                      margin="normal"
                      InputProps={{ style: { color: currentTheme.color } }}
                      InputLabelProps={{ style: { color: currentTheme.color } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: currentTheme.color,
                          },
                          "&:hover fieldset": {
                            borderColor: "#26bbff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#26bbff",
                          },
                        },
                      }}
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSubscribed}
                            onChange={(e) => setIsSubscribed(e.target.checked)}
                            style={{ color: currentTheme.color }}
                          />
                        }
                        label={
                          <Typography style={{ color: currentTheme.color }}>
                            Gửi cho tôi tin tức, khảo sát và ưu đãi đặc biệt từ
                            PhucShoe
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            style={{ color: currentTheme.color }}
                          />
                        }
                        label={
                          <Typography style={{ color: currentTheme.color }}>
                            Tôi đã đọc và đồng ý với các điều khoản dịch vụ
                          </Typography>
                        }
                      />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (!isAgreed) {
                          enqueueSnackbar(
                            "Bạn phải đồng ý với điều khoản sử dụng!"
                          );
                          return;
                        }
                        if (!isSubscribed) {
                          enqueueSnackbar(
                            "Bạn phải đồng ý với điều khoản sử dụng!"
                          );
                          return;
                        }

                        setIsOpenOTP(false);
                      }}
                      disabled={!isAgreed || !isSubscribed} // Disable nút khi chưa đồng ý hoặc chưa đăng ký
                      fullWidth
                      style={{
                        backgroundColor:
                          !isAgreed || !isSubscribed ? "#d3d3d3" : "#26bbff", // Màu khi disabled hoặc enabled
                        color:
                          !isAgreed || !isSubscribed ? "#9e9e9e" : "#101014", // Màu chữ tương ứng
                        cursor:
                          !isAgreed || !isSubscribed
                            ? "not-allowed"
                            : "pointer", // Con trỏ chỉ khi enabled
                      }}
                    >
                      Tiếp tục
                    </Button>
                    <Typography
                      align="center"
                      style={{ color: currentTheme.color, marginTop: "20px" }}
                    >
                      Bạn đã có tài khoản?
                      <a href="#" style={{ color: "#26bbff" }}>
                        Đăng nhập
                      </a>
                    </Typography>
                    <Typography align="center" style={{ color: "#26bbff" }}>
                      Chính sách bảo mật
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 3,
                        backgroundColor: "#26bbff",
                        color: "#101014",
                        width: "50%",
                      }}
                      onClick={handleOpenThongTinUser}
                    >
                      Trở về
                    </Button>
                  </Container>
                </>
              ) : (
                <>
                  <Box display="flex" alignItems="center" mb={2}>
                    <KeyboardBackspaceIcon
                      onClick={() => setIsOpenOTP(true)}
                      sx={{
                        marginRight: 1,
                        color: currentTheme.color, // Màu mặc định
                        cursor: "pointer", // Hiệu ứng con trỏ khi hover
                        "&:hover": {
                          color: currentTheme.backgroundColorLow, // Màu sáng hơn khi hover
                        },
                      }}
                    />

                    <Typography variant="h7" sx={{ color: currentTheme.color }}>
                      Kiểm tra tài khoản email của bạn
                    </Typography>
                  </Box>
                  <TextField
                    label="OTP"
                    variant="outlined"
                    fullWidth
                    sx={{
                      color: currentTheme.color, // Text color for input value
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: currentTheme.color,
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: currentTheme.color, // Placeholder color
                      },
                      "& .MuiOutlinedInput-root fieldset": {
                        borderColor: currentTheme.color, // Border color when not focused
                      },
                      "& .Mui-focused .MuiInputLabel-root": {
                        color: currentTheme.color, // Focused label color
                      },
                      "& .MuiInputLabel-root": {
                        color: currentTheme.color, // Default label color
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
                            <ReplayIcon sx={{ color: currentTheme.color }} />
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
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Xác nhận
                  </Button>
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
