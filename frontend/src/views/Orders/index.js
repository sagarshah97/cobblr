// Author: Pratik Mukund Parmar (B00934515)

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  CloudDownload as DownloadIcon,
  RateReview as ReviewIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Orders = () => {
  const [orders, setOrders] = useState({
    previousOrders: [],
    currentOrders: [],
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSource, setOrderSource] = useState(null);
  const navigate = useNavigate();
  const id = window.sessionStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      if (!id) {
        navigate("/login");
        return;
      }
      const response = await axios.get("/orders");
      const allOrders = response.data.orders;

      const currentDate = new Date();

      const previousOrders = allOrders.filter(
        (order) =>
          new Date(order.expectedDeliveryDate) < currentDate &&
          order.userId === id.toString()
      );
      const currentOrders = allOrders.filter(
        (order) =>
          new Date(order.expectedDeliveryDate) >= currentDate &&
          order.userId === id.toString()
      );

      setOrders({ previousOrders, currentOrders });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderClick = (order, source) => {
    setSelectedOrder(order);
    setOrderSource(source);
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for Order ID: ${orderId}`);
  };

  const handleWriteReview = (orderId) => {
    console.log(`Writing a review for Order ID: ${orderId}`);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setOrderSource(null);
  };

  const currentDate = new Date();
  const previousOrders = orders.previousOrders || [];
  const currentOrders = orders.currentOrders || [];

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {/* Current Orders */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Current Orders" />

            <CardContent>
              {currentOrders.length === 0 ? (
                <Typography variant="body1" className="empty-orders-message">
                  You have no current orders.
                </Typography>
              ) : (
                <List>
                  {currentOrders.map((order) => (
                    <React.Fragment key={order._id}>
                      <ListItem
                        button
                        onClick={() => handleOrderClick(order, "current")}
                      >
                        <ListItemText
                          primary={"Order ID: " + order.invoiceNumber}
                          secondary={`Expected Delivery Date: ${order.expectedDeliveryDate}`}
                          primaryTypographyProps={{ variant: "h6" }}
                          secondaryTypographyProps={{ variant: "body2" }}
                        />

                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDownloadInvoice(order._id)}
                          sx={{ color: "#fff", border: 0 }}
                        >
                          Invoice
                        </Button>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Previous Orders */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Previous Orders" />

            <CardContent>
              {previousOrders.length === 0 ? (
                <Typography variant="body1" className="empty-orders-message">
                  You have no previous orders.
                </Typography>
              ) : (
                <List>
                  {previousOrders.map((order) => (
                    <React.Fragment key={order._id}>
                      <ListItem
                        button
                        onClick={() => handleOrderClick(order, "previous")}
                      >
                        <ListItemText
                          primary={"Order ID: " + order.invoiceNumber}
                          secondary={`Delivery Date: ${order.expectedDeliveryDate}`}
                          primaryTypographyProps={{ variant: "h6" }}
                          secondaryTypographyProps={{ variant: "body2" }}
                        />

                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDownloadInvoice(order._id)}
                          sx={{ color: "#fff", border: 0 }}
                        >
                          Invoice
                        </Button>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Details Dialog */}
        <Dialog open={selectedOrder !== null} onClose={handleCloseDialog}>
          {selectedOrder && (
            <>
              <DialogTitle>Order Details</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Invoice Number: {selectedOrder.invoiceNumber}
                    </Typography>
                    <Typography variant="body1">
                      Order Date: {selectedOrder.date} {selectedOrder.time}
                    </Typography>
                    <Typography variant="body1">
                      Delivery Address: {selectedOrder.address}
                    </Typography>
                    <Typography variant="body1">
                      Phone: {selectedOrder.phone}
                    </Typography>
                    <Typography variant="body1">
                      Email: {selectedOrder.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Order Items:</Typography>
                    <List>
                      {selectedOrder.items.map((item) => (
                        <ListItem key={item._id}>
                          <ListItemText
                            primary={item.name}
                            secondary={`Size: ${item.size}, Quantity: ${item.quantity}, Price: $${item.price}`}
                          />

                          {orderSource === "previous" && (
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<ReviewIcon />}
                              onClick={() => handleWriteReview(item._id)}
                              sx={{ color: "#fff", border: 0 }}
                            >
                              Review
                            </Button>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Order Summary:</Typography>
                    <Typography variant="body1">
                      Subtotal: ${selectedOrder.subtotal}
                    </Typography>
                    <Typography variant="body1">
                      Tax: ${selectedOrder.tax}
                    </Typography>
                    <Typography variant="body1">
                      Total: ${selectedOrder.total}
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
};

export default Orders;
