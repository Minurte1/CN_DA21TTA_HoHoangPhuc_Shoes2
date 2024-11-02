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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isFixed, setIsFixed] = useState(false); // State để điều khiển vị trí

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = (
    <>
      <Typography variant="body1" component="div" sx={{ mx: 2 }}>
        Discover
      </Typography>
      <Typography variant="body1" component="div" sx={{ mx: 2 }}>
        Browse
      </Typography>
      <Typography variant="body1" component="div" sx={{ mx: 2 }}>
        News
      </Typography>
      <Typography variant="body1" component="div" sx={{ mx: 2 }}>
        Wishlist
      </Typography>
      <Typography variant="body1" component="div" sx={{ mx: 2 }}>
        Cart
      </Typography>
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
            placeholder="Search store"
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
              <MenuItem onClick={handleMenuClose}>Discover</MenuItem>
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
