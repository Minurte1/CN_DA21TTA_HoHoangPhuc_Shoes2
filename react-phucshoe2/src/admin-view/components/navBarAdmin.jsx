import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse, // Đừng quên import Collapse
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PaymentIcon from "@mui/icons-material/Payment";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People"; // Quản lý người dùng
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Quản lý đơn hàng
import InventoryIcon from "@mui/icons-material/Inventory"; // Quản lý sản phẩm
import GroupIcon from "@mui/icons-material/Group"; // Tương tác người dùng
import ExpandLess from "@mui/icons-material/ExpandLess"; // Import đúng từ đây
import ExpandMore from "@mui/icons-material/ExpandMore"; // Import đúng từ đây

import { Link, useLocation } from "react-router-dom";
const NavBarAdmin = () => {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };
  const [openCategory, setOpenCategory] = useState(false);

  const handleClick = () => {
    setOpenCategory(!openCategory);
  };
  return (
    <>
      {" "}
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#0d1117",
          padding: "30px 20px",
          borderRight: "1px solid #ddd",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "1px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#0d1117",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          Quản lý hệ thống
        </Typography>
        <List component="nav">
          <ListItem
            button
            component={Link}
            to="/admin/"
            sx={{
              borderRadius: "12px",
              color: "#f0f6fc",
              cursor: "pointer",
              userSelect: "none",
              backgroundColor:
                location.pathname === "/admin" ? "#3c3f41" : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": { backgroundColor: "#3c3f41" },
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#f0f6fc" }} />
            </ListItemIcon>
            <ListItemText primary="Thông Tin Admin" />
          </ListItem>
          {/* //----------------------- */}
          <List>
            {/* Quản lý người dùng */}
            <ListItem
              button
              onClick={() => toggleSection("nguoiDung")}
              sx={{
                borderRadius: "12px",
                color: "#f0f6fc",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <ListItemIcon>
                <PeopleIcon sx={{ color: "#ffffff" }} />
              </ListItemIcon>
              <ListItemText primary="Quản lý người dùng" />
              {openSection === "nguoiDung" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openSection === "nguoiDung"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {/* <ListItem
                  button
                  component={Link}
                  to="/user/nguoi-dung/add"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Thêm người dùng" />
                </ListItem> */}
                <ListItem
                  button
                  component={Link}
                  to="/admin/nguoi-dung/danh-sach"
                  sx={{
                    borderRadius: "12px",
                    pl: 4,
                    color: "#f0f6fc",
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      location.pathname === "/admin/nguoi-dung/danh-sach"
                        ? "#3c3f41"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: "#3c3f41" },
                  }}
                >
                  <ListItemText primary="Danh sách người dùng" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/user/nguoi-dung/roles"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Phân quyền" />
                </ListItem>
              </List>
            </Collapse>
            {/* Quản lý sản phẩm */}
            <ListItem
              button
              onClick={() => toggleSection("sanPham")}
              sx={{
                borderRadius: "12px",
                color: "#f0f6fc",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <ListItemIcon>
                <InventoryIcon sx={{ color: "#ffffff" }} />
              </ListItemIcon>
              <ListItemText primary="Quản lý sản phẩm" />
              {openSection === "sanPham" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openSection === "sanPham"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to="/admin/san-pham/add"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                ></ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/san-pham/add"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Thêm sản phẩm" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/san-pham/inventory"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Kho hàng" />
                </ListItem>
                <List>
                  <ListItem
                    button
                    onClick={handleClick}
                    sx={{ pl: 4, color: "#f0f6fc" }}
                  >
                    <ListItemText primary="Danh mục sản phẩm" />
                    {openCategory ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  {/* Nested list for subcategories */}
                  <Collapse in={openCategory} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory1"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Chất liệu giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory2"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Giới tính giày " />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory3"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Kích cỡ giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory3"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Thể loại giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory3"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Màu sắc giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory3"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Mục đích sử dụng" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory3"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Danh mục phụ 3" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/categories/subcategory3"
                        sx={{ pl: 6, color: "#f0f6fc" }}
                      >
                        <ListItemText primary="Danh mục phụ 3" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </List>
            </Collapse>

            {/* Quản lý đơn hàng */}
            <ListItem
              button
              onClick={() => toggleSection("donHang")}
              sx={{ color: "#f0f6fc" }}
            >
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#ffffff" }} />
              </ListItemIcon>
              <ListItemText primary="Quản lý đơn hàng" />
              {openSection === "donHang" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openSection === "donHang"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to="/user/don-hang/new"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Đơn hàng mới" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/user/don-hang/processing"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Đơn hàng đang xử lý" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/user/don-hang/history"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Lịch sử đơn hàng" />
                </ListItem>
              </List>
            </Collapse>

            {/* Tương tác người dùng */}
            <ListItem
              button
              onClick={() => toggleSection("tuongTac")}
              sx={{ color: "#f0f6fc" }}
            >
              <ListItemIcon>
                <GroupIcon sx={{ color: "#ffffff" }} />
              </ListItemIcon>
              <ListItemText primary="Tương tác người dùng" />
              {openSection === "tuongTac" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openSection === "tuongTac"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to="/admin/tuong-tac-nguoi-dung/comments"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Quản lý bình luận" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/tuong-tac-nguoi-dung/reviews"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Quản lý đánh giá" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/tuong-tac-nguoi-dung/messages"
                  sx={{ pl: 4, color: "#f0f6fc" }}
                >
                  <ListItemText primary="Tin nhắn người dùng" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          {/* //----------------------- */}
          <ListItem
            button
            component={Link}
            to="/admin/thong-ke"
            sx={{ color: "#f0f6fc" }}
          >
            <ListItemIcon>
              <PaymentIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Thống kê" />
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
      </Box>{" "}
    </>
  );
};

export default NavBarAdmin;
