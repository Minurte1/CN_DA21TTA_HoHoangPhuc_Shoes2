import React, { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import axios from "axios";
import ProductCarousel from "../../share-view/productCarousel";
const api = process.env.REACT_APP_URL_SERVER;

const BrowseProduct = () => {
  const [filter, setFilter] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${api}/san-pham/use`);
      if (response.data.EC === 1) {
        setProducts(response.data.DT); // Set product data
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    filter ? product.category === filter : true
  );

  return (
    <>
      <Box>
        <div>
          <ProductCarousel api={api} products={products} />
        </div>

        <div style={{ display: "flex" }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            {/* Product Grid */}
            <Grid item xs={12} sm={9} container spacing={2}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                      alt={product.TEN_SAN_PHAM}
                      sx={{
                        objectFit: "contain", // Đảm bảo toàn bộ hình ảnh được hiển thị
                        display: "block", // Đặt display là block
                        margin: "0 auto", // Căn giữa hình ảnh theo chiều ngang
                      }}
                    />

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.TEN_SAN_PHAM}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.MO_TA_SAN_PHAM}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Desktop Filter Sidebar on Right */}
            <Grid item xs={12} sm={3} display={{ xs: "none", sm: "block" }}>
              <SidebarFilter
                filter={filter}
                onFilterChange={handleFilterChange}
              />
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
              <SidebarFilter
                filter={filter}
                onFilterChange={handleFilterChange}
              />
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
      </Box>
    </>
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
