import React, { useEffect, useState } from "react";
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
import axios from "axios";
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
}) => (
  <Card
    sx={{
      mb: 2,
      display: "flex",
      justifyContent: "space-between",
      p: 2,
      backgroundColor: "#202024",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
      <img
        src={`${api}/images/${image}`} // Replace with correct image URL
        alt={`${name} thumbnail`}
        style={{ marginRight: 16, width: "80px", borderRadius: "13px" }}
      />
      <Box>
        <Typography variant="h6" color="white">
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
      <Typography variant="h6" color="white">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price)}
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
            backgroundColor: "#3ccaff",
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
      <InputLabel sx={{ color: "#c9d1d9" }}>Category</InputLabel>
      <Select sx={{ color: "#c9d1d9" }} label="Category">
        <MenuItem value="Shoes">Shoes</MenuItem>
        <MenuItem value="Clothes">Clothes</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel sx={{ color: "#c9d1d9" }}>Brand</InputLabel>
      <Select sx={{ color: "#c9d1d9" }} label="Brand">
        <MenuItem value="Nike">Nike</MenuItem>
        <MenuItem value="Adidas">Adidas</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

const WishlistProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3002/san-pham/use/wishlist-user/3")
      .then((response) => {
        const sortedItems = response.data.DT.sort(
          (a, b) => new Date(b.NGAY_YEU_THICH) - new Date(a.NGAY_YEU_THICH)
        );
        setItems(sortedItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist data:", error);
        setLoading(false);
      });
  }, []);

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
            <Select sx={{ color: "#c9d1d9" }} defaultValue="Newest">
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="On Sale">On Sale</MenuItem>
              <MenuItem value="Popular">Popular</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ backgroundColor: "#555", mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={8}>
        {loading ? (
          <Typography color="white">Loading...</Typography>
        ) : (
          items.map((item, index) => (
            <WishlistItem
              key={index}
              name={item.TEN_SAN_PHAM}
              price={item.GIA}
              rating="N/A" // You can replace it with actual rating if available
              tags={`${item.TEN_GIOI_TINH} | ${item.TEN_DANH_MUC} | ${item.TEN_CHAT_LIEU_} | ${item.TEN_THUONG_HIEU}`}
              inCart={false} // Assuming the value can be dynamically set
              image={item.HINH_ANH_SANPHAM}
              gender={item.TEN_GIOI_TINH}
              category={item.TEN_DANH_MUC}
              material={item.TEN_CHAT_LIEU_}
              brand={item.TEN_THUONG_HIEU}
              dateLiked={item.NGAY_YEU_THICH}
            />
          ))
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <WishlistFilters />
      </Grid>
    </Grid>
  );
};

export default WishlistProducts;
