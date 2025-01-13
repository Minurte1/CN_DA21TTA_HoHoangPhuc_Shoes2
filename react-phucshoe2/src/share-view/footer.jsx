import React from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import translations from "../redux/data/translations";
import { useSelector } from "react-redux";
import { getThemeConfig } from "../services/themeService";

const Footer = () => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  return (
    <Box
      sx={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
        padding: "40px 20px",
        borderTop: `1px solid ${currentTheme.secondaryColor}`,
      }}
    >
      {/* Social Media Icons */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <IconButton
          sx={{
            color: currentTheme.color,
            "&:hover": { color: currentTheme.secondaryColor },
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          sx={{
            color: currentTheme.color,
            "&:hover": { color: currentTheme.secondaryColor },
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          sx={{
            color: currentTheme.color,
            "&:hover": { color: currentTheme.secondaryColor },
          }}
        >
          <YouTubeIcon />
        </IconButton>
      </Box>

      {/* Resource Links */}
      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={6} sm={3}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: currentTheme.color,
            }}
          >
            {t.resources}
          </Typography>
          <Box>
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {/* {t.support} */}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.distribute}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.careers}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.company}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box>
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.fanArtPolicy}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.uxResearch}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.storeEula}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.onlineServices}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box>
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.communityRules}
            </Link>
            <br />
            <Link href="#" underline="hover" sx={{ color: currentTheme.color }}>
              {t.newsroom}
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Divider
        sx={{
          backgroundColor: currentTheme.secondaryColor,
          marginY: 4,
        }}
      />

      {/* Copyright Section */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="body2" sx={{ color: currentTheme.color }}>
          {t.copyright}
        </Typography>
      </Box>

      {/* Policy Links */}
      <Box sx={{ textAlign: "center" }}>
        <Link
          href="#"
          underline="hover"
          sx={{
            marginRight: 2,
            color: currentTheme.secondaryColor,
          }}
        >
          {t.termsOfService}
        </Link>
        <Link
          href="#"
          underline="hover"
          sx={{
            marginRight: 2,
            color: currentTheme.secondaryColor,
          }}
        >
          {t.privacyPolicy}
        </Link>
        <Link
          href="#"
          underline="hover"
          sx={{ color: currentTheme.secondaryColor }}
        >
          {t.storeRefundPolicy}
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
