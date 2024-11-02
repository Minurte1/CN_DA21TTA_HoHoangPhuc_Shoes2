import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode trực tiếp thay vì từ jwt-decode

import logo from "../../public/logo/iconlogo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [tokenGoogle, setTokenGoogle] = useState(null);
  const navigate = useNavigate();
  // const { loginIs } = useAuth();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse);
      setTokenGoogle(tokenResponse.access_token);

      // Lấy thông tin người dùng từ Google API
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        setUser(userInfo.data);
        console.log("User Info:", userInfo.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });
  console.log(
    "process.env.REACT_APP_URL_SERVER",
    process.env.REACT_APP_URL_SERVER
  );
  useEffect(() => {
    if (user) {
      console.log("check user =>", user.email);
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_URL_SERVER}/login/google`,
            { email: user.email, HO_TEN: user.name }
          );
          console.log("check token =>", response.data);

          if (response.data.EC === 200) {
            // Xóa token cũ và lưu token mới nếu đăng nhập thành công
            Cookies.remove("accessToken");
            const accessToken = response.data.DT.accessToken;
            Cookies.set("accessToken", accessToken, { expires: 7 });
            sessionStorage.setItem("userPicture", user.picture);
            toast.success(response.data.EM);
            // loginIs();
            navigate("/");
          } else {
            toast.error(response.data.EM);
          }
        } catch (error) {
          console.error("Đã xảy ra lỗi:", error);

          toast.error(error.response.data.EM);
        }
      };

      fetchData();
    }
  }, [user, navigate]);

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
        <img
          src={logo}
          alt="Epic Games Logo"
          style={{
            marginBottom: 20,
            maxWidth: "80px",
            height: "auto",
            filter: "drop-shadow(1px 4px 3.5px rgb(38, 187, 255,0.9))",
          }}
        />

        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Sign In
        </Typography>

        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{ style: { color: "#ccc" } }}
          inputProps={{ style: { color: "#fff" } }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
          InputLabelProps={{ style: { color: "#ccc" } }}
          inputProps={{ style: { color: "#fff" } }}
        />

        <Typography
          variant="body2"
          sx={{ color: "#ccc", cursor: "pointer", marginBottom: 2 }}
        >
          Forgot password?
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#26bbff",
            color: "#101014",
            borderRadius: "14px",
            width: "100%",
            padding: "10px",
            fontWeight: "600",
          }}
        >
          SIGN IN
        </Button>

        <Typography variant="body2" sx={{ margin: "20px 0", color: "#ccc" }}>
          or sign in with
        </Typography>

        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {["Google"].map((platform) => (
            <Grid item key={platform} xs={4} sm={3} md={4}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "14px",
                  paddingLeft: 4,
                  paddingRight: 4,
                  paddingTop: 2,
                  paddingBottom: 2,

                  width: "100%",
                  fontSize: { xs: "0.75rem", md: "0.875rem" }, // Responsive font size
                }}
                onClick={platform === "Google" ? () => login() : undefined}
              >
                <i
                  className="ml-4 fa-brands fa-google"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                {platform}{" "}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ marginTop: 3, color: "#ccc" }}>
            Create account
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
