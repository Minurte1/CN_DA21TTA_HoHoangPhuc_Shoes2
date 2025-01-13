import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PaymentIcon from "@mui/icons-material/Payment";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import { Link, useLocation } from "react-router-dom";
import translations from "../../redux/data/translations";
import { useSelector } from "react-redux";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { getThemeConfig } from "../../services/themeService";
const NavBarUser = () => {
  const location = useLocation();
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [isOpenNeedHelp, setIsOpenNeedHelp] = useState(false);
  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: currentTheme.backgroundColor,
        padding: "20px",
        borderRight: "1px solid #ddd",
        position: "fixed", // Cố định thanh điều hướng
        top: 0,
        left: 0,
        height: "100vh", // Chiều cao 100% của viewport
        overflowY: "auto", // Cho phép cuộn khi nội dung vượt quá chiều cao
      }}
    >
      <Typography
        variant="h6"
        style={{ marginBottom: "20px", color: currentTheme.color }}
      >
        {t.sidebarTitle}
      </Typography>
      <List component="nav">
        <ListItem
          button
          component={Link}
          to="/profile"
          sx={{
            borderRadius: "13px",
            color:
              location.pathname === "/profile" ? "#000" : currentTheme.color,
            backgroundColor:
              location.pathname === "/profile"
                ? "#2ccaff"
                : currentTheme.backgroundColor,
            "&:hover": {
              backgroundColor:
                location.pathname === "/profile"
                  ? "#2ccaff" // Giữ màu nền khi hover
                  : currentTheme.backgroundColor,
            },
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon
              sx={{
                color:
                  location.pathname === "/profile"
                    ? "#000"
                    : currentTheme.color,
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={t.UserInfo ? t.UserInfo : "Thông tin người dùng"}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/profile/don-hang"
          sx={{
            borderRadius: "13px",
            color:
              location.pathname === "/profile/don-hang"
                ? "#000"
                : currentTheme.color,
            backgroundColor:
              location.pathname === "/profile/don-hang"
                ? "#2ccaff"
                : "transparent", // Kiểm tra nếu đang ở trang này
            "&:hover": {
              backgroundColor:
                location.pathname === "/profile/don-hang"
                  ? "#2ccaff" // Giữ màu nền khi hover
                  : currentTheme.backgroundColor,
            },
          }}
        >
          <ListItemIcon>
            <ShoppingBagIcon
              sx={{
                color:
                  location.pathname === "/profile/don-hang"
                    ? "#000"
                    : currentTheme.color,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={t.Oder ? t.Oder : "Đơn hàng"} />
        </ListItem>{" "}
        <ListItem
          button
          component={Link}
          to="/profile/lich-su-mua-hang"
          sx={{
            borderRadius: "13px",
            color:
              location.pathname === "/profile/lich-su-mua-hang"
                ? "#000"
                : currentTheme.color,
            backgroundColor:
              location.pathname === "/profile/lich-su-mua-hang"
                ? "#2ccaff"
                : "transparent", // Kiểm tra nếu đang ở trang này
            "&:hover": {
              backgroundColor:
                location.pathname === "/profile/lich-su-mua-hang"
                  ? "#2ccaff" // Giữ màu nền khi hover
                  : currentTheme.backgroundColor,
            },
          }}
        >
          <ListItemIcon>
            <InventoryIcon
              sx={{
                color:
                  location.pathname === "/profile/lich-su-mua-hang"
                    ? "#000"
                    : currentTheme.color,
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={t.HistoryBuy ? t.HistoryBuy : "Lịch sử mua hàng"}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/profile/mat-khau-cai-dat"
          sx={{
            borderRadius: "13px",
            color:
              location.pathname === "/profile/mat-khau-cai-dat"
                ? "#000"
                : currentTheme.color,
            backgroundColor:
              location.pathname === "/profile/mat-khau-cai-dat"
                ? "#2ccaff"
                : "transparent", // Kiểm tra nếu đang ở trang này
            "&:hover": {
              backgroundColor:
                location.pathname === "/profile/mat-khau-cai-dat"
                  ? "#2ccaff" // Giữ màu nền khi hover
                  : currentTheme.backgroundColor,
            },
          }}
        >
          <ListItemIcon>
            <LockIcon
              sx={{
                color:
                  location.pathname === "/profile/mat-khau-cai-dat"
                    ? "#000"
                    : currentTheme.color,
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              t.PasswordAndSetting ? t.PasswordAndSetting : "Mật khẩu & cài đặt"
            }
          />
        </ListItem>
        <Divider style={{ margin: "20px 0" }} />
        <Typography
          onClick={() => setIsOpenNeedHelp(!isOpenNeedHelp)}
          variant="body2"
          style={{ color: "#888", textAlign: "center", cursor: "pointer" }}
        >
          {t.NeedHelp ? t.NeedHelp : "BẠN CẦN GIÚP ĐỠ?"}
        </Typography>
        {isOpenNeedHelp ? (
          <>
            {" "}
            <Typography
              mt={4}
              onClick={() => setIsOpenNeedHelp(!isOpenNeedHelp)}
              variant="body2"
              style={{ color: "#888", textAlign: "center", cursor: "pointer" }}
            >
              Kệ bạn =)))
            </Typography>
          </>
        ) : (
          <></>
        )}
      </List>
    </Box>
  );
};

export default NavBarUser;
