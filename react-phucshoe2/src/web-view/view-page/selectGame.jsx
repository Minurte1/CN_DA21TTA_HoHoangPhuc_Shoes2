import React from "react";
import { Container, Grid, Box, Button, Typography } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

const SelectGame = () => {
  return (
    <Container maxWidth="lg" className="container-select-game">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "600", color: "#fff" }}>
              {" "}
              The Forever Winter
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,

              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Vòng lặp render số sao rating */}
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} sx={{ color: "#fff", fontSize: 15 }} />
            ))}
            <span
              style={{
                marginLeft: "10px",
                opacity: "0.7",
                color: "#fff",
                fontSize: 15,
              }}
            >
              Great Boss Battles
            </span>
          </Box>
        </Grid>{" "}
      </Grid>{" "}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn2.unrealengine.com/en-egs-red-dead-redemption-carousel-desktop-1920x1080-765cbfad6449.jpg?resize=1&w=1280&h=720&quality=medium"
              alt="Red Dead Redemption"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "13px" }}
            />
          </Box>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ color: "#fff" }}>
              {" "}
              The Forever Winter is a co-op tactical survival horror shooter
              where you and your squad must loot the dead to survive under the
              shadow of terrifying and gargantuan war machines locked in a
              never-ending conflict.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box
            sx={{
              textAlign: "left",
              borderRadius: 1,
              backgroundColor: "#2c2c2e",
              color: "#fff",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "sticky",
              top: 20, // Khoảng cách từ trên xuống
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              FOREVER WINTER
            </Typography>
            <Box>
              <Typography variant="body2">18+</Typography>
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                Extreme Violence
              </Typography>
            </Box>
            <Typography variant="h6">₫313,000</Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "14px",
                paddingTop: "13px",
                paddingBottom: "13px",
                backgroundColor: "#26bbff",
                color: "#101014",
                fontWeight: "600",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#3ccaff", // Màu sáng hơn khi hover
                },
              }}
              fullWidth
            >
              Buy Now
            </Button>
            <Button
              sx={{
                borderRadius: "14px",
                paddingTop: "13px",
                paddingBottom: "13px",
                backgroundColor: "#343437",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#4b4b4e", // Màu sáng hơn khi hover
                },
              }}
              fullWidth
            >
              Add To Cart
            </Button>
            <Button
              sx={{
                borderRadius: "14px",
                paddingTop: "13px",
                paddingBottom: "13px",
                backgroundColor: "#343437",
                color: "#fff",
                fontWeight: "600",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#4b4b4e", // Màu sáng hơn khi hover
                },
              }}
              fullWidth
            >
              Add to Wishlist
            </Button>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)", // Thay đổi ở đây
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Epic Rewards: Earn 5% Back
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)", // Thay đổi ở đây
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Refund Type: Self-Refundable
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)", // Thay đổi ở đây
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Developer: Fun Dog Studios
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)", // Thay đổi ở đây
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Publisher: Fun Dog Studios
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)", // Thay đổi ở đây
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Release Date: 09/25/24
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  borderBottom: "1px solid rgba(204, 204, 204, 0.5)", // Thay đổi ở đây
                  paddingTop: 3,
                  paddingBottom: 1,
                }}
              >
                Platform: Windows
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectGame;
