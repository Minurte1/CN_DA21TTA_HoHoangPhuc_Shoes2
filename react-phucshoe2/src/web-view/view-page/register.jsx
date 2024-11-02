import React, { useState, useRef } from "react";
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
} from "@mui/material";

import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
const RegistrationForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpenThongTinUser, setIsOpenThongTinUser] = useState(true);
  const scrollRef = useRef(null); // Tạo ref cho phần tử cuộn tới
  const [infoUser, setInfoUser] = useState({
    TENDANGNHAP: "",
    PASSWORD: "",
    EMAIL: "",
  });
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
      console.log("selectedDate", selectedDate);
      setIsOpenThongTinUser(!isOpenThongTinUser);
    } else {
      alert("Bạn phải trên 18 tuổi để tạo tài khoản.");
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1e",
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
            backgroundColor: "#101014",
            textAlign: "center",
            color: "#c1c1c1",
          }}
          ref={scrollRef} // Gán ref cho phần tử này
        >
          {" "}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg"
            alt="Epic Games"
            style={{ marginBottom: 16, width: "50px", height: "50px" }}
          />{" "}
          {isOpenThongTinUser ? (
            <>
              <Typography variant="h6" component="h1" gutterBottom>
                Create Account
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
                Please enter your date of birth. This is to help you have a safe
                and fun experience whatever your age.
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date and Time of Birth"
                  value={selectedDate}
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#c1c1c1", // Màu chữ
                    },
                    "& .MuiInputLabel-root": {
                      color: "#c1c1c1", // Màu chữ label
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#c1c1c1", // Màu viền
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
                      color: "#c1c1c1", // Màu của icon lịch
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
                CONTINUE
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link href="#" underline="hover" sx={{ color: "#0070f3" }}>
                  Sign in
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link href="#" underline="hover" sx={{ color: "#0070f3" }}>
                  Privacy Policy
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Container
                maxWidth="xs"
                style={{
                  marginTop: "50px",
                  backgroundColor: "#101014",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  style={{ color: "#c1c1c1", textAlign: "center" }}
                >
                  Create Account
                </Typography>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel style={{ color: "#c1c1c1" }}>Country</InputLabel>
                  <Select
                    defaultValue="Vietnam"
                    style={{ color: "#c1c1c1", borderColor: "#c1c1c1" }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          backgroundColor: "#101014",
                          color: "#c1c1c1",
                        },
                      },
                    }}
                  >
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                    {/* Add more countries as needed */}
                  </Select>
                </FormControl>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: { color: "#c1c1c1" },
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <Icon style={{ color: "#c1c1c1" }}>email</Icon>
                    //   </InputAdornment>
                    // ),
                  }}
                  InputLabelProps={{ style: { color: "#c1c1c1" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c1c1c1",
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
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{ style: { color: "#c1c1c1" } }}
                  InputLabelProps={{ style: { color: "#c1c1c1" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c1c1c1",
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
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{ style: { color: "#c1c1c1" } }}
                  InputLabelProps={{ style: { color: "#c1c1c1" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c1c1c1",
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
                  label="Display Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { color: "#c1c1c1" } }}
                  InputLabelProps={{ style: { color: "#c1c1c1" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c1c1c1",
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
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { color: "#c1c1c1" } }}
                  InputLabelProps={{ style: { color: "#c1c1c1" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#c1c1c1",
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
                <Box display="flex" flexDirection="column" alignItems="start">
                  <FormControlLabel
                    control={<Checkbox style={{ color: "#c1c1c1" }} />}
                    label={
                      <Typography style={{ color: "#c1c1c1" }}>
                        Send me news, surveys and special offers from Epic Games
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox style={{ color: "#c1c1c1" }} />}
                    label={
                      <Typography style={{ color: "#c1c1c1" }}>
                        I have read and agree to the terms of service
                      </Typography>
                    }
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ backgroundColor: "#26bbff", color: "#101014" }}
                >
                  Continue
                </Button>
                <Typography
                  align="center"
                  style={{ color: "#c1c1c1", marginTop: "20px" }}
                >
                  Already have an account?{" "}
                  <a href="#" style={{ color: "#26bbff" }}>
                    Sign In
                  </a>
                </Typography>
                <Typography align="center" style={{ color: "#26bbff" }}>
                  Privacy Policy
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
                  Back
                </Button>
              </Container>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
