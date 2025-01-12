import React, { useState, useEffect, useRef } from "react";
import { Card, Box, Typography, Button, Modal } from "@mui/material";
import { getThemeConfig } from "../../services/themeService";
import moment from "moment";
import { useSelector } from "react-redux";
import translations from "../../redux/data/translations";

const api = process.env.REACT_APP_URL_SERVER;

const WishlistItem = ({
  item,
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
  handleViewProduct,
}) => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
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
            {moment(dateLiked).format(" HH:mm DD/MM/YYYY ")}
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
          {t.remove}
        </Button>

        <Button
          onClick={() => handleViewProduct(item)}
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
          disabled={inCart || isLoading} // Disable button if product is already in cart or processing
        >
          {isLoading ? t.processing : inCart ? t.viewInCart : t.viewProduct}
        </Button>
      </Box>
    </Card>
  );
};

export default WishlistItem;
