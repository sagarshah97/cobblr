import { React, useState } from "react";
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import "../../App.css";

import r1 from "../../assets/images/ProductDetail/1.jpg";
import r2 from "../../assets/images/ProductDetail/2.jpg";
import r3 from "../../assets/images/ProductDetail/3.jpg";
import r4 from "../../assets/images/ProductDetail/4.jpg";
import r5 from "../../assets/images/ProductDetail/5.jpg";

const SimilarProducts = () => {
  const recommImages = [r1, r2, r3, r4, r5];
  const similarProducts = [
    {
      id: 2,
      code: "DR00-0-002",
      name: "Nike Go FlyEase",
      subText: "Easy On/Off Shoes",
      price: "$123",
      image: r1,
    },
    {
      id: 3,
      code: "DR00-0-003",
      name: "Nike Go FlyEase",
      subText: "Easy On/Off Shoes",
      price: "$123",
      image: r2,
    },
    {
      id: 4,
      code: "DR00-0-004",
      name: "Nike Go FlyEase",
      subText: "Easy On/Off Shoes",
      price: "$123",
      image: r3,
    },
    {
      id: 5,
      code: "DR00-0-005",
      name: "Nike Go FlyEase",
      subText: "Easy On/Off Shoes",
      price: "$123",
      image: r4,
    },
    {
      id: 6,
      code: "DR00-0-005",
      name: "Nike Go FlyEase",
      subText: "Easy On/Off Shoes",
      price: "$123",
      image: r5,
    },
  ];

  const handleClick = (shoeId) => {
    window.alert("You clicked " + shoeId + "!");
  };

  return (
    <>
      <div
        style={{
          marginTop: "5%",
          marginLeft: "3%",
          color: "white",
          fontSize: "xx-large",
          fontWeight: "200",
        }}
      >
        You might also like
      </div>
      <div style={{ paddingBottom: "5%" }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          style={{ padding: "1%", marginTop: "2%" }}
        >
          {similarProducts.map((shoe) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ paddingLeft: "2%" }}
            >
              <Card
                className="card-hover"
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
                onClick={() => {
                  handleClick(shoe.id);
                }}
              >
                <div class="image-container">
                  <img
                    variant="top"
                    src={shoe.image}
                    className="image"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
                <Typography
                  style={{
                    backgroundColor: "#0f0f0f",
                    color: "white",
                    paddingLeft: "0",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "x-large",
                      paddingTop: "2%",
                    }}
                  >
                    {shoe.name}
                  </Typography>
                  <Typography
                    style={{ paddingBottom: "5%", fontWeight: "200" }}
                  >
                    {shoe.subText}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "large",
                      paddingBottom: "5%",
                    }}
                  >
                    {shoe.price}
                  </Typography>
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default SimilarProducts;
