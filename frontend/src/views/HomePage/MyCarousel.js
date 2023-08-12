// // Author: Sahil Dilip Dalvi (B00939343)
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import Adidas from "../../assets/images/Home/adi.png";
import Nike from "../../assets/images/Home/nikenew-removebg-preview.png";
import filaImage from "../../assets/images/Home/fila.png";
import Puma from "../../assets/images/Home/Puma_logo-removebg-preview.png";
import underImage from "../../assets/images/Home/under.png";
import vansImage from "../../assets/images/Home/vans.png";
import nbImage from "../../assets/images/Home/nb.png";
import Reebok from "../../assets/images/Home/Reebok.png";
import sketchers from "../../assets/images/Home/sketchers.png";

const imageImports = {
  Adidas,
  Nike,
  filaImage,
  Puma,
  underImage,
  vansImage,
  nbImage,
  Reebok,
  sketchers,
};

const MyCarousel = () => {
  const navigate = useNavigate();
  const [brandNames, setBrandNames] = useState([]);
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

  useEffect(() => {
    axios.get("/brandname/brands").then((response) => {
      setBrandNames(response.data);
    });
  }, []);

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
        className="mySwiper"
        style={swiperStyles}
        initialSlide={2}
      >
        {brandNames.map((brandName, index) => {
          const ImageComponent = imageImports[brandName];
          if (ImageComponent) {
            return (
              <SwiperSlide style={swiperSlideStyles} key={index}>
                <img
                  src={ImageComponent}
                  style={swiperImageStyles}
                  alt={brandName}
                  onClick={() =>
                    navigate(`/productlisting/${brandName.toLowerCase()}`)
                  }
                />
              </SwiperSlide>
            );
          }
          return null;
        })}
      </Swiper>
    </>
  );
};

export default MyCarousel;
