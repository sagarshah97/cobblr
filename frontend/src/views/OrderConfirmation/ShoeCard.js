//Author: Ashish Ojha (B00931967)
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ShoeCard = ({ item, shoeCardHeight }) => {
  return (
    <Card sx={{ display: "flex", height: "100%", width: "100%" }}>
      <CardMedia
        component="img"
        height={shoeCardHeight}
        src={`data:image/jpeg;base64, ${item.images.data}`}
        alt={item.images.name}
        sx={{
          objectFit: "cover",
          width: "39%",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
        }}
      />
      <CardContent sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: { xs: "20px", md: "22px" } }}
        >
          <strong>{item.name}</strong>
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: { xs: "18px", md: "20px" }, marginBottom: "8px" }}
        >
          <strong>Quantity:</strong> {item.quantity}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: { xs: "18px", md: "20px" } }}
        >
          <strong>Size:</strong> {item.size}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: { xs: "18px", md: "20px" } }}
        >
          <strong>Price:</strong> ${item.price}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: { xs: "18px", md: "20px" } }}
        >
          {item.subText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShoeCard;
