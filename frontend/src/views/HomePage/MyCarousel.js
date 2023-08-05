// Author: Sahil Dilip Dalvi (B00939343)
import React from "react";
import adidasImage from "../../assets/images/Home/adidas.png";
import nikeImage from "../../assets/images/Home/nike.png";
import filaImage from "../../assets/images/Home/fila.png";
import pumaImage from "../../assets/images/Home/puma2.png";
import underImage from "../../assets/images/Home/under.png";
import vansImage from "../../assets/images/Home/vans.png";
import nbImage from "../../assets/images/Home/nb.png";
import sketchers from "../../assets/images/Home/sketchers.png";
import { Button, Card, CardMedia, Paper, Typography } from "@mui/material";
// import Item from './Item';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
// Typography

const MyCarousel = () => {
  const swiperStyles = {
    width: "100%",
    paddingTop: "50px",
    paddingBottom: "50px",
  };

  const swiperSlideStyles = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "300px",
    height: "300px",
  };

  const swiperImageStyles = {
    display: "block",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          paddingLeft: "20px",
          marginTop: "10%",
          color: "white",
          fontWeight: "100",
          fontSize: "2rem",
          letterSpacing: "0.7rem",
        }}
      >
        SHOP BY BRANDS
      </Typography>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        style={swiperStyles}
        initialSlide={3}
      >
        <SwiperSlide style={swiperSlideStyles}>
          <img src={nbImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={adidasImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={nikeImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={pumaImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={underImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={vansImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={sketchers} style={swiperImageStyles} />
        </SwiperSlide>
        {/* <SwiperSlide style={swiperSlideStyles}>
          <img src={filaImage} style={swiperImageStyles} />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyles}>
          <img src={nbImage} style={swiperImageStyles} />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default MyCarousel;
