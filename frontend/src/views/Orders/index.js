// Author: Pratik Mukund Parmar (B00934515)

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Modal,
  Box,
  Rating,
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
import Footer from "../HomePage/Footer";

import StarIcon from "@mui/icons-material/Star";

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [currentReview, setCurrentReview] = useState(null);
  const [currentShoeId, setCurrentShoeId] = useState(null);
  const navigate = useNavigate();
  const id = window.sessionStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      if (!id) {
        navigate("/login");
        return;
      }
      const response = await axios.get("/orderhistory/getOrders");
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

  const renderItemImage = (items) => {
    if (items.images && items.images.data) {
      return (
        <img
          variant="top"
          src={"data:image/png;base64," + items.images.data}
          alt={items.images.name}
          height="120px"
          width="100px"
          style={{
            borderRadius: "10px",
            backgroundColor: "transparent",
            marginRight: "3%",
          }}
        />
      );
    } else {
      return (
        <img
          variant="top"
          src="placeholder-image-url.png"
          alt="Loading..."
          height="120px"
          width="120px"
          style={{
            borderRadius: "10px",
            backgroundColor: "transparent",
            marginRight: "3%",
          }}
        />
      );
    }
  };

  const handleOrderClick = (order, source) => {
    setSelectedOrder(order);
    setOrderSource(source);
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for Order ID: ${orderId}`);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setOrderSource(null);
  };

  const handleWriteReview = (item) => {
    const shoeID = item.shoeId;
    setCurrentShoeId(item.shoeId);

    axios
      .post(`/reviews/getReviewsByShoeIdUserId`, {
        postedBy: id,
        shoeId: shoeID,
      })
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.data && resp.data.length > 0) {
            setCurrentReview(resp.data[0]);
            setFeedback(resp.data[0].comment);
            setSelectedRating(resp.data[0].rating);
            setOpenModal(true);
          } else {
            setFeedback("");
            setSelectedRating(5);
            setOpenModal(true);
          }
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
      });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedRating(0);
    setFeedback("");
  };

  const handleModalButtonClick = async (action) => {
    if (action === "Submit") {
      try {
        const response = await axios.post("/reviews/addReview", {
          shoeId: currentShoeId,
          rating: selectedRating,
          comment: feedback,
          postedBy: window.sessionStorage.getItem("userId"),
        });

        setOpenModal(false);
      } catch (error) {
        console.log("Error adding review:", error);
      }
    }

    handleModalClose();
  };

  const currentDate = new Date();
  const previousOrders = orders.previousOrders || [];
  const currentOrders = orders.currentOrders || [];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={2}
          style={{ padding: "20px", minHeight: "100vh" }}
        >
          <Grid item xs={12} md={6} sm={12}>
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
                            {renderItemImage(item)}
                            <ListItemText
                              primary={item.name}
                              secondary={`Size: ${item.size}, Quantity: ${item.quantity}, Price: $${item.price}`}
                            />

                            {orderSource === "previous" && (
                              <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<ReviewIcon />}
                                onClick={() => handleWriteReview(item)}
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

          {openModal && (
            <>
              <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "black",
                    border: "1px solid white",
                    color: "white",
                    boxShadow: 24,
                    p: 4,
                    outline: "none",
                    width: "80%",
                    height: "40%",
                    maxWidth: "600px",
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Rating:{" "}
                    <Rating
                      value={selectedRating}
                      onChange={(event, newValue) =>
                        setSelectedRating(newValue)
                      }
                      emptyIcon={
                        <StarIcon
                          sx={{
                            color: "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      }
                    />
                  </Typography>
                  <Typography variant="h6" component="h2" mt={2}>
                    Feedback:{" "}
                  </Typography>

                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{
                      marginBottom: "10px",
                      resize: "none",
                    }}
                    rows={10}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleModalButtonClick("Submit")}
                      style={{ marginRight: "10px" }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleModalClose()}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </>
          )}
        </Grid>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default Orders;
