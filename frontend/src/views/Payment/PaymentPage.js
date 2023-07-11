import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import "../../App.css";

const PaymentPage = (props) => {
  const amount = props.amount;
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardDetailsComplete, setCardDetailsComplete] = useState(false);
  const [disablePay, setDisablePay] = useState(true);
  const [payBtnVariant, setPayBtnVariant] = useState("outlined");

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
      console.log(paymentMethod);
      // Make API call to complete the payment process
      //   try {
      //     const response = await axios.post("/api/complete-payment", {
      //       paymentMethodId: paymentMethod.id,
      //       amount: 1000, // Example amount (in cents)
      //     });
      //     console.log(response.data); // Handle the API response
      //   } catch (error) {
      //     console.error(error);
      //   }
    }
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
                Pay
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
