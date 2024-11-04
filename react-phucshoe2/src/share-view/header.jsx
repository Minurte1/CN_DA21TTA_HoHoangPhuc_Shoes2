import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import logo from "../public/logo/iconlogo.png";
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "../authentication/axiosInstance";
import { jwtDecode } from "jwt-decode";
const apiUrl = process.env.REACT_APP_URL_SERVER;
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProfileUser = async () => {
      const token = Cookies.get("accessToken");

      if (token) {
        const decode = jwtDecode(token);
        try {
          const response = await axiosInstance.post(`${apiUrl}/user-info`, {
            ID_NGUOI_DUNG: decode.ID_NGUOI_DUNG,
          });
        } catch (error) {}
      }
    };

    fetchProfileUser();
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("tên_cookie");
    navigate("/login");
  };
  const menuItems = (
    <>
      <Button color="inherit">Support</Button>
      <Button color="inherit">Distribute</Button>
      <IconButton color="inherit">
        <LanguageIcon />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: "#29292d",
              borderRadius: "13px",
              paddingTop: 2,
              paddingBottom: 2,
              paddingRight: 8,
              paddingLeft: 2,
            },
          }}
        >
          <MenuItem
            sx={{
              borderRadius: "8px",
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 8,
              paddingLeft: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4a494c", // Màu nền khi hover
                color: "#fff",
              },
            }}
            component={Link}
            to="/profile"
            onClick={handleClose}
          >
            Profile
          </MenuItem>
          <MenuItem
            sx={{
              borderRadius: "8px",
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 8,
              paddingLeft: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4a494c", // Màu nền khi hover
              },
            }}
            onClick={handleClose}
          >
            My account
          </MenuItem>{" "}
          <MenuItem
            sx={{
              borderRadius: "8px",
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 8,
              paddingLeft: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4a494c", // Màu nền khi hover
              },
            }}
            onClick={handleClose}
          >
            My account
          </MenuItem>{" "}
          <MenuItem
            sx={{
              borderRadius: "8px",
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 8,
              paddingLeft: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4a494c", // Màu nền khi hover
              },
            }}
            onClick={handleClose}
          >
            My account
          </MenuItem>{" "}
          <MenuItem
            sx={{
              borderRadius: "8px",
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 8,
              paddingLeft: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4a494c", // Màu nền khi hover
              },
            }}
            onClick={handleClose}
          >
            My account
          </MenuItem>{" "}
          <MenuItem
            sx={{
              borderRadius: "8px",
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 8,
              paddingLeft: 2,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4a494c", // Màu nền khi hover
              },
            }}
            onClick={handleLogout}
          >
            Đăng xuất
          </MenuItem>
        </Menu>

        <Typography
          onClick={handleMenu}
          variant="body1"
          component="span"
          sx={{ ml: 1, cursor: "pointer" }}
        >
          Minurte1
        </Typography>
      </Box>
      <Button
        variant="contained"
        href="https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi?trackingId=aebf7d1fc5764a45acab1b551038bebf"
        style={{ backgroundColor: "#00aaff", marginLeft: 16 }}
      >
        Download
      </Button>
    </>
  );

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#101014", zIndex: 20 }}
    >
      <Toolbar>
        <img
          src={logo}
          alt="Epic Games"
          style={{
            height: 50,
            marginRight: 16,
            filter: "drop-shadow(1px 4px 3.5px rgb(38, 187, 255))",
          }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          STORE
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open mobile menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(mobileMoreAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleMobileMenuClose}>Support</MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>Distribute</MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <LanguageIcon sx={{ marginRight: 1 }} />
                Language
              </MenuItem>
              <MenuItem onClick={handleMenu}>
                <AccountCircle sx={{ marginRight: 1 }} />
                Minurte1
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#00aaff" }}
                >
                  Download
                </Button>
              </MenuItem>
            </Menu>
          </>
        ) : (
          menuItems
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
