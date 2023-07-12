import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const ShoeCard = ({ shoe, height }) => {
  const handleClick = () => {
    console.log(shoe.name);
  };

  return (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height={height} // Use the height value passed from the parent component
        src={`data:image/jpeg;base64, ${shoe.images[0].data}`}
        alt={shoe.name}
        sx={{ padding: "1em 1em 0 1em"}}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h7"
            component="div"
            sx={{ fontSize: { xs: "18px", md: "20px" } }}
          >
            {shoe.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: { xs: "16px", md: "18px" } }}
            >
              ${shoe.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShoeCard;
