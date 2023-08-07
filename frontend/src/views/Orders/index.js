import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
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
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const id = window.sessionStorage.getItem("userId");

  // Move fetchOrders outside of the useEffect hook
  const fetchOrders = async () => {
    try {
      // Make a GET request to fetch orders from the backend
      const response = await axios.post("/orders/getOrders", {
        userId: id,
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrders();
    } else {
      navigate("/login");
    }
  }, [id, navigate]); // Add id and navigate to the dependency array

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleDownloadInvoice = (orderId) => {
    // Placeholder implementation for downloading invoice
    console.log(`Downloading invoice for Order ID: ${orderId}`);
  };

  const handleWriteReview = (orderId) => {
    // Placeholder implementation for writing a review
    console.log(`Writing a review for Order ID: ${orderId}`);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  const currentDate = new Date();
  const previousOrders = orders.filter(
    (order) => new Date(order.deliveryDate) < currentDate
  );
  const currentOrders = orders.filter(
    (order) => new Date(order.deliveryDate) >= currentDate
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {/* Current Orders */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* Card header */}
            <CardHeader title="Current Orders" />
            {/* Card content */}
            <CardContent>
              {/* Orders list */}
              {currentOrders.length === 0 ? (
                <Typography variant="body1" className="empty-orders-message">
                  You have no current orders.
                </Typography>
              ) : (
                <List>
                  {currentOrders.map((order) => (
                    <ListItem
                      key={order.id}
                      button
                      onClick={() => handleOrderClick(order)}
                    >
                      {/* Order avatar */}
                      <ListItemAvatar>
                        <Avatar src={order.shoeImage} alt={order.shoeName} />
                      </ListItemAvatar>
                      {/* Order details */}
                      <ListItemText
                        primary={order.shoeName}
                        secondary={`Size: ${order.size}, Quantity: ${order.quantity}`}
                        primaryTypographyProps={{ variant: "h6" }}
                        secondaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Previous Orders */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* Card header */}
            <CardHeader title="Previous Orders" />
            {/* Card content */}
            <CardContent>
              {/* Orders list */}
              {previousOrders.length === 0 ? (
                <Typography variant="body1" className="empty-orders-message">
                  You have no previous orders.
                </Typography>
              ) : (
                <List>
                  {previousOrders.map((order) => (
                    <ListItem
                      key={order.id}
                      button
                      onClick={() => handleOrderClick(order)}
                    >
                      {/* Order avatar */}
                      <ListItemAvatar>
                        <Avatar src={order.shoeImage} alt={order.shoeName} />
                      </ListItemAvatar>
                      {/* Order details */}
                      <ListItemText
                        primary={order.shoeName}
                        secondary={`Size: ${order.size}, Quantity: ${order.quantity}`}
                        primaryTypographyProps={{ variant: "h6" }}
                        secondaryTypographyProps={{ variant: "body2" }}
                      />
                      {/* Action buttons */}
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadInvoice(order.id)}
                        sx={{ color: "#fff", border: 0 }}
                      >
                        Invoice
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ReviewIcon />}
                        onClick={() => handleWriteReview(order.id)}
                        sx={{ color: "#fff", border: 0 }}
                      >
                        Review
                      </Button>
                    </ListItem>
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
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                      {selectedOrder.shoeName}
                    </Typography>
                    <Avatar
                      src={selectedOrder.shoeImage}
                      alt={selectedOrder.shoeName}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      Size: {selectedOrder.size}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {selectedOrder.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Delivery Date: {selectedOrder.deliveryDate}
                    </Typography>
                    <Typography variant="body2">
                      Delivery Address: {selectedOrder.address}
                    </Typography>
                    <Typography variant="body2">
                      Price: ${selectedOrder.price}
                    </Typography>
                    <Typography variant="body2">
                      Ordered Date: {selectedOrder.orderedDate}
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
