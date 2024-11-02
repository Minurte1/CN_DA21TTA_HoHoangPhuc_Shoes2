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
const NavBarUser = () => (
  <Box
    sx={{
      width: "250px",
      backgroundColor: "#0d1117",
      padding: "20px",
      borderRight: "1px solid #ddd",
      position: "fixed", // Cố định thanh điều hướng
      top: 0,
      left: 0,
      height: "100vh", // Chiều cao 100% của viewport
      overflowY: "auto", // Cho phép cuộn khi nội dung vượt quá chiều cao
    }}
  >
    <Typography variant="h6" style={{ marginBottom: "20px", color: "#fff" }}>
      Account Settings
    </Typography>
    <List component="nav">
      <ListItem button component={Link} to="/user" sx={{ color: "#f0f6fc" }}>
        <ListItemIcon>
          <AccountCircleIcon sx={{ color: "#f0f6fc" }} />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/user/donhang"
        sx={{ color: "#f0f6fc" }}
      >
        <ListItemIcon>
          <EmailIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <ListItemText primary="Đơn hàng" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/payment-management"
        sx={{ color: "#f0f6fc" }}
      >
        <ListItemIcon>
          <PaymentIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <ListItemText primary="Payment Management" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/password-security"
        sx={{ color: "#f0f6fc" }}
      >
        <ListItemIcon>
          <LockIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <ListItemText primary="Password & Security" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/epic-rewards"
        sx={{ color: "#f0f6fc" }}
      >
        <ListItemIcon>
          <StarIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Epic Rewards" />
      </ListItem>
      <Divider style={{ margin: "20px 0" }} />
      <Typography
        variant="body2"
        style={{ color: "#888", textAlign: "center" }}
      >
        NEED HELP?
      </Typography>
    </List>
  </Box>
);

export default NavBarUser;
