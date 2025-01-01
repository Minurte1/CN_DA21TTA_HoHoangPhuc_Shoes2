import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Button,
  Toolbar,
} from "@mui/material";
import { getThemeConfig } from "../../../services/themeService";
import RevenueDashboard from "./component/thongKeDoanhThu";
import MostLikedProductsChart from "./component/thongKeSanPham";
import CategoryProductsChart from "./component/thongKeTheLoai";
import UsersByProvinceChart from "./component/thongKeNguoiDung";

const DashboardAdmin = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      display="flex"
      sx={{
        height: "auto",
        width: "100%",
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
      }}
    >
      {/* <Typography variant="h6">Thông kê</Typography> */}
      <Container maxWidth="lg" style={{ padding: "40px" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          style={{
            marginBottom: "20px",
            backgroundColor: currentTheme.backgroundColorLow,
            color: currentTheme.color,
          }}
        >
          <Tab
            sx={{ color: currentTheme.color, fontSize: "12px" }}
            label="Doanh thu"
          />
          <Tab
            sx={{ color: currentTheme.color, fontSize: "12px" }}
            label="Sản phẩm"
          />
          <Tab
            sx={{ color: currentTheme.color, fontSize: "12px" }}
            label="Đơn hàng"
          />
          <Tab
            sx={{ color: currentTheme.color, fontSize: "12px" }}
            label="Thể loại"
          />
          <Tab
            sx={{ color: currentTheme.color, fontSize: "12px" }}
            label="Người dùng"
          />
        </Tabs>

        {/* Tab Content */}
        <Box
          sx={{
            marginTop: "20px",
            backgroundColor: currentTheme.backgroundColor,
            width: "100%",
            color: currentTheme.color,
          }}
        >
          {tabIndex === 0 && (
            <>
              {" "}
              <RevenueDashboard />
            </>
          )}
          {tabIndex === 1 && (
            <>
              <MostLikedProductsChart />
            </>
          )}
          {tabIndex === 2 && <MostLikedProductsChart />}
          {tabIndex === 3 && (
            <>
              <CategoryProductsChart />
            </>
          )}
          {tabIndex === 4 && (
            <>
              <UsersByProvinceChart />
            </>
          )}

          {tabIndex === 5 && (
            <Typography variant="h6">This is the Settings tab.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardAdmin;
