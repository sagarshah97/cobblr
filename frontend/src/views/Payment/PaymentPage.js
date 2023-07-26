import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import "../../App.css";
import axios from "axios";

const PaymentPage = (props) => {
  const loggedInUserId = "64b813345ab966a0d7cd61a5"; //todo: get from session storage

  const orderDetails = props.details;
  const amount = props.details.total;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardDetailsComplete, setCardDetailsComplete] = useState(false);
  const [disablePay, setDisablePay] = useState(true);
  const [payBtnVariant, setPayBtnVariant] = useState("outlined");
  const [paid, setPaid] = useState(false);
  const [payInitiated, setPayInitiated] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
    if (cardDetailsComplete && name) {
      setPayBtnVariant("contained");
      setDisablePay(false);
    } else {
      setPayBtnVariant("outlined");
      setDisablePay(true);
    }
  };

  const handleCardChange = (event) => {
    const brand = event.brand !== "unknown" ? event.brand : "";
    setCardType(brand.charAt(0).toUpperCase() + brand.slice(1));
    setCardDetailsComplete(event.complete);
    if (event.complete && name) {
      setPayBtnVariant("contained");
      setDisablePay(false);
    } else {
      setPayBtnVariant("outlined");
      setDisablePay(true);
    }
  };

  const handleSubmit = async (event) => {
    setPayInitiated(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      try {
        const response = await axios.post(`/orders/makePayment`, {
          paymentMethodId: paymentMethod.id,
          amount: amount * 100, //amount (in cents)
        });
        if (response?.data?.success) {
          createOrder();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createOrder = () => {
    const body = {
      ...orderDetails,
      invoiceNumber: loggedInUserId.slice(-5) + "-" + Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      userId: loggedInUserId,
    };

    axios
      .post(`/orders/create`, body)
      .then((res) => {
        if (res?.data?._id) {
          setPaid(true);
          setPayInitiated(false);
          navigate(`/orderconfirmation/${res.data._id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          paddingTop: "3%",
          paddingBottom: "7%",
        }}
      >
        <Typography style={{ paddingLeft: "1%" }}>
          <PaymentIcon
            style={{ height: "7rem", width: "7rem", color: "#009CE8" }}
          />
        </Typography>
        <Typography
          style={{ fontWeight: 200, fontSize: "xx-large", padding: "3%" }}
        >
          Payment Details
        </Typography>
        <form onSubmit={handleSubmit} style={{ padding: "3%" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <span style={{ fontWeight: 200, fontSize: "large" }}>
                {" "}
                {`Amount: ${amount}`}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name on Card"
                onChange={handleName}
                value={name}
                autoComplete="off"
                fullWidth
                required
                InputProps={{
                  style: {
                    color: "white",
                  },
                  sx: {
                    "& fieldset": {
                      border: "1px solid white!important",
                      borderRadius: 1.5,
                    },
                    "&:hover fieldset": {
                      border: "1px solid white!important",
                      borderRadius: 1.5,
                    },
                    "&:focus-within fieldset, &:focus-visible fieldset": {
                      border: "1px solid white!important",
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputOutlineProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "5px",
                  height: 56,
                  padding: "3%",
                  display: "grid",
                  alignContent: "center",
                }}
              >
                <CardElement
                  onChange={handleCardChange}
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "white",
                      },
                    },
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{ marginTop: "10%" }}>
            <Grid item xs={3} sm={2} md={2} lg={2}>
              <Button
                type="submit"
                variant={payBtnVariant}
                className="pay-btn"
                color="success"
                disabled={disablePay}
              >
                {payInitiated && !paid ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Pay"
                )}
              </Button>
            </Grid>
            <Grid item xs={3} sm={2} md={2} lg={2}>
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default PaymentPage;
