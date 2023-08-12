//Author: Ashish Ojha (B00931967)
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import contact from "../../assets/images/contactIcon.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import Footer from "../HomePage/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex =
      /^(\+?1\s*[-\/\.]?)?(\()?\d{3}(\))?[-\/\.]?\d{3}[-\/\.]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = () => {
    setErrors({});
    const { name, email, phone, message } = formData;
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (phone.trim() === "") {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (message.trim() === "") {
      newErrors.message = "Message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      submitForm(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  const submitForm = async (formData) => {
    try {
      const response = await axios.post("/contact/save", formData);
      setIsPopupOpen(true);
    } catch (error) {
      console.error(error);
      alert("Unable to save mesaage. Please try again!!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Box
        style={{
          minHeight: "100vh",
          paddingBottom: "64px",
          backgroundColor: "#0f0f0f",
        }}
      >
        <Container maxWidth="md" style={{ marginTop: 2, color: "white" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={contact}
              alt="Image"
              style={{
                maxWidth: "10rem",
                maxHeight: "10rem",
                objectFit: "contain",
                filter:
                  "invert(64%) sepia(94%) saturate(2518%) hue-rotate(176deg) brightness(103%) contrast(101%)",
              }}
            />
          </div>
          <Typography
            variant="h4"
            style={{
              marginBottom: "2%",
              fontWeight: 200,
              fontSize: "3rem",
              overflowWrap: "anywhere",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            style={{
              marginBottom: "5%",
              fontWeight: 200,
              fontSize: "1rem",
            }}
          >
            Let us know what you would like to know more about
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginBottom: "3%" }}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                name="name"
                autoComplete="off"
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
              {errors.name && (
                <Typography color="error">{errors.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "3%" }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                autoComplete="off"
                fullWidth
                value={formData.email}
                onChange={handleChange}
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
              {errors.email && (
                <Typography color="error">{errors.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "3%" }}>
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                autoComplete="off"
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
              {errors.phone && (
                <Typography color="error">{errors.phone}</Typography>
              )}
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "3%" }}>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={formData.message}
                onChange={handleChange}
                name="message"
                autoComplete="off"
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
              {errors.message && (
                <Typography color="error">{errors.message}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "3%" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: "#009CE8" }}
            >
              Submit
            </Button>
          </Grid>
          <Dialog
            open={isPopupOpen}
            onClose={handlePopupClose}
            PaperProps={{
              style: {
                backgroundColor: "white",
                borderRadius: "1rem",
              },
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="close"
                onClick={handlePopupClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "black",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <DialogTitle
              style={{ color: "black", marginTop: "10%", marginBottom: "8%" }}
            >
              Thank you for contacting us!
            </DialogTitle>
          </Dialog>

          <Typography style={{ marginTop: "2%", marginBottom: "2%" }}>
            You can also find us on
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <InstagramIcon
                style={{
                  height: "45px",
                  width: "45px",
                  color: "#E1306C",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open("https://www.instagram.com", "_blank")
                }
              />
            </Grid>
            <Grid item>
              <FacebookIcon
                style={{
                  height: "45px",
                  width: "45px",
                  color: "#4267B2",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open("https://www.facebook.com", "_blank")
                }
              />
            </Grid>
            <Grid item>
              <TwitterIcon
                style={{
                  height: "45px",
                  width: "45px",
                  color: "#1DA1F2",
                  cursor: "pointer",
                }}
                onClick={() => window.open("https://www.twitter.com", "_blank")}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ContactUs;
