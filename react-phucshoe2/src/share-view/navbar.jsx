import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTotalCart } from "../redux/authSlice";
import translations from "../redux/data/translations";

const api = process.env.REACT_APP_URL_SERVER;
const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isFixed, setIsFixed] = useState(false); // State để điều khiển vị trí
  const location = useLocation();
  const dispatch = useDispatch();

  //language
  const language = useSelector((state) => state.language.language);
  const t = translations[language].navbar;

  const isActive = (path) => location.pathname === path;

  const { isAuthenticated, userInfo, totalCart } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchTotalCart();
    }
  }, [userInfo, dispatch]);

  const fetchTotalCart = async () => {
    try {
      const response = await axios.get(
        `${api}/gio-hang/total-quantity/${userInfo.ID_NGUOI_DUNG}`
      );
      if (response.data.EC === 1) {
        dispatch(setTotalCart(response.data.DT));
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {/* Left-aligned items */}
        <Box sx={{ display: "flex" }}>
          <Box component={RouterLink} to="/" sx={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              component="div"
              sx={{
                mx: 2,
                cursor: "pointer",
                color: isActive("/") ? "#3ccaff" : "#fff",
              }}
            >
              {t.Discover}
            </Typography>
          </Box>

          <Box
            component={RouterLink}
            to="/browse"
            sx={{ textDecoration: "none" }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                mx: 2,
                cursor: "pointer",
                color: isActive("/browse") ? "#3ccaff" : "#fff",
              }}
            >
              {t.Products}
            </Typography>
          </Box>

          <Box
            component={RouterLink}
            to="/news"
            sx={{ textDecoration: "none" }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                mx: 2,
                cursor: "pointer",
                color: isActive("/news") ? "#3ccaff" : "#fff",
              }}
            >
              {t.News}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box
            component={RouterLink}
            to="/wishlist"
            sx={{ textDecoration: "none" }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                mx: 2,
                cursor: "pointer",
                color: isActive("/wishlist") ? "#3ccaff" : "#fff",
              }}
            >
              {t.Wishlist}
            </Typography>
          </Box>

          <Box
            component={RouterLink}
            to="/cart"
            sx={{ textDecoration: "none" }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                mx: 2,
                cursor: "pointer",
                color: isActive("/cart") ? "#3ccaff" : "#fff",
              }}
            >
              <Badge badgeContent={totalCart} color="secondary">
                {t.Cart}
              </Badge>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra vị trí cuộn
      if (window.scrollY > 50) {
        // Thay đổi giá trị 50 nếu cần thiết
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position={isFixed ? "fixed" : "relative"} // Thay đổi vị trí dựa trên trạng thái
      style={{
        backgroundColor: "#101014",
        transition: "top 0.3s",
        top: isFixed ? 0 : "auto",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#101014",
            borderRadius: 50,
            padding: "4px 12px",
            marginRight: 16,
            width: "300px",
          }}
        >
          <IconButton size="small" color="inherit">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder={t.SearchStore}
            sx={{
              ml: 1,
              color: "inherit",
              flex: 1,
            }}
            inputProps={{ "aria-label": "search store" }}
          />
        </Box>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuOpen}
              sx={{ ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
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
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>{t.Discover}</MenuItem>
              <MenuItem onClick={handleMenuClose}>Browse</MenuItem>
              <MenuItem onClick={handleMenuClose}>News</MenuItem>
              <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
              <MenuItem onClick={handleMenuClose}>Cart</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {menuItems}
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
