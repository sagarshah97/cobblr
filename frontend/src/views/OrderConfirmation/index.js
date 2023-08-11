//Author: Ashish Ojha (B00931967)
import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, Divider } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ShoeCard from "./ShoeCard";
import InvoiceCard from "./InvoiceCard";
import Footer from "../HomePage/Footer";

const OrderConfirmationPage = () => {
  const isLoggedIn = window.sessionStorage.getItem("userId") ? true : false;
  const navigate = useNavigate();
  const { _id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = window.sessionStorage.getItem("token");

  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            `/orders/getorder?_id=${_id ? _id : "64b19b874d5883d09edec9de"}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          const data = response.data;
          setOrderDetails(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error retrieving order:", error);
      }
    };
    getOrderDetails();
  }, [_id]);
  const navigateToMyOrders = () => {
    navigate("/orders");
  };

  const shoeCardHeight = isMobile ? 150 : 250;

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
              Order ID: {orderDetails?._id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={navigateToMyOrders}
                sx={{ marginBottom: "8px" }}
              >
                My Orders
              </Button>
            </div>
            <Divider
              variant="middle"
              sx={{
                backgroundColor: "white",
                marginBottom: "16px",
                marginTop: "16px",
              }}
            />
          </Grid>
          <Grid
            container
            spacing={2}
            paddingLeft={6}
            paddingRight={6}
            paddingTop={2}
            justifyItems={"center"}
          >
            <Grid item xs={12} md={8} lg={8} xl={8}>
              <Grid container spacing={2} justifyContent="flex-start">
                {orderDetails?.items?.map((item) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} key={item._id}>
                    <ShoeCard item={item} shoeCardHeight={shoeCardHeight} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4} marginBottom={2}>
              <InvoiceCard orderDetails={orderDetails} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
