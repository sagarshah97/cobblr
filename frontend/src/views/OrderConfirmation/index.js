import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ShoeCard from "./ShoeCard";
import InvoiceCard from "./InvoiceCard";
import Footer from "../HomePage/Footer";

import image1 from "../../assets/images/ProductListing/image1.jpeg";
import image2 from "../../assets/images/ProductListing/image2.jpeg";

const OrderConfirmationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Replace the following data with actual order details
  const order = {
    orderId: "1234",
    invoiceNumber: "INV123456",
    date: "2023-06-29",
    address: "660 francklyn Street",
    phone: "1234567890",
    items: [
      {
        id: 1,
        name: "Shoe 1",
        image: image1,
        quantity: 2,
        size: "9",
        price: 50.99,
        total: 101.98,
      },
      {
        id: 2,
        name: "Shoe 2",
        image: image2,
        quantity: 1,
        size: "8",
        price: 69.99,
        total: 69.99,
      },
      {
        id: 3,
        name: "Shoe 3",
        image: image1,
        quantity: 2,
        size: "9",
        price: 50.99,
        total: 101.98,
      },
      {
        id: 4,
        name: "Shoe 4",
        image: image1,
        quantity: 2,
        size: "9",
        price: 50.99,
        total: 101.98,
      },
      {
        id: 5,
        name: "Shoe 5",
        image: image1,
        quantity: 2,
        size: "9",
        price: 50.99,
        total: 101.98,
      },
      {
        id: 6,
        name: "Shoe 6",
        image: image1,
        quantity: 2,
        size: "9",
        price: 50.99,
        total: 101.98,
      },
    ],
    subtotal: 171.97,
    tax: 10.32,
    total: 182.29,
  };

  // const handleDownloadInvoice = () => {
  //   console.log("invoice Downloaded");
  // };
  const naigateToMyOrders = () => {
    console.log("invoice Downloaded");
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
              Order ID: {order.orderId}
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
                {order.items.map((item) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={item.id}>
                    <ShoeCard item={item} shoeCardHeight={shoeCardHeight} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              <InvoiceCard
                order={order}
                // handleDownloadInvoice={handleDownloadInvoice}
              />
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
                onClick={naigateToMyOrders}
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
