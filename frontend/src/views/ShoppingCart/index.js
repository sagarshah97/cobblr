// Author: Pratik Mukund Parmar (B00934515)

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Modal,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { Alerts } from "../../utils/Alert";
import Footer from "../HomePage/Footer";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
  },
});

const Cart = () => {
  const [items, setItems] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const id = window.sessionStorage.getItem("userId");
  useEffect(() => {
    if (id) {
      fetchCartItems()
        .then((data) => {
          setItems(data);
          const subtotal = calculatesubtotal(data);
          const tax = parseFloat((subtotal * 0.15).toFixed(2));
          const total = subtotal + tax;
          updateCartTotals(subtotal, tax, total);
        })
        .catch((error) => console.error(error));
    } else {
      navigate("/login");
    }
  }, []);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType,
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };

  const calculatesubtotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      subtotal += itemPrice;
    });
    return subtotal;
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.post("/cart/getCart", {
        userId: id,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to fetch cart items");
    }
  };

  const updateCartTotals = async (subtotal, tax, total) => {
    try {
      const body = {
        userId: id,
        subtotal,
        tax,
        total,
      };
      await axios.post("/cart/updateCartTotals", body);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItemQuantity = async (index, newQuantity) => {
    try {
      if (newQuantity >= 0 && newQuantity <= 5) {
        const updatedItems = [...items];
        updatedItems[index].quantity = newQuantity;
        setItems(updatedItems);
        if (newQuantity === 0) {
          setItemToRemove(index);
          setShowConfirmationModal(true);
        }

        await updateCartItemQuantityInBackend(updatedItems[index]);
      } else if (newQuantity > 5) {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItemQuantityInBackend = async (item) => {
    try {
      const body = {
        userId: id,
        cartItemId: item._id,
        quantity: item.quantity,
        size: item.size,
      };
      await axios.post("/cart/updateCartItemQuantity", body);
    } catch (error) {
      throw new Error("Unable to update cart item quantity");
    }
  };

  const removeCartItem = async () => {
    try {
      if (itemToRemove !== null) {
        const updatedItems = [...items];
        updatedItems.splice(itemToRemove, 1);
        setItems(updatedItems);
        setAlertMessage("Product successfully removed from the cart!");
        setAlertType("success");
        snackbarOpen();

        await removeCartItemFromBackend(items[itemToRemove]);
      }
      setShowConfirmationModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCartItemFromBackend = async (item) => {
    try {
      const body = {
        userId: id,
        cartItemId: item._id,
        quantity: item.quantity,
        size: item.size,
      };
      await axios.post("/cart/removeCartItem", body);
    } catch (error) {
      throw new Error("Unable to remove cart item");
    }
  };

  const cancelRemoveCartItem = () => {
    setShowConfirmationModal(false);
    if (itemToRemove !== null) {
      const updatedItems = [...items];
      if (updatedItems[itemToRemove].quantity === 0) {
        updatedItems[itemToRemove].quantity = 1;
      }
      setItems(updatedItems);
      setItemToRemove(null);
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      subtotal += itemPrice;
    });
    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 0;
    const taxes = parseFloat((subtotal * 0.15).toFixed(2));
    const total = subtotal + deliveryFee + taxes;
    return total;
  };

  const handleCheckout = () => {
    navigate("/billing");
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={2}
          style={{
            padding: "3%",
            minHeight: "100vh",
          }}
        >
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Card>
              <CardHeader title="Cart" />

              <CardContent>
                {items.length === 0 ? (
                  <Typography variant="body1" className="empty-cart-message">
                    Your cart is empty.
                  </Typography>
                ) : (
                  <List>
                    {items.map((item, index) => (
                      <ListItem key={index}>
                        <img
                          variant="top"
                          src={"data:image/png;base64," + item.images.data}
                          alt={item.images.name}
                          height="120px"
                          width="120px"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "transparent",
                            marginRight: "3%",
                          }}
                        />

                        <ListItemText
                          primary={item.name}
                          secondary={`${item.size}`}
                          primaryTypographyProps={{ variant: "h6" }}
                          secondaryTypographyProps={{
                            variant: "body2",
                          }}
                          style={{ width: "250px" }}
                        />

                        <Grid
                          container
                          alignItems="center"
                          style={{ marginLeft: "2%" }}
                        >
                          <Typography
                            variant="body1"
                            style={{ paddingRight: "10px" }}
                          >
                            Quantity: {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              updateCartItemQuantity(index, item.quantity - 1)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              updateCartItemQuantity(index, item.quantity + 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              setItemToRemove(index);
                              setShowConfirmationModal(true);
                            }}
                            style={{
                              marginLeft: "10px",
                              color: "white",
                              borderColor: "grey",
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>

                        <Typography variant="body1" className="item-price">
                          ${item.price * item.quantity}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardHeader title="Invoice Summary" />

              <CardContent>
                {items.length > 0 ? (
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem" }}
                      >
                        Subtotal:
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem" }}
                      >
                        Delivery Fee:
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem" }}
                      >
                        Taxes:
                      </Typography>
                      <hr />
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem" }}
                      >
                        Total:
                      </Typography>
                      <hr />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem", textAlign: "right" }}
                      >
                        ${calculateSubtotal()}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem", textAlign: "right" }}
                      >
                        Free
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem", textAlign: "right" }}
                      >
                        ${(calculateSubtotal() * 0.15).toFixed(2)}
                      </Typography>
                      <hr />
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "1rem", textAlign: "right" }}
                      >
                        ${calculateTotal()}
                      </Typography>
                      <hr />
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body1" className="empty-summary-text">
                    No items in cart.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Modal
          open={showConfirmationModal}
          onClose={cancelRemoveCartItem}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          BackdropProps={{
            onClick: handleBackdropClick,
          }}
        >
          <Paper
            style={{
              backgroundColor: "#000",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              padding: "2%",
              margin: "4%",
              width: "30rem",
            }}
          >
            <Typography
              variant="h2"
              style={{
                paddingBottom: "8%",
                paddingLeft: "2%",
                paddingRight: "2%",
                paddingTop: "3%",
                fontSize: "1.5rem",
                fontWeight: 200,
              }}
            >
              Remove Item
            </Typography>
            <Typography
              variant="body1"
              style={{
                paddingBottom: "10%",
                paddingLeft: "2%",
                paddingRight: "2%",
                fontSize: "1rem",
                fontWeight: 200,
              }}
            >
              Are you sure you want to remove this shoe from the cart?
            </Typography>
            <Grid
              container
              spacing={1}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginTop: "16px" }}
                  onClick={removeCartItem}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "16px" }}
                  onClick={cancelRemoveCartItem}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>

        <Modal
          open={showErrorModal}
          onClose={closeErrorModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          BackdropProps={{
            onClick: handleBackdropClick,
          }}
        >
          <Paper
            style={{
              backgroundColor: "#000",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              padding: "2%",
              margin: "4%",
              width: "30rem",
            }}
          >
            <Typography
              variant="h2"
              style={{
                paddingBottom: "8%",
                paddingLeft: "2%",
                paddingRight: "2%",
                paddingTop: "3%",
                fontSize: "1.5rem",
                fontWeight: 200,
              }}
            >
              Sorry!
            </Typography>
            <Typography
              variant="body1"
              style={{
                paddingBottom: "10%",
                paddingLeft: "2%",
                paddingRight: "2%",
                fontSize: "1rem",
                fontWeight: 200,
              }}
            >
              You cannot add any more shoes of the same type.
            </Typography>
            <Grid
              container
              spacing={1}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "16px" }}
                  onClick={closeErrorModal}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </ThemeProvider>
      {snackbar && (
        <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />
      )}
      <Footer />
    </>
  );
};

export default Cart;
