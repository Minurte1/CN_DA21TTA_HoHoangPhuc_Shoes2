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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link, useLocation } from "react-router-dom";
import { getThemeConfig } from "../../services/themeService";
import { useSelector } from "react-redux";
import translations from "../../redux/data/translations";
const NavBarAdmin = () => {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

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
          {t.systemManagement}
        </Typography>
        <List component="nav">
          <ListItem
            button
            component={Link}
            to="/admin"
            sx={{
              borderRadius: "12px",
              color:
                location.pathname === "/admin" ? "#000" : currentTheme.color,
              cursor: "pointer",
              userSelect: "none",
              backgroundColor:
                location.pathname === "/admin" ? "#2ccaff" : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": { backgroundColor: "#2ccaff", color: "#000" },
            }}
          >
            <ListItemIcon>
              {" "}
              <BarChartIcon
                sx={{
                  color:
                    location.pathname === "/admin"
                      ? "#000"
                      : currentTheme.color,
                }}
              />
            </ListItemIcon>

            <ListItemText primary={t.basicStatistics} />
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
                primary={t.userManagement}
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
                    color:
                      location.pathname === "/admin/nguoi-dung/danh-sach"
                        ? "#000"
                        : currentTheme.color,
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      location.pathname === "/admin/nguoi-dung/danh-sach"
                        ? "#2ccaff"
                        : "transparent",
                    "&:hover": { backgroundColor: "#2ccaff", color: "#000" },
                  }}
                >
                  <ListItemText primary={t.userList} />
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
                        ? "#c5ebf6"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: "#c5ebf6" },
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
                primary={t.productManagement}
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
                    color:
                      location.pathname === "/admin/san-pham/them-san-pham"
                        ? "#000"
                        : currentTheme.color,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/san-pham/them-san-pham"
                        ? "#2ccaff"
                        : "transparent",
                    "&:hover": { backgroundColor: "#2ccaff", color: "#000" },
                  }}
                >
                  <ListItemText primary={t.addProduct} />
                </ListItem>

                <ListItem
                  button
                  component={Link}
                  to="/admin/san-pham/carousel-product"
                  sx={{
                    pl: 4,
                    mt: 1,
                    mb: 1,
                    color:
                      location.pathname === "/admin/san-pham/carousel-product"
                        ? "#000"
                        : currentTheme.color,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/san-pham/carousel-product"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": { backgroundColor: "#2ccaff", color: "#000" },
                  }}
                >
                  <ListItemText primary={t.productCarousel} />
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
                      primary={t.productCategory}
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
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/chat-lieu"
                              ? "#000"
                              : currentTheme.color,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/chat-lieu"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeMaterial} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/gioi-tinh"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/gioi-tinh"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/gioi-tinh"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeGender} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/kich-co"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/kich-co"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/kich-co"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeSize} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/the-loai"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/the-loai"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/the-loai"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeCategory} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/mau-sac"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/mau-sac"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/mau-sac"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeColor} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/muc-dich"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/muc-dich"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/muc-dich"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.usagePurpose} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/phong-cach"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/phong-cach"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/phong-cach"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeStyle} />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/admin/san-pham/danh-muc/thuong-hieu"
                        sx={{
                          pl: 6,
                          color:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/thuong-hieu"
                              ? "#000"
                              : currentTheme.color,
                          mt: 1,
                          mb: 1,
                          borderRadius: "13px",
                          backgroundColor:
                            location.pathname ===
                            "/admin/san-pham/danh-muc/thuong-hieu"
                              ? "#2ccaff"
                              : "transparent", // Kiểm tra nếu đang ở trang này
                          "&:hover": {
                            backgroundColor: "#2ccaff",
                            color: "#000",
                          },
                        }}
                      >
                        <ListItemText primary={t.shoeBrand} />
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
              <ListItemText primary={t.orderManagement} />
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
                    color:
                      location.pathname === "/admin/don-hang/dang-xu-ly"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/dang-xu-ly"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.processingOrders} />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/dang-giao-hang"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname === "/admin/don-hang/dang-giao-hang"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/dang-giao-hang"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.order_in_delivery} />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/tat-ca"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname === "/admin/don-hang/tat-ca"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/tat-ca"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.allOrders} />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/da-giao"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname === "/admin/don-hang/da-giao"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/da-giao"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.deliveredOrders} />
                </ListItem>{" "}
                <ListItem
                  button
                  component={Link}
                  to="/admin/don-hang/da-huy"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname === "/admin/don-hang/da-huy"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/da-huy"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.canceledOrders} />
                </ListItem>{" "}
                <ListItem
                  button
                  component={Link}
                  to="/admin/thanh-toan/them-thanh-toan"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname === "/admin/don-hang/them-thanh-toan"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname === "/admin/don-hang/them-thanh-toan"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.paymentMethods} />
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
              <ListItemText primary={t.userInteraction} />
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
                  to="/admin/tuong-tac-nguoi-dung/reviews"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/reviews"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/reviews"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.reviewManagement} />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/admin/tuong-tac-nguoi-dung/messages"
                  sx={{
                    pl: 4,
                    color:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/messages"
                        ? "#000"
                        : currentTheme.color,
                    mt: 1,
                    mb: 1,
                    borderRadius: "13px",
                    backgroundColor:
                      location.pathname ===
                      "/admin/tuong-tac-nguoi-dung/messages"
                        ? "#2ccaff"
                        : "transparent", // Kiểm tra nếu đang ở trang này
                    "&:hover": {
                      backgroundColor: "#2ccaff",
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText primary={t.userMessages} />
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
              mt: 1,
              mb: 1,
              color:
                location.pathname === "/admin/blog"
                  ? "#000"
                  : currentTheme.color,
              cursor: "pointer",
              userSelect: "none",
              backgroundColor:
                location.pathname === "/admin/blog" ? "#2ccaff" : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": { backgroundColor: "#2ccaff", color: "#000" }, // Đổi màu chữ thành đen khi hover
            }}
          >
            <ListItemIcon>
              <BookmarkIcon
                sx={{
                  color:
                    location.pathname === "/admin/blog"
                      ? "#000"
                      : currentTheme.color,
                  "&:hover": { color: "#000" }, // Đổi màu icon thành đen khi hover
                }}
              />
            </ListItemIcon>
            <ListItemText primary={t.blog} />
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
                  ? "#c5ebf6"
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": {
                backgroundColor: "#c5ebf6",
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
                  ? "#c5ebf6"
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": {
                backgroundColor: "#c5ebf6",
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
                  ? "#c5ebf6"
                  : "transparent", // Kiểm tra nếu đang ở trang này
              "&:hover": {
                backgroundColor: "#c5ebf6",
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
            {t.needHelp}
          </Typography>
        </List>
      </Box>{" "}
    </>
  );
};

export default NavBarAdmin;
