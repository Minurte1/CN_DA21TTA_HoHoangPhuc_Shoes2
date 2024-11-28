// src/services/themeService.js

const themeConfigs = {
  light: {
    backgroundColor: "#B5C0D0",
    color: "#101014",
    secondaryColor: "#F5E8DD",
    accentColor: "#EED3D9 ",
  },
  dark: {
    backgroundColor: "#101014",
    color: "#ffffff",
    secondaryColor: "#1A1A1D",
    accentColor: "#FF5722",
  },
};

// Hàm lấy theme
export const getThemeConfig = (theme = "light") => {
  return themeConfigs[theme] || themeConfigs.light;
};
