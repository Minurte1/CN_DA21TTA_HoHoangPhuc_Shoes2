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

const Footer = () => {
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
            Resources
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              Support-A-Creator
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Distribute on Epic Games
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Careers
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Company
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              Fan Art Policy
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              UX Research
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Store EULA
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Online Services
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box>
            <Link href="#" color="inherit" underline="hover">
              Community Rules
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Epic Newsroom
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Made By Epic Games
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
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: "#444", marginY: 4 }} />

      {/* Copyright Section */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="body2" color="textSecondary">
          © 2024, Epic Games, Inc. All rights reserved. Epic, Epic Games, the
          Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine,
          and Unreal Tournament are trademarks or registered trademarks of Epic
          Games, Inc. in the United States of America and elsewhere.
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
          Terms of Service
        </Link>
        <Link
          href="#"
          color="inherit"
          underline="hover"
          sx={{ marginRight: 2 }}
        >
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" underline="hover">
          Store Refund Policy
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
