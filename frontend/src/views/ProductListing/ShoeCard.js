import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ShoeCard = ({ shoe, height }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClick = () => {
    navigate(`/productDetail/${shoe._id}`);
    //navigate("/orderconfirmation/64b19b874d5883d09edec9de");
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const MAX_NAME_LENGTH = isSmallScreen ? 4 : isMediumScreen ? 12 : 19;
  //shoe.name = "This is a long shoe name";
  const truncatedName =
    shoe.name.length > MAX_NAME_LENGTH
      ? shoe.name.slice(0, MAX_NAME_LENGTH) + "..."
      : shoe.name;
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
        height={height}
        src={`data:image/jpeg;base64, ${shoe.images[0].data}`}
        alt={shoe.name}
        sx={{ padding: "1em 1em 0 1em" }}
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
            sx={{ fontSize: { xs: "18px", md: "20px", marginRight: "2px" } }}
          >
            {truncatedName}
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
