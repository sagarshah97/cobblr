// Author: Sahil Dilip Dalvi (B00939343)
import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import footballImage from "../../assets/images/Home/running-shoes-event_1454-784-removebg-preview.png";
import basketballImage from "../../assets/images/Home/fila.png";
import runningImage from "../../assets/images/Home/lifes.png";
import tennisImage from "../../assets/images/Home/gyms.png";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "400px",
    margin: "10px",
    borderRadius: "0",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "calc(100% - 40px)",
    objectFit: "cover",
  },
  cardText: {
    padding: "10px",
    backgroundColor: "#0f0f0f",
    color: "white",
    textAlign: "center",
  },
};

const ShopBySportCarousel = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const sportCategories = [
    { id: 1, image: footballImage, name: "Running" },
    { id: 2, image: runningImage, name: "Lifestyle" },
    { id: 3, image: tennisImage, name: "Training" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            paddingLeft: "20px",
            marginTop: "20px",
            color: "white",
            marginBottom: "0px",
            fontWeight: "100",
            fontSize: "2rem",
            letterSpacing: "0.7rem",
          }}
        >
          SHOP BY CATEGORIES
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {sportCategories.map((category) => (
            <Grid
              key={category.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                style={styles.card}
                sx={{
                  backgroundColor: "transparent",
                  flexDirection: isMobile ? "column" : "row",
                }}
                onClick={() =>
                  navigate(`/productlisting/${category.name.toLowerCase()}`)
                }
              >
                <CardMedia
                  style={styles.cardImage}
                  component="img"
                  alt={`Sport Category: ${category.name}`}
                  src={category.image}
                />
                <Typography
                  variant="subtitle1"
                  component="div"
                  style={styles.cardText}
                >
                  {category.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShopBySportCarousel;
