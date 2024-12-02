import React from "react";
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
import { Link } from "react-router-dom";
import { getThemeConfig } from "../../services/themeService";
const DashboardAdmin = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  return (
    <Box
      display="flex"
      style={{
        minHeight: "100vh",
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color, // Màu chữ
      }}
    >
      <Container
        maxWidth="md"
        style={{
          padding: "40px",
          backgroundColor: currentTheme.backgroundColor, // Nền cho container
          color: currentTheme.color, // Màu chữ
        }}
      ></Container>
    </Box>
  );
};

export default DashboardAdmin;
