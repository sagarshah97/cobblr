// Author: Pratik Mukund Parmar (B00934515)

//Feature 2 under construction

import React from "react";
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

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Orders = () => {
  const orders = [
    {
      id: 1,
      shoeName: "Nike Air Max",
      shoeImage: "nike-air-max.jpg",
      size: "10",
      quantity: 2,
      deliveryDate: "2023-08-15",
      address: "123 Shoe Street, City",
      price: 199.99,
      orderedDate: "2023-08-01",
    },
    {
      id: 2,
      shoeName: "Adidas Ultraboost",
      shoeImage: "adidas-ultraboost.jpg",
      size: "9",
      quantity: 1,
      deliveryDate: "2023-08-10",
      address: "456 Sneaker Avenue, Town",
      price: 149.99,
      orderedDate: "2023-08-02",
    },
  ];

  const [selectedOrder, setSelectedOrder] = React.useState(null);

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
              {orders.length === 0 ? (
                <Typography variant="body1" className="empty-orders-message">
                  You have no current orders.
                </Typography>
              ) : (
                <List>
                  {orders.map((order) => (
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
              {orders.length === 0 ? (
                <Typography variant="body1" className="empty-orders-message">
                  You have no previous orders.
                </Typography>
              ) : (
                <List>
                  {orders.map((order) => (
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
