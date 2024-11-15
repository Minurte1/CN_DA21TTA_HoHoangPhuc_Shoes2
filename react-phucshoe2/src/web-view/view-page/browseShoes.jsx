import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Drawer,
  IconButton,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
const products = [
  {
    title: "VED",
    price: "₫256,800",
    category: "new",
    image:
      "https://cdn1.epicgames.com/spt-assets/9ab7eaaeb2f041969b350955b789f0f7/sorry-were-closed-1xagz.jpg?resize=1&w=360&h=480&quality=medium",
  },
  {
    title: "Necroking",
    price: "₫73,500",
    category: "new",
    image:
      "https://cdn1.epicgames.com/spt-assets/9ab7eaaeb2f041969b350955b789f0f7/sorry-were-closed-1xagz.jpg?resize=1&w=360&h=480&quality=medium",
  },
  {
    title: "Sorry We’re Closed",
    price: "₫261,000",
    category: "popular",
    image:
      "https://cdn1.epicgames.com/spt-assets/9ab7eaaeb2f041969b350955b789f0f7/sorry-were-closed-1xagz.jpg?resize=1&w=360&h=480&quality=medium",
  },
  // Add more product data here
];

const BrowseProduct = () => {
  const [filter, setFilter] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    filter ? product.category === filter : true
  );

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Product Grid */}
        <Grid item xs={12} sm={9} container spacing={2}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image} // Replace with product image URL
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Desktop Filter Sidebar on Right */}
        <Grid item xs={12} sm={3} display={{ xs: "none", sm: "block" }}>
          <SidebarFilter filter={filter} onFilterChange={handleFilterChange} />
        </Grid>

        {/* Drawer for Mobile Filter Sidebar */}
        <Drawer
          variant="temporary"
          anchor="right" // Mở Drawer từ bên phải
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <SidebarFilter filter={filter} onFilterChange={handleFilterChange} />
        </Drawer>
      </Grid>

      {/* Mobile Filter Button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end" // Căn bên phải cho nút filter trên mobile
        onClick={() => setMobileOpen(true)}
        sx={{
          display: { sm: "none" },
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <FilterList />
      </IconButton>
    </div>
  );
};

// Sidebar filter component
const SidebarFilter = ({ filter, onFilterChange }) => (
  <div style={{ padding: "20px" }}>
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select value={filter} onChange={onFilterChange}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="new">New Release</MenuItem>
        <MenuItem value="popular">Popular</MenuItem>
        <MenuItem value="free">Free</MenuItem>
      </Select>
    </FormControl>
  </div>
);

export default BrowseProduct;
