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
const Footer = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language].footer;

  return (
    <Box
      sx={{ backgroundColor: "#1a1a1a", color: "white", padding: "40px 20px" }}
    >
      {/* Social Media Icons */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <IconButton color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit">
          <YouTubeIcon />
        </IconButton>
      </Box>

      {/* Resource Links */}
      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {t.resources}
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              {t.support}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.distribute}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.careers}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.company}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              {t.fanArtPolicy}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.uxResearch}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.storeEula}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.onlineServices}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              {t.communityRules}
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              {t.newsroom}
            </Link>
          </Box>
        </Grid>
        {/* <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {t.madeBy}
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              Battle Breakers
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Fortnite
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Infinity Blade
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Robo Recall
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Shadow Complex
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Unreal Tournament
            </Link>
          </Box>
        </Grid> */}
      </Grid>

      <Divider sx={{ backgroundColor: "#444", marginY: 4 }} />

      {/* Copyright Section */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="body2" color="inherit">
          {t.copyright}
        </Typography>
      </Box>

      {/* Policy Links */}
      <Box sx={{ textAlign: "center" }}>
        <Link
          href="#"
          color="inherit"
          underline="hover"
          sx={{ marginRight: 2 }}
        >
          {t.termsOfService}
        </Link>
        <Link
          href="#"
          color="inherit"
          underline="hover"
          sx={{ marginRight: 2 }}
        >
          {t.privacyPolicy}
        </Link>
        <Link href="#" color="inherit" underline="hover">
          {t.storeRefundPolicy}
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
