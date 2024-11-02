import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./css/carouselHead.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const CarouselHead = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSelected, setIsSelected] = useState(""); // State để theo dõi trạng thái nhấp
  const [animateLogo, setAnimateLogo] = useState(false); // State để quản lý animation logo

  const games = [
    {
      title: "Red Dead Redemption",
      thumbnail:
        "https://cdn2.unrealengine.com/en-egs-red-dead-redemption-carousel-desktop-1920x1080-765cbfad6449.jpg?resize=1&w=1280&h=720&quality=medium",
      imgSlider:
        "https://cdn2.unrealengine.com/en-egs-red-dead-redemption-carousel-thumb-1200x1600-1a3fa5a66336.jpg?resize=1&w=96&h=128&quality=medium",
      logo: "https://cdn2.unrealengine.com/en-egs-red-dead-redemption-carousel-logo-350x174-95a3a50a84e7.png",
      description:
        "Teardrop Island desperately needs a savior. Too bad it got you instead...",
      price: "1.999.000đ",
    },
    {
      title: "Black Myth: Wukong",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-black-myth-wukong-carousel-desktop-1920x1080-11f4d19845b5.jpg?resize=1&w=1280&h=720&quality=medium",
      imgSlider:
        "https://cdn2.unrealengine.com/en-egs-black-myth-wukong-carousel-thumb-1200x1600-cb8e6720c073.jpg?resize=1&w=96&h=128&quality=medium",
      logo: "https://cdn2.unrealengine.com/egs-black-myth-wukong-carousel-logo-light-350x100-b47bbe672045.png",
      description: "Join Wukong in his epic journey to defeat gods and demons.",
      price: "2.299.000đ",
    },
    {
      title: "God of War Ragnarök",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-god-of-war-ragnarok-carousel-desktop-1919x1079-e9d119c002bb.jpeg?resize=1&w=1280&h=720&quality=medium",
      imgSlider:
        "https://cdn2.unrealengine.com/egs-god-of-war-ragnarok-carousel-thumb-1200x1600-2983ee4306cf.jpg?resize=1&w=96&h=128&quality=medium",
      logo: "https://cdn2.unrealengine.com/egs-god-of-war-ragnarok-carousel-logo-350x105-87a918be0f2d.png",
      description: "Embark on an epic journey with Kratos and Atreus.",
      price: "1.999.000đ",
    },
    {
      title: "SONIC X SHADOW GENERATIONS",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-sonic-x-shadow-generations-carousel-desktop-1920x1080-f28d7f5acb3c.jpg?resize=1&w=1280&h=720&quality=medium",
      imgSlider:
        "https://cdn2.unrealengine.com/egs-sonic-x-shadow-generations-carousel-thumb-1200x1600-44e873fa9ebe.jpg?resize=1&w=96&h=128&quality=medium",
      logo: "https://cdn2.unrealengine.com/egs-sonic-x-shadow-generations-carousel-logo-350x183-e85bb425613c.png",
      description: "Sonic and Shadow team up in an epic adventure.",
      price: "1.499.000đ",
    },
    {
      title: "EA SPORTS FC™ 25 Ultimate Edition",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-ea-fc-25-ultimate-carousel-desktop-2-1248x702-ff44b8f5a37a.jpg?resize=1&w=1280&h=720&quality=medium",
      imgSlider:
        "https://cdn2.unrealengine.com/egs-ea-fc-25-ultimate-edition-carousel-thumb-1200x1600-e9bc5d6280fc.jpg?resize=1&w=96&h=128&quality=medium",
      logo: "https://cdn2.unrealengine.com/egs-ea-fc-25-ultimate-carousel-logo-350x135-b8d3db95f220.png",
      description: "Experience the ultimate football simulation.",
      price: "1.799.000đ",
    },
    {
      title: "Hades II",
      thumbnail:
        "https://cdn2.unrealengine.com/egs-hades-ii-olympus-update-carousel-desktop-1920x1080-a64902bcf4cc.jpg?resize=1&w=1280&h=720&quality=medium",
      imgSlider:
        "https://cdn2.unrealengine.com/egs-hades-ii-olympus-update-carousel-thumb-1200x1600-8a06ae0f21dd.jpg?resize=1&w=96&h=128&quality=medium",
      logo: "https://cdn2.unrealengine.com/egs-hades-2-olympus-update-carousel-logo-350x198-2cdddaa51407.png",
      description: "Escape from the underworld in this thrilling adventure.",
      price: "2.499.000đ",
    },
  ];

  // State to manage the current main image
  const [mainImage, setMainImage] = useState(games[0].thumbnail);
  const handleClick = (game, index) => {
    setIsSelected(index); // Đảo ngược trạng thái khi nhấp
    setMainImage(game.thumbnail); // Cập nhật hình ảnh chính

    setAnimateLogo(true);

    setTimeout(() => {
      setAnimateLogo(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#101014",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        className="main-image-container"
        style={{ backgroundImage: `url(${mainImage})` }} // Background image set through inline style
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          backgroundColor: "#101014",
        }}
      >
        <Box
          sx={{
            flex: 1, // Chiếm 50% chiều rộng
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // Căn dưới cùng theo chiều dọc
            alignItems: "flex-start", // Căn bên trái theo chiều ngang
            padding: 4,
            color: "#f50057",
          }}
        >
          <img
            src={games.find((game) => game.thumbnail === mainImage)?.logo}
            alt={`${
              games.find((game) => game.thumbnail === mainImage)?.title
            } Logo`}
            className={` ${animateLogo ? "slide-in" : ""}`} // Áp dụng class animation
            style={{
              maxWidth: "150px", // Kích thước tối đa cho logo
              marginBottom: "16px", // Khoảng cách phía dưới logo
              zIndex: "3",
            }}
          />

          {games.map((game, index) =>
            isSelected === index ? (
              <React.Fragment key={index}>
                <Typography
                  className={`component-game-description-background  ${
                    animateLogo ? "fade-in-up-text" : ""
                  }`}
                  variant="subtitle1"
                  sx={{
                    textAlign: "left",
                    mt: 1,
                    fontSize: { xs: "0.9rem", md: "1.25rem" },
                  }}
                >
                  {game.description}
                </Typography>
                <Typography
                  className="component-game-description-background"
                  variant="body1"
                  sx={{ mt: 1, mb: 2 }}
                >
                  {game.price}
                </Typography>
              </React.Fragment>
            ) : null
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button
              className="component-game-btn-play"
              variant="contained"
              sx={{
                zIndex: 2,
                backgroundColor: "white",
                color: "black",
                width: "250px",
                height: "50px",
                borderRadius: "14px",
              }}
            >
              Play Now
            </Button>

            <Button
              variant="text"
              fullWidth
              sx={{
                zIndex: 2,
                color: "white",
                borderRadius: "14px",
                backgroundColor: "transparent", // Màu nền mặc định
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Nền trắng nhẹ khi hover
                },
              }}
            >
              <AddCircleOutlineIcon
                sx={{ marginRight: "10px", fontSize: "18px" }}
              />{" "}
              Add to Wishlist
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1, // Chiếm 50% chiều rộng bên phải
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "220px" },
          backgroundColor: "#101014",
          display: "flex",
          flexDirection: "column",
          // padding: 2,
          paddingBottom: 2,
          paddingLeft: 2,
          paddingTop: 1,

          borderRadius: "3%",

          mt: { xs: 2, md: 0 },
        }}
      >
        {games.map((game, index) => (
          <div
            key={index}
            className={`component-game-slider-card ${
              isSelected === index ? "slider-game-active" : ""
            }`}
            onClick={() => {
              handleClick(game, index);
            }} // Gọi hàm khi nhấp vào
          >
            <div className="slider-select-game">
              <img
                component="img"
                src={game.imgSlider}
                className="component-game-img-slide"
                alt={game.title}
                sx={{
                  objectFit: "contain",
                }}
              />

              <CardContent>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "13px",
                    textAlign: "left",
                    mb: 2,
                  }}
                  variant="body2"
                >
                  {game.title}
                </Typography>
              </CardContent>
            </div>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default CarouselHead;
