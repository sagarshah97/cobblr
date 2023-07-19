import React, { useState } from 'react';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Modal,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
  },
});

const Cart = () => {
  const [items, setItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const addItem = (item) => {
    if (item.quantity < 5 || items.length === 0) {
      setItems([...items, item]);
    } else {
      setShowErrorModal(true);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= 5) {
      const updatedItems = [...items];
      updatedItems[index].quantity = newQuantity;
      setItems(updatedItems);
      if (newQuantity === 0) {
        setItemToRemove(index);
        setShowConfirmationModal(true);
      }
    } else if (newQuantity > 5) {
      setShowErrorModal(true);
    }
  };

  const removeItem = () => {
    if (itemToRemove !== null) {
      const updatedItems = [...items];
      updatedItems.splice(itemToRemove, 1);
      setItems(updatedItems);
      setItemToRemove(null);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
    setShowConfirmationModal(false);
  };

  const cancelRemoveItem = () => {
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
    const taxes = subtotal * 0.15;
    const total = subtotal + deliveryFee + taxes;
    return total;
  };

  const handleCheckout = () => {
    // Logic for handling checkout
    alert('Proceeding to checkout.');
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {/* Cart items */}
        <Grid item xs={12} md={6}>
          <Card>
            {/* Card header */}
            <CardHeader title="Cart" />
            {/* Card content */}
            <CardContent>
              {/* Cart items list */}
              {items.length === 0 ? (
                <Typography variant="body1" className="empty-cart-message">
                  Your cart is empty.
                </Typography>
              ) : (
                <List>
                  {items.map((item, index) => (
                    <ListItem key={index}>
                      {/* Item avatar */}
                      <ListItemAvatar>
                        <Avatar src={item.image} alt={item.name} />
                      </ListItemAvatar>
                      {/* Item details */}
                      <ListItemText
                        primary={item.name}
                        secondary={`Size: ${item.size}`}
                        primaryTypographyProps={{ variant: 'h6' }}
                        secondaryTypographyProps={{ variant: 'body2' }}
                      />
                      {/* Quantity and remove buttons */}
                      <Grid container alignItems="center">
                        <Typography variant="body1">Quantity: {item.quantity}</Typography>
                        <IconButton
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={showConfirmationModal}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          disabled={showConfirmationModal}
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
                          disabled={showConfirmationModal}
                          style={{ color: '#fff' }}
                        >
                          Remove
                        </Button>
                      </Grid>
                      {/* Item price */}
                      <Typography variant="body1" className="item-price">
                        ${item.price * item.quantity}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}

              {/* Add item button */}
              <Button
                className="add-item-button"
                variant="contained"
                color="primary"
                onClick={() =>
                  addItem({ name: 'Shoe', price: 100, quantity: 1, image: 'shoe.png', size: 'US 8' })
                }
                disabled={showConfirmationModal}
              >
                Add Item
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Invoice summary */}
        <Grid item xs={6} md={6}>
          <Card>
            {/* Card header */}
            <CardHeader title="Invoice Summary" />
            {/* Card content */}
            <CardContent>
              {/* Summary content */}
              {items.length > 0 ? (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                      Delivery Fee:
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                      Taxes:
                    </Typography>
                    <hr />
                    <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                      Total:
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" style={{ marginBottom: '1rem', textAlign: 'right' }}>
                      ${calculateSubtotal()}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '1rem', textAlign: 'right' }}>
                      Free
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '1rem', textAlign: 'right' }}>
                      ${calculateSubtotal() * 0.15}
                    </Typography>
                    <hr />
                    <Typography variant="body1" style={{ marginBottom: '1rem', textAlign: 'right' }}>
                      ${calculateTotal()}
                    </Typography>
                    <hr />
                    <br />
                    <Button
                      className="checkout-button"
                      variant="contained"
                      color="primary"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
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

      {/* Confirmation modal */}
      <Modal
        open={showConfirmationModal}
        onClose={cancelRemoveItem}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        BackdropProps={{
          onClick: handleBackdropClick,
        }}
      >
        <Paper
          style={{
            backgroundColor: '#000',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            padding: '2%',
            margin: '4%',
            width: '30rem',
          }}
        >
          <Typography
            variant="h2"
            style={{
              paddingBottom: '8%',
              paddingLeft: '2%',
              paddingRight: '2%',
              paddingTop: '3%',
              fontSize: '1.5rem',
              fontWeight: 200,
            }}
          >
            Remove Item
          </Typography>
          <Typography
            variant="body1"
            style={{
              paddingBottom: '10%',
              paddingLeft: '2%',
              paddingRight: '2%',
              fontSize: '1rem',
              fontWeight: 200,
            }}
          >
            Are you sure you want to remove this shoe from the cart?
          </Typography>
          <Grid
            container
            spacing={1}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="error"
                style={{ marginTop: '16px' }}
                onClick={removeItem}
              >
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
                onClick={cancelRemoveItem}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      {/* Error modal */}
      <Modal
        open={showErrorModal}
        onClose={closeErrorModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        BackdropProps={{
          onClick: handleBackdropClick,
        }}
      >
        <Paper
          style={{
            backgroundColor: '#000',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            padding: '2%',
            margin: '4%',
            width: '30rem',
          }}
        >
          <Typography
            variant="h2"
            style={{
              paddingBottom: '8%',
              paddingLeft: '2%',
              paddingRight: '2%',
              paddingTop: '3%',
              fontSize: '1.5rem',
              fontWeight: 200,
            }}
          >
            Sorry!
          </Typography>
          <Typography
            variant="body1"
            style={{
              paddingBottom: '10%',
              paddingLeft: '2%',
              paddingRight: '2%',
              fontSize: '1rem',
              fontWeight: 200,
            }}
          >
            You cannot add any more shoes of the same type.
          </Typography>
          <Grid
            container
            spacing={1}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
                onClick={closeErrorModal}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      {showNotification && <div className="notification">Item removed successfully!</div>}
    </ThemeProvider>
  );
};

export default Cart;
