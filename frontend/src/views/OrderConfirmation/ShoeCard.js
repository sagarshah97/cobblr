import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const ShoeCard = ({ item, shoeCardHeight }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height={shoeCardHeight} // Adjust the height value as needed
        src={`data:image/jpeg;base64, ${item.image}`}
        alt={item.name}
        sx={{ objectFit: "cover" }} // Ensure the image scales down to fit the card
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            //alignItems: "",
          }}
        >
          <Typography
            variant="h7"
            component="div"
            sx={{ fontSize: { xs: "16px", md: "18px" } }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="h8"
            component="div"
            sx={{ fontSize: { xs: "14px", md: "16px" } }}
          >
            Quantity: {item.quantity}
          </Typography>
          <Typography
            variant="h8"
            component="div"
            sx={{ fontSize: { xs: "14px", md: "16px" } }}
          >
            Size: {item.size}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShoeCard;
