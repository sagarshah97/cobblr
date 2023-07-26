import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
// import pexelsPhoto from './images/pexels-photo-1456737.jpeg';
import Footer from "./Footer";
import ShopBySportCarousel from "./shop";
import MyCarousel from "./MyCarousel";
import ParallaxImage from "./image.js";
import airforce from "../../assets/images/Home/airforce-removebg-preview.png";
import lostandfound from "../../assets/images/Home/lostandfound.png";
import orangelobster from "../../assets/images/Home/orangelobster.png";
// ParallaxImage
// import { useNavigate } from "react-router-dom";

const ShoeContainer = styled("div")({
  width: "90%",
  height: "300px",
  perspective: "1000px",
});

const ShoeCard = styled(Card)({
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 1s",
  cursor: "pointer",
  "&:hover": {
    transform: "rotateY(180deg)",
  },
  willChange: "transform",
});

const ShoeImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backfaceVisibility: "hidden",
});

const Title = styled(Typography)({
  textAlign: "left",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
  fontFamily: "Arial, sans-serif",
});

const ShoeViewer = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate();

  // const handleShoeClick = () => {
  //   navigate("/productdetail");
  // };

  return (
    <div>
      <ParallaxImage />
      <ShopBySportCarousel />

      <MyCarousel />
      {/* <Title variant="h5">Featured Shoes</Title> */}
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          paddingLeft: "20px",
          marginTop: "10%",
          color: "white",
          marginBottom: "20px",
          fontWeight: "100",
          fontSize: "2rem",
          letterSpacing: "0.7rem",
        }}
      >
        FEATURED SHOES
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "60px", paddingRight: "20px", marginBottom: "5%" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <ShoeContainer>
            <ShoeCard
              onClick={() =>
                navigate("/productDetail/649dc5a07b56de6519346d47")
              }
              sx={{ backgroundColor: "transparent" }}
            >
              <ShoeImage component="img" alt="Shoe 1" src={airforce} />
            </ShoeCard>
          </ShoeContainer>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShoeContainer>
            <ShoeCard
              onClick={() =>
                navigate("/productDetail/649e331a12edab48fe2c6021")
              }
              sx={{ backgroundColor: "transparent" }}
            >
              <ShoeImage component="img" alt="Shoe 2" src={orangelobster} />
            </ShoeCard>
          </ShoeContainer>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ShoeContainer>
            <ShoeCard
              onClick={() =>
                navigate("/productDetail/64c16ae0fc576bf42af23782")
              }
              sx={{ backgroundColor: "transparent" }}
            >
              <ShoeImage component="img" alt="Shoe 3" src={lostandfound} />
            </ShoeCard>
          </ShoeContainer>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default ShoeViewer;
