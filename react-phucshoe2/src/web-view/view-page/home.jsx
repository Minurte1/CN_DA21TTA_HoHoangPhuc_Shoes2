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
    fetchBestSellingProducts();
    fetchBestFavorite();
    fetchNamProducts();
    fetchNuProducts();
    fetchBestExpensive();
    fetchTreEmProducts();
    fetchLast2Products();
    fetchCarouselProducts();
  }, []);

  // =============================================
  const fetchProductDataPost = async (apiEndpoint, params, callback) => {
    try {
      setLoading(true);

      const response = await axios.post(apiEndpoint, params);

      // Kiểm tra nếu API trả về thành công
      if (response.data.EC === 1) {
        // Gọi callback để xử lý dữ liệu sau khi fetch thành công
        callback(response.data.DT);
      } else {
        console.error("Error fetching data:", response.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  // Hàm này chỉ gọi API khi cần, thay vì gọi tất cả một lần
  const fetchNuProducts = () => {
    const userId = userInfo?.ID_NGUOI_DUNG || false;
    fetchProductDataPost(
      `${api}/san-pham/use/nu`,
      { ID_NGUOI_DUNG: userId },
      setNuProducts
    );
  };

  const fetchNamProducts = () => {
    const userId = userInfo?.ID_NGUOI_DUNG || false;
    fetchProductDataPost(
      `${api}/san-pham/use/nam`,
      { ID_NGUOI_DUNG: userId },
      setNamProducts
    );
  };
  const fetchProductDataGet = async (apiEndpoint, callback) => {
    try {
      setLoading(true);

      const response = await axios.get(apiEndpoint);

      // Kiểm tra nếu API trả về thành công
      if (response.data.EC === 1) {
        // Gọi callback để xử lý dữ liệu sau khi fetch thành công
        callback(response.data.DT);
      } else {
        console.error("Error fetching data:", response.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  const fetchLast2Products = () => {
    fetchProductDataGet(`${api}/san-pham/use/last2products`, setLast2Products);
  };

  const fetchCarouselProducts = () => {
    fetchProductDataGet(`${api}/carousel-products/use`, setCarouselProducts);
  };

  const fetchTreEmProducts = () => {
    fetchProductDataGet(`${api}/san-pham/use/tre-em`, setTreEmProducts);
  };

  const fetchBestSellingProducts = () => {
    const userId = userInfo?.ID_NGUOI_DUNG || false;
    fetchProductDataPost(
      `${api}/san-pham/use/5best-selling`,
      { ID_NGUOI_DUNG: userId },
      setBestSellingProducts
    );
  };

  const fetchBestFavorite = () => {
    const userId = userInfo?.ID_NGUOI_DUNG || false;
    fetchProductDataPost(
      `${api}/san-pham/use/5best-favorite`,
      { ID_NGUOI_DUNG: userId },
      setBestFavorite
    );
  };

  const fetchBestExpensive = () => {
    const userId = userInfo?.ID_NGUOI_DUNG || false;
    fetchProductDataPost(
      `${api}/san-pham/use/5best-expensive`,
      { ID_NGUOI_DUNG: userId },
      setBestExpensive
    );
  };

  // =============================================
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
            fetchProducts={fetchNuProducts}
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
            fetchProducts={fetchNamProducts}
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
                    fetchProducts={fetchBestSellingProducts}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {bestExpensive && bestExpensive.length > 0 && (
                  <ListGame
                    title={t.HighestValue}
                    api={api}
                    items={bestExpensive}
                    fetchProducts={fetchBestExpensive}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {bestFavorite && bestFavorite.length > 0 ? (
                  <ListGame
                    title={t.MostPopularProducts}
                    items={bestFavorite}
                    api={api}
                    fetchProducts={fetchBestFavorite}
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
