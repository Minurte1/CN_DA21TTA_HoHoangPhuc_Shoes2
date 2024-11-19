import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import axiosInstance from "../../authentication/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, logout } from "../../redux/authSlice";
import { setLanguage } from "../../redux/languageSlice";
import translations from "../../redux/data/translations";
import axios from "axios";
const apiUrl = process.env.REACT_APP_URL_SERVER;

const PasswordAndSetting = () => {
  const [optionLanguage, setOptionLanguage] = useState("vi");

  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [themesWeb, setThemesWeb] = useState(userInfo?.THEMES);

  //api change backgroundColor

  useEffect(() => {
    if (themesWeb) {
      changeThemseWeb();
    }
  }, [themesWeb]);

  const changeThemseWeb = async () => {
    try {
      const response = await axios.post(`${apiUrl}/update-preferences`, {
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG,
        THEMES: themesWeb,
      });
      if (response.status === 200) {
        console.log("Language updated successfully");
      } else {
        console.error("Failed to update language");
      }
    } catch (error) {
      console.error("Error while updating language:", error);
    }
  };
  //api change language
  const handleChangeLanguage = async (lang) => {
    setOptionLanguage(lang);
    dispatch(setLanguage(lang));

    // Gửi yêu cầu API
    try {
      const response = await axios.post(`${apiUrl}/update-language`, {
        ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG,
        LANGUAGE: lang,
      });
      if (response.status === 200) {
        console.log("Language updated successfully");
      } else {
        console.error("Failed to update language");
      }
    } catch (error) {
      console.error("Error while updating language:", error);
    }
  };

  //languages
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const handleLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };
  const handleLanguageClose = () => {
    setAnchorElLanguage(null);
  };

  //themes
  const [anchorElTheme, setAnchorElTheme] = React.useState(null);
  const handleThemeMenu = (event) => {
    setAnchorElTheme(event.currentTarget);
  };
  const handleThemeClose = () => {
    setAnchorElTheme(null);
  };

  return (
    <>
      <Box
        display="flex"
        sx={{ textAlign: "left" }}
        style={{
          minHeight: "100vh",
          backgroundColor: "#101014",
          color: "#fff",
          flexDirection: "column", // Thêm để căn dọc
          padding: "16px", // Tạo khoảng cách
        }}
      >
        <Typography variant="h5" className="text-white">
          Mật khẩu & cài đặt
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "#ffffff" }} />
        <Box
          sx={{
            width: "600px", // Giới hạn độ rộng

            textAlign: "left", // Căn giữa nội dung
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Căn giữa theo trục dọc
              gap: 2, // Khoảng cách giữa các phần tử
            }}
          >
            <Typography variant="body1" sx={{ color: "#ffffff" }}>
              Thay đổi ngôn ngữ
            </Typography>
            <Button
              variant="outlined"
              onClick={handleLanguageMenu}
              sx={{
                backgroundColor: "#ffffff", // Màu nền trắng
                color: "#101014", // Màu chữ
              }}
            >
              {optionLanguage === "vi"
                ? "Tiếng Việt"
                : optionLanguage === "en"
                ? "English"
                : "Español"}{" "}
              <ArrowDropDownIcon />
            </Button>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center", // Căn giữa theo trục dọc
              gap: 2, // Khoảng cách giữa các phần tử
            }}
          >
            <Typography variant="body1" sx={{ color: "#ffffff" }}>
              Thay đổi màu nền
            </Typography>
            <Box>
              <Button
                variant="outlined"
                onClick={handleThemeMenu}
                sx={{
                  backgroundColor: `${
                    themesWeb === "dark" ? "#ffffff" : "#101014"
                  }`, // Màu nền trắng
                  color: "#101014", // Màu chữ
                  textTransform: "none", // Giữ nguyên chữ thường
                }}
              >
                {themesWeb === "dark" ? "Nền đen" : "Nền trắng"}{" "}
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="theme-menu"
                anchorEl={anchorElTheme}
                open={Boolean(anchorElTheme)}
                onClose={handleThemeClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "#29292d",
                    borderRadius: "13px",
                    paddingTop: 1,
                    paddingBottom: 1,
                  },
                }}
              >
                <MenuItem
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "#4a494c" },
                  }}
                  onClick={() => {
                    setThemesWeb("dark");
                    handleThemeClose();
                  }}
                >
                  Nền đen
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#fff",
                    "&:hover": { backgroundColor: "#4a494c" },
                  }}
                  onClick={() => {
                    setThemesWeb("light");
                    handleThemeClose();
                  }}
                >
                  Nền trắng
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Menu
            id="language-menu"
            anchorEl={anchorElLanguage}
            open={Boolean(anchorElLanguage)}
            onClose={handleLanguageClose}
            PaperProps={{
              sx: {
                backgroundColor: "#29292d",
                borderRadius: "13px",
                paddingTop: 1,
                paddingBottom: 1,
              },
            }}
          >
            <MenuItem
              sx={{ color: "#fff", "&:hover": { backgroundColor: "#4a494c" } }}
              onClick={() => {
                handleChangeLanguage("vi");
                handleLanguageClose();
              }}
            >
              Tiếng Việt
            </MenuItem>
            <MenuItem
              sx={{ color: "#fff", "&:hover": { backgroundColor: "#4a494c" } }}
              onClick={() => {
                handleChangeLanguage("en");
                handleLanguageClose();
              }}
            >
              English
            </MenuItem>
            <MenuItem
              sx={{ color: "#fff", "&:hover": { backgroundColor: "#4a494c" } }}
              onClick={() => {
                handleChangeLanguage("es");
                handleLanguageClose();
              }}
            >
              Español
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};
export default PasswordAndSetting;
