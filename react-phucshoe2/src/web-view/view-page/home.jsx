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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import translations from "../../redux/data/translations";
import { getThemeConfig } from "../../services/themeService";
const api = process.env.REACT_APP_URL_SERVER;

const Home = () => {
  const [nuProducts, setNuProducts] = useState([]);
  const [namProducts, setNamProducts] = useState([]);
  const [last2Products, setLast2Products] = useState([]);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [treEmProducts, setTreEmProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [bestFavorite, setBestFavorite] = useState([]);
  const [bestExpensive, setBestExpensive] = useState([]);
  const [loading, setLoading] = useState(true); // State loading
  const navigate = useNavigate();

  //BackgroundColor
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const [
        nuResponse,
        last2Response,
        carouselResponse,
        treEmResponse,
        namResponse,
        bestSellingResponse,
        bestFavoriteResponse,
        bestExpensiveResponse,
      ] = await Promise.all([
        axios.post(`${api}/san-pham/use/nu`, {
          ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG,
        }),
        axios.get(`${api}/san-pham/use/last2products`),
        axios.get(`${api}/carousel-products/use`),
        axios.get(`${api}/san-pham/use/tre-em`),
        axios.post(`${api}/san-pham/use/nam`, {
          ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG,
        }),
        axios.get(`${api}/san-pham/use/5best-selling`),
        axios.get(`${api}/san-pham/use/5best-favorite`),
        axios.get(`${api}/san-pham/use/5best-expensive`),
      ]);

      // Cập nhật dữ liệu và set loading = false sau khi nhận được kết quả
      if (nuResponse.data.EC === 1) {
        setNuProducts(nuResponse.data.DT);
      }
      if (namResponse.data.EC === 1) {
        setNamProducts(namResponse.data.DT);
      }
      if (last2Response.data.EC === 1) {
        setLast2Products(last2Response.data.DT);
      }
      if (carouselResponse.data.EC === 1) {
        setCarouselProducts(carouselResponse.data.DT);
      }
      if (treEmResponse.data.EC === 1) {
        setTreEmProducts(treEmResponse.data.DT);
      }
      if (bestSellingResponse.data.EC === 1) {
        setBestSellingProducts(bestSellingResponse.data.DT);
      }
      if (bestFavoriteResponse.data.EC === 1) {
        setBestFavorite(bestFavoriteResponse.data.DT);
      }
      if (bestExpensiveResponse.data.EC === 1) {
        setBestExpensive(bestExpensiveResponse.data.DT);
      }

      // Đặt loading = false khi đã lấy dữ liệu xong
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);

      setLoading(false);
    }
  };
  const handleBuyProduct = (id) => {
    navigate(`/selectShoe/${id}`);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="container-home">
        {" "}
        <div className="home">
          <CarouselHead carouselProducts={carouselProducts} api={api} />
          <ProductCarousel
            title={t.ProductsGirl ? t.ProductsGirl : "Sản phẩm dành cho nữ"}
            products={nuProducts}
            api={api}
            fetchProducts={fetchAllProducts}
          />
          <Box
            sx={{
              padding: 3,
              backgroundColor: currentTheme.backgroundColor,
            }}
          >
            <Grid container spacing={2}>
              {last2Products.map((product, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Card
                    sx={{
                      backgroundColor: currentTheme.backgroundColor,
                      color: currentTheme.color,
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
                        onClick={() => handleBuyProduct(product.ID_SAN_PHAM)}
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
                        {t.BuyNow}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <CartProduct
            title={t.ProductsChild}
            products={treEmProducts}
            api={api}
          />
          <ProductCarousel
            title={t.ProductsMale}
            products={namProducts}
            api={api}
            fetchProducts={fetchAllProducts}
          />
          <Box
            sx={{
              backgroundColor: currentTheme.backgroundColor,
              padding: 3,
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                {bestSellingProducts && bestSellingProducts.length > 0 && (
                  <ListGame
                    title={t.BestSellers}
                    api={api}
                    items={bestSellingProducts}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {bestExpensive && bestExpensive.length > 0 && (
                  <ListGame
                    title={t.HighestValue}
                    api={api}
                    items={bestExpensive}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {bestFavorite && bestFavorite.length > 0 ? (
                  <ListGame
                    title={t.MostPopularProducts}
                    items={bestFavorite}
                    api={api}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Box>{" "}
          {/* <CartProduct />{" "} */}
        </div>
      </div>
    </>
  );
};

export default Home;
