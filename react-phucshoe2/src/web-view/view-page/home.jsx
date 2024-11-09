import React, { useEffect, useState } from "react";

import axios from "axios";
import ProductCarousel from "../../share-view/productCarousel";
import "../css-page/home.css";

import CarouselHead from "../../share-view/carouselHead";
import CartProduct from "../../share-view/cardProduct";
import ListGame from "../../share-view/listGame";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
const api = process.env.REACT_APP_URL_SERVER;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [last2Products, setLast2Products] = useState([]);
  useEffect(() => {
    fetchProducts();
    fetchLast2products();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${api}/san-pham/use/nu`);
      if (response.data.EC === 1) {
        setProducts(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchLast2products = async () => {
    try {
      const response = await axios.get(`${api}/san-pham/use/last2products`);
      if (response.data.EC === 1) {
        setLast2Products(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  console.log("products", products);
  const topSellers = [
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
  ];

  const mostPlayed = [
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
  ];

  const upcomingWishlisted = [
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
    {
      title: "EA SPORTS FC™ 25 Standard...",
      price: "₫1,299,000",
      thumbnail:
        "https://cdn1.epicgames.com/spt-assets/667c480e8d0a41dc87b1fcdd8d491dc5/3-minutes-to-midnight-4k58r.jpg?resize=1&w=360&h=480&quality=medium",
    },
  ];
  const games = [
    {
      title: "EA SPORTS WRC",
      description:
        "The EA SPORTS WRC 2024 Season Expansion brings new locations, vehicles, liveries, and much more.",
      price: "₫699,000",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-disney-speedstorm-season-10-breaker-1920x1080-e8cea26d074f.jpg?resize=1&w=854&h=480&quality=medium", // Thay đổi thành link thực tế
    },
    {
      title: "Disney Speedstorm - Season 10",
      description:
        "Racers Jack Skellington, Sally, Oogie Boogie, and Dr. Finkelstein are revving up to take you on a monstrous race!",
      price: "Play For Free",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-wrc24-update-breaker-1920x1080-83a107186dca.jpg?resize=1&w=854&h=480&quality=medium", // Thay đổi thành link thực tế
    },
  ];
  return (
    <>
      <div className="container-home">
        {" "}
        <div className="home">
          <CarouselHead />
          <ProductCarousel products={products} api={api} />
          <Box
            sx={{
              padding: 3,
              backgroundColor: "#101014",
            }}
          >
            <Grid container spacing={2}>
              {last2Products.map((product, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#202020",
                      color: "#fff",
                      textAlign: "left",
                      width: "100%",
                      height: "800px",
                    }}
                  >
                    <CardContent sx={{ padding: 2 }}>
                      <img
                        src={`${api}/images/${product.HINH_ANH_SANPHAM}`}
                        alt={product.HINH_ANH_SANPHAM}
                        style={{
                          width: "100%",
                          height: "600px",
                          objectFit: "cover", // Đảm bảo hình ảnh không bị méo, sẽ crop nếu cần
                          borderRadius: "8px",
                          marginBottom: 2,
                          transition: "filter 0.3s ease", // Thêm hiệu ứng chuyển tiếp
                        }}
                        className="game-thumbnail" // Thêm lớp CSS cho hình ảnh
                      />
                      <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        {product.TEN_SAN_PHAM}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ marginBottom: 1, opacity: 0.7 }}
                      >
                        {product.MO_TA_SAN_PHAM}
                      </Typography>

                      <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.GIA)}
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#343437",
                          color: "#fff",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#4a4a4a", // Màu sáng hơn khi hover
                          },
                        }}
                      >
                        Mua Ngay
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <CartProduct />
          <ProductCarousel products={products} api={api} />
          <Box
            sx={{
              backgroundColor: "#101014",
              padding: 3,
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                {/* 12 cột trên di động, 6 cột trên thiết bị nhỏ, 4 cột trên thiết bị lớn */}
                <ListGame title="Top Sellers" items={topSellers} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ListGame title="Most Played" items={mostPlayed} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ListGame
                  title="Top Upcoming Wishlisted"
                  items={upcomingWishlisted}
                />
              </Grid>
            </Grid>
          </Box>{" "}
          <CartProduct />{" "}
        </div>
      </div>
    </>
  );
};

export default Home;
