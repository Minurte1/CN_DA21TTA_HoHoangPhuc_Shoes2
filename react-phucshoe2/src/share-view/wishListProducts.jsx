import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
} from "@mui/material";

const WishlistItem = ({ name, price, rating, tags, inCart }) => (
  <Card
    sx={{
      mb: 2,
      display: "flex",
      justifyContent: "space-between",
      p: 2,
      backgroundColor: "#202024",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src="https://via.placeholder.com/100"
        alt={`${name} thumbnail`}
        style={{ marginRight: 16 }}
      />
      <Box>
        <Typography variant="h6" color="white">
          {name}
        </Typography>
        <Typography variant="body2" color="gray">
          {rating}
        </Typography>
        <Typography variant="body2" color="gray">
          {tags}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ textAlign: "right" }}>
      <Typography variant="h6" color="white">
        {price} ₲
      </Typography>
      <Button variant="text" color="primary">
        Remove
      </Button>
      <Button
        variant="contained"
        sx={{
          borderRadius: "14px",

          backgroundColor: "#26bbff",
          color: "#101014",
          fontWeight: "600",
          fontSize: "12px",
          "&:hover": {
            backgroundColor: "#3ccaff", // Màu sáng hơn khi hover
          },
        }}
      >
        {inCart ? "View In Cart" : "Add To Cart"}
      </Button>
    </Box>
  </Card>
);

const WishlistFilters = () => (
  <Box
    sx={{ backgroundColor: "#202024", p: 2, borderRadius: 2, color: "white" }}
  >
    <Typography variant="h6">Filters</Typography>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Genre</InputLabel>
      <Select label="Genre">
        <MenuItem value="Action">Action</MenuItem>
        <MenuItem value="Adventure">Adventure</MenuItem>
        <MenuItem value="RPG">RPG</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Features</InputLabel>
      <Select label="Features">
        <MenuItem value="Single-Player">Single-Player</MenuItem>
        <MenuItem value="Multiplayer">Multiplayer</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>Platform</InputLabel>
      <Select label="Platform">
        <MenuItem value="PC">PC</MenuItem>
        <MenuItem value="Console">Console</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

const WishlistProducts = () => {
  const items = [
    {
      name: "[REDACTED]",
      price: 261000,
      rating: "12+",
      tags: "Horror, Mild Swearing",
      inCart: true,
    },
    {
      name: "AWAKEN - Astral Blade",
      price: 260000,
      rating: "12+",
      tags: "Moderate Violence, In-Game Purchases",
      inCart: false,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ p: 4, backgroundColor: "#121212" }}>
      <Grid item xs={12}>
        <Typography variant="h4" color="white">
          My Wishlist
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
          <Switch defaultChecked color="primary" />
          <Typography variant="body2" color="white">
            Sort by:{" "}
          </Typography>
          <FormControl sx={{ ml: 1, minWidth: 120 }}>
            <Select defaultValue="On Sale">
              <MenuItem value="On Sale">On Sale</MenuItem>
              <MenuItem value="Popular">Popular</MenuItem>
              <MenuItem value="New">New</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ backgroundColor: "#555", mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={8}>
        {items.map((item, index) => (
          <WishlistItem key={index} {...item} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <WishlistFilters />
      </Grid>
    </Grid>
  );
};

export default WishlistProducts;
