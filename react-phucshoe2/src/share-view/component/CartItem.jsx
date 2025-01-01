import React from "react";
import { Box, Card, Typography, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
const api = process.env.REACT_APP_URL_SERVER;

const CartItem = ({
  id,
  name,
  price,
  description,
  gender,
  category,
  material,
  brand,
  quantityInCart,
  image,
  userId,
  fetchCartItems,
  handleQuantityChange,
  color,
  phongCach,
  mucDich,
  kichCo,
  quantity,
  handleRemoveProduct,
  currentTheme,
  item,
}) => {
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
          src={`${api}/images/${image}`}
          alt={`${name} thumbnail`}
          style={{ marginRight: 16, width: "80px", borderRadius: "13px" }}
        />
        <Box>
          <Typography variant="h6" sx={{ color: currentTheme.color }}>
            {name}
          </Typography>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
          <Typography variant="body2" color="gray">
            {category} | {material} | {gender} | {brand}
          </Typography>
          <Typography variant="body2" color="gray">
            Màu sắc:{" "}
            <span style={{ color: item.MA_MAU.toLowerCase(), fontWeight: 600 }}>
              {color}
            </span>
          </Typography>
          <Typography variant="body2" color="gray">
            Kích cỡ:
            <span style={{ color: item.MA_MAU.toLowerCase(), fontWeight: 600 }}>
              {kichCo}
            </span>
          </Typography>
          <Typography variant="body2" color="gray">
            {mucDich}
          </Typography>
          <Typography variant="body2" color="gray">
            Phong cách: {phongCach}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ color: currentTheme.color }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </Typography>

        <Typography variant="body2" sx={{ color: currentTheme.color }}>
          Số lượng trong giỏ:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            justifyContent: "right",
          }}
        >
          <IconButton
            sx={{ color: "#d32a28" }}
            size="small"
            onClick={() =>
              handleQuantityChange(
                quantity - 1,
                id,
                "Delete",
                item.ID_SAN_PHAM_CHI_TIET
              )
            }
          >
            <Remove />
          </IconButton>
          <Typography variant="body1" sx={{ color: currentTheme.color }}>
            {quantity}
          </Typography>
          <IconButton
            sx={{ color: "#3ccaff" }}
            size="small"
            onClick={() =>
              handleQuantityChange(
                quantity + 1,
                id,
                "Add",
                item.ID_SAN_PHAM_CHI_TIET
              )
            }
          >
            <Add />
          </IconButton>
        </Box>

        <Button
          sx={{ mt: 2 }}
          variant="text"
          color="error"
          onClick={() => handleRemoveProduct(id)}
        >
          Loại bỏ
        </Button>
      </Box>
    </Card>
  );
};

export default CartItem;
