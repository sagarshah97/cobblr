// Author: Sagar Paresh Shah (B00930009)

import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import WarningIcon from "@mui/icons-material/Warning";
import GenericModal from "../../utils/GenericModal";
import "../../App.css";
import axios from "axios";

const PaymentPage = (props) => {
  const loggedInUserId = window.sessionStorage.getItem("userId");
  const token = window.sessionStorage.getItem("token");

  const orderDetails = props?.details;
  const amount = props?.details?.total;
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
  const [disableCancel, setDisableCancel] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const padding = isSmallScreen ? "20%" : "5%";
  const height = isSmallScreen ? "56px" : "72.8px";

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (param) => {
    handleClose();
    if (param === "Yes") {
      navigate("/cart");
    }
  };

  useEffect(() => {
    if (!loggedInUserId || !props?.details?.total) {
      navigate("/billing");
    }
  }, [props]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      const confirmationMessage = "Are you sure you want to refresh the page?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
    setDisableCancel(true);
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
        const response = await axios.post(
          `/billing/makePayment`,
          {
            paymentMethodId: paymentMethod.id,
            amount: parseInt(amount * 100), //amount (in cents)
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
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
      invoiceNumber: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      expectedDeliveryDate: new Date(
        new Date().setDate(new Date().getDate() + 5)
      ).toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      userId: loggedInUserId,
    };
    delete body._id;
    axios
      .post(`/billing/create`, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res?.data?._id) {
          emptyCart(res.data._id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emptyCart = (orderId) => {
    axios
      .post(
        "/billing/clearCart",
        { userId: loggedInUserId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setPaid(true);
        setPayInitiated(false);
        setDisableCancel(false);
        navigate(`/orderconfirmation/${orderId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box
        color="#FFA901"
        p={1.5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top={height}
        left={0}
        width="100%"
        zIndex={999}
        style={{
          backgroundColor: "#383838",
        }}
      >
        <WarningIcon sx={{ mr: 1 }} />
        <Typography variant="body1">
          Please do not refresh this page. If you wish to abort payment, click
          on the Cancel button.
        </Typography>
      </Box>
      {open && (
        <>
          <GenericModal
            open={open}
            onClose={handleClose}
            onButtonClick={handleButtonClick}
            heading="Confirmation"
            content="Are you sure you want to cancel?"
            buttonLabel1="Yes"
            buttonColor1="error"
            buttonLabel2="No"
            buttonColor2="primary"
          />
        </>
      )}
      <Container
        maxWidth="sm"
        style={{
          paddingTop: padding,
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
                {`Amount: $${amount}`}
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
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpen}
                disabled={disableCancel}
              >
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
