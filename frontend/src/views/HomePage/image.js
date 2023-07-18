import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import logo from "../../assets/images/Home/COBBLR.png";

const ParallaxImage = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const parallaxElement = parallaxRef.current;

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Adjust the parallax effect speed as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{ position: "relative", overflow: "hidden", marginBottom: "40px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          ref={parallaxRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translateY(0)",
            transition: "transform 0.5s ease-out", // Adjust the transition speed as needed
          }}
          src={logo}
          alt="Parallax Image"
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          textAlign: "center",
          paddingTop: "80px",
        }}
      >
        {/* <Typography variant="h4"> Welcome to Cobblr</Typography> */}
        {/* Content or additional elements */}
      </div>
    </div>
  );
};

export default ParallaxImage;
