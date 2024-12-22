import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import { getThemeConfig } from "../../services/themeService";

const api = process.env.REACT_APP_URL_SERVER;

const WishlistItem = ({
  name,
  price,
  rating,
  tags,
  inCart,
  image,
  gender,
  category,
  material,
  brand,
  dateLiked,
  handleAddToCart,
  isLoading,
  idProduct,
  removeFromFavorites,
}) => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: currentTheme.backgroundColorLow,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
        <img
          src={`${api}/images/${image}`} // Replace with correct image URL
          alt={`${name} thumbnail`}
          style={{ marginRight: 16, width: "80px", borderRadius: "13px" }}
        />
        <Box>
          <Typography variant="h6" sx={{ color: currentTheme.color }}>
            {name}
          </Typography>
          <Typography variant="body2" color="gray">
            {gender} | {category} | {material} | {brand}
          </Typography>
          <Typography variant="body2" color="gray">
            Rating: {rating}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h6" sx={{ color: currentTheme.color }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </Typography>
        <Button
          variant="text"
          onClick={() => removeFromFavorites(idProduct)}
          sx={{
            color: currentTheme.color,
            textTransform: "none",
            mr: 2,
            "&:hover": {
              color: currentTheme.color, // Change text color on hover
            },
          }}
        >
          Remove
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: "14px",
            backgroundColor: inCart ? "#cccccc" : "#26bbff",
            color: inCart ? "#666666" : "#101014",
            fontWeight: "600",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: inCart ? "#b3b3b3" : "#3ccaff",
            },
          }}
          onClick={() => handleAddToCart(idProduct)}
          disabled={inCart || isLoading} // Disable button if product is already in cart or processing
        >
          {isLoading
            ? "Processing..."
            : inCart
            ? "View In Cart"
            : "Add To Cart"}
        </Button>
      </Box>
    </Card>
  );
};

export default WishlistItem;
