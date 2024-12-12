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
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link, useLocation } from "react-router-dom";
import { getThemeConfig } from "../../services/themeService";
const NavBarAdmin = () => {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
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
          backgroundColor: currentTheme.backgroundColor,
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
            background: "#fff",
          },
        }}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: "20px",
            color: currentTheme.color,
          }}
        >
          Quản lý hệ thống
        </Typography>
        <List component="nav">
          <ListItem
            button
            component={Link}
            to="/admin"
            sx={{
              borderRadius: "12px",
              color: currentTheme.color,
              cursor: "pointer",
              userSelect: "none",
              backgroundColor:
                location.pathname === "/admin"
                  ? currentTheme.accentColor
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": { backgroundColor: currentTheme.accentColor },
            }}
          >
            <ListItemIcon>
              {" "}
              <BarChartIcon sx={{ color: currentTheme.color }} />
            </ListItemIcon>

            <ListItemText primary="Thống kê cơ bản" />
          </ListItem>
          {/* //----------------------- */}
          <List>
            {/* Quản lý người dùng */}
            <ListItem
              button
              onClick={() => toggleSection("nguoiDung")}
              sx={{
                borderRadius: "12px",
                color: currentTheme.color,

                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <ListItemIcon>
                <PeopleIcon sx={{ color: currentTheme.color }} />
              </ListItemIcon>
              <ListItemText
                primary="Quản lý người dùng"
                sx={{ color: currentTheme.color }}
              />
              {openSection === "nguoiDung" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openSection === "nguoiDung"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to="/admin/nguoi-dung/danh-sach"
                  sx={{
                    borderRadius: "12px",
                    pl: 4,
                    mt: 1,
                    mb: 1,
                    color: currentTheme.color,
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      location.pathname === "/admin/nguoi-dung/danh-sach"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: currentTheme.accentColor },
                  }}
                >
                  <ListItemText primary="Danh sách người dùng" />
                </ListItem>

                {/* <ListItem
                  button
                  component={Link}
                  to="/user/nguoi-dung/roles"
                  sx={{
                    pl: 4,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    color: currentTheme.color,
                    backgroundColor:
                      location.pathname === "/admin213"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: currentTheme.accentColor },
                  }}
                >
                  <ListItemText primary="Phân quyền" />
                </ListItem> */}
              </List>
            </Collapse>
            {/* Quản lý sản phẩm */}
            <ListItem
              button
              onClick={() => toggleSection("sanPham")}
              sx={{
                borderRadius: "12px",
                color: currentTheme.color,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <ListItemIcon>
                <InventoryIcon sx={{ color: currentTheme.color }} />
              </ListItemIcon>
              <ListItemText
                primary="Quản lý sản phẩm"
                sx={{ color: currentTheme.color }}
              />
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
                  to="/admin/san-pham/them-san-pham"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/san-pham/them-san-pham"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: currentTheme.accentColor },
                  }}
                >
                  <ListItemText primary="Thêm sản phẩm" />
                </ListItem>{" "}
                <ListItem
                  button
                  component={Link}
                  to="/admin/san-pham/carousel-product"
                  sx={{
                    pl: 4,
                    mt: 1,
                    mb: 1,
                    color: currentTheme.color,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/san-pham/carousel-product"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: currentTheme.accentColor },
                  }}
                >
                  <ListItemText primary="Carousel Sản Phẩm" />
                </ListItem>
                <List>
                  <ListItem
                    button
                    onClick={handleClick}
                    sx={{
                      pl: 4,
                      color: currentTheme.color,
                      borderRadius: "13px",
                    }}
                  >
                    <ListItemText
                      primary="Danh mục sản phẩm"
                      sx={{
                        borderRadius: "13px",
                        color: currentTheme.color,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    />
                    {openCategory ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  {/* Nested list for subcategories */}
                  <Collapse in={openCategory} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/chat-lieu"
                        sx={{
                          pl: 6,
                          mt: 1,
                          color: currentTheme.color,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/chat-lieu"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Chất liệu giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/gioi-tinh"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/gioi-tinh"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Giới tính giày " />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/kich-co"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/kich-co"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Kích cỡ giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/the-loai"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/the-loai"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Thể loại giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/mau-sac"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/mau-sac"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Màu sắc giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/muc-dich"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/muc-dich"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Mục đích sử dụng" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/phong-cach"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/phong-cach"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Phong cách giày" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/thuong-hieu"
                        sx={{
                          pl: 6,
                          color: currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/thuong-hieu"
                              ? currentTheme.accentColor
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: currentTheme.accentColor,
                          },
                        }}
                      >
                        <ListItemText primary="Thương hiệu giày" />
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
              sx={{
                color: currentTheme.color,
                borderRadius: "13px",
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: currentTheme.color }} />
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
                  to="/admin/don-hang/dang-xu-ly"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/dang-xu-ly"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Đơn hàng đang xử lý" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/tat-ca"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/tat-ca"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Tất cả đơn hàng" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/da-giao"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/da-giao"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Đơn hàng đã giao" />
                </ListItem>{" "}
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/da-huy"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/da-huy"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Đơn hàng đã hủy" />
                </ListItem>{" "}
                <ListItem
                  button
                  component={Link}
                  to="/admin/thanh-toan/them-thanh-toan"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/them-thanh-toan"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Phương Thức Thanh Toán" />
                </ListItem>
              </List>
            </Collapse>

            {/* Tương tác người dùng */}
            <ListItem
              button
              onClick={() => toggleSection("tuongTac")}
              sx={{
                color: currentTheme.color,
                borderRadius: "13px",
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <GroupIcon sx={{ color: currentTheme.color }} />
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
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/comments"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Quản lý bình luận" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/tuong-tac-nguoi-dung/reviews"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/reviews"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Quản lý đánh giá" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/tuong-tac-nguoi-dung/messages"
                  sx={{
                    pl: 4,
                    color: currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/messages"
                        ? currentTheme.accentColor
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: currentTheme.accentColor,
                    },
                  }}
                >
                  <ListItemText primary="Tin nhắn người dùng" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <ListItem
            button
            component={Link}
            to="/admin/blog"
            sx={{
              borderRadius: "12px",
              pl: 4,
              mt: 1,
              mb: 1,
              color: currentTheme.color,
              cursor: "pointer",
              userSelect: "none",
              backgroundColor:
                location.pathname === "/admin/blog"
                  ? currentTheme.accentColor
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": { backgroundColor: currentTheme.accentColor },
            }}
          >
            <ListItemText primary="Blog" />
          </ListItem>
          {/* //----------------------- */}
          {/* <ListItem
            button
            component={Link}
            to="/admin/thong-ke"
            sx={{
              color: currentTheme.color,
              mt: 1,
              mb: 1,
              borderRadius: "13px",
              backgroundColor:
                location.pathname === "/admin/thong-ke"
                  ? currentTheme.accentColor
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": {
                backgroundColor: currentTheme.accentColor,
              },
            }}
          >
            <ListItemIcon>
              <PaymentIcon sx={{ color: currentTheme.color }} />
            </ListItemIcon>
            <ListItemText primary="Thống kê" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/password-security"
            sx={{
              color: currentTheme.color,
              mt: 1,
              mb: 1,
              borderRadius: "13px",
              backgroundColor:
                location.pathname === "/admin/password-security"
                  ? currentTheme.accentColor
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": {
                backgroundColor: currentTheme.accentColor,
              },
            }}
          >
            <ListItemIcon>
              <LockIcon sx={{ color: currentTheme.color }} />
            </ListItemIcon>
            <ListItemText primary="Password & Security" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/epic-rewards"
            sx={{
              color: currentTheme.color,
              mt: 1,
              mb: 1,
              borderRadius: "13px",
              backgroundColor:
                location.pathname === "/admin/epic-rewards"
                  ? currentTheme.accentColor
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": {
                backgroundColor: currentTheme.accentColor,
              },
            }}
          >
            <ListItemIcon>
              <StarIcon sx={{ color: currentTheme.color }} />
            </ListItemIcon>
            <ListItemText primary="Epic Rewards" />
          </ListItem> */}
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
