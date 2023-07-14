import { React, useState, useEffect } from "react";
import { Typography, Grid, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ShoeCard from "./ShoeCard";
import InvoiceCard from "./InvoiceCard";
import Footer from "../HomePage/Footer";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    console.log("id is:", _id);
    const getOrderDetails = async () => {
      try {
        const response = await axios.get(
          `/orders/getorder?_id=${_id ? _id : "64b19b874d5883d09edec9de"}`
        );
        const data = response.data;
        setOrderDetails(data);
      } catch (error) {
        console.error("Error retrieving order:", error);
      }
    };
    getOrderDetails();
  }, [_id]);

  const navigateToMyOrders = () => {
    navigate("/myorders");
  };

  const shoeCardHeight = isMobile ? 100 : 200;

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <CheckCircleOutlineIcon
                style={{ color: "green", fontSize: "64px" }}
              />
            </div>
            <Typography variant="h4" color="white" align="center">
              Order Placed Successfully
            </Typography>
            <Typography variant="subtitle1" color="white" align="center">
              Order ID: {orderDetails?.orderId}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            paddingLeft={6}
            paddingRight={6}
            paddingTop={6}
          >
            <Grid item xs={12} md={8} lg={8} xl={8}>
              <Grid container spacing={2} justifyContent="flex-start">
                {orderDetails?.items.map((item) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={item.id}>
                    <ShoeCard item={item} shoeCardHeight={shoeCardHeight} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <InvoiceCard orderDetails={orderDetails} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={navigateToMyOrders}
                sx={{ marginBottom: "8px" }}
              >
                My Orders
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
