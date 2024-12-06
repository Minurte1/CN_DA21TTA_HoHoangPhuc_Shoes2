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

const DashboardAdmin = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      display="flex"
      style={{
        minHeight: "100vh",
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
          <Tab sx={{ color: currentTheme.color }} label="Overview" />
          <Tab sx={{ color: currentTheme.color }} label="Manage Users" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
          <Tab sx={{ color: currentTheme.color }} label="Settings" />
        </Tabs>

        {/* Tab Content */}
        <Box style={{ marginTop: "20px" }}>
          {tabIndex === 0 && (
            <>
              {" "}
              <Typography variant="h6">This is the Overview tab.</Typography>
              <RevenueDashboard />
            </>
          )}
          {tabIndex === 1 && (
            <Typography variant="h6">This is the Manage Users tab.</Typography>
          )}
          {tabIndex === 2 && (
            <Typography variant="h6">This is the Settings tab.</Typography>
          )}
          {tabIndex === 3 && (
            <Typography variant="h6">This is the Settings tab.</Typography>
          )}
          {tabIndex === 4 && (
            <Typography variant="h6">This is the Settings tab.</Typography>
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
