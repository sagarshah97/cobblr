// Author: Sagar Paresh Shah (B00930009)

import { React, useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../../App.css";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Footer from "../HomePage/Footer";
import GenericModal from "../../utils/GenericModal";
import axios from "axios";
import Spinner from "../../utils/Loader";

const BillingDetails = () => {
  const loggedInUserId = window.sessionStorage.getItem("userId");
  const token = window.sessionStorage.getItem("token");

  const navigate = useNavigate();

  const [cartDetails, setCartDetails] = useState();
  const [addresses, setAddresses] = useState([]);
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);

  const [selectedPhoneOption, setSelectedPhoneOption] = useState(null);
  const [showEForm, setShowEForm] = useState(false);
  const [custEmail, setCustEmail] = useState("");

  const [selectedEmailOption, setSelectedEmailOption] = useState(null);
  const [showPForm, setShowPForm] = useState(false);
  const [custPhone, setCustPhone] = useState("");

  const [disableContactNext, setDisableContactNext] = useState(true);
  const [disableAddressNext, setDisableAddressNext] = useState(true);

  const [selectedAddressOption, setSelectedAddressOption] = useState("");
  const [showAForm, setShowAForm] = useState(false);
  const [custUnitNumber, setCustUnitNumber] = useState("");
  const [custPostBoxNumber, setCustPostBoxNumber] = useState("");
  const [custStreet, setCustStreet] = useState("");
  const [custProvince, setCustProvince] = useState("");
  const [custZipcode, setCustZipcode] = useState("");
  const [custCountry, setCustCountry] = useState("");

  useEffect(() => {
    if (loggedInUserId) {
      getUserDetails();
      getCartDetails();
    } else {
      navigate("/login");
    }
  }, [loggedInUserId]);

  const getCartDetails = () => {
    axios
      .post(
        `billing/getFinalOrder`,
        { userId: loggedInUserId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data.length) {
          setCartDetails(res.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserDetails = () => {
    axios
      .post(
        `users/getUserDetails`,
        { _id: loggedInUserId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res?.data?.userDetails) {
          const userDetails = res.data.userDetails;
          setPhones(userDetails.phone.concat("Other"));
          setEmails([userDetails.email].concat("Other"));
          setAddresses(userDetails.address.concat("Other"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ContactDetailsStep = ({ onNext }) => {
    const [emailNotValid, setEmailNotValid] = useState(false);
    const [phoneNotValid, setPhoneNotValid] = useState(false);

    const phoneHelperText = "Enter 10 digit phone number.";
    const emailHelperText = "Enter correct email (e.g.:jon_snow@westeros.com)";

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [showPhoneForm, setShowPhoneForm] = useState(showPForm);
    const [showEmailForm, setShowEmailForm] = useState(showEForm);

    const [selectedPhone, setSelectedPhone] = useState(selectedPhoneOption);
    const [selectedEmail, setSelectedEmail] = useState(selectedEmailOption);
    const [newPhone, setNewPhone] = useState(custPhone);
    const [newEmail, setNewEmail] = useState(custEmail);

    const [disableNext, setDisableNext] = useState(disableContactNext);

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

    const handleNext = () => {
      if (selectedPhone === "Other") {
        setCustPhone(newPhone);
        setShowPForm(true);
        setSelectedPhoneOption(selectedPhone);
      } else {
        setCustPhone(selectedPhone);
        setShowPForm(false);
        setSelectedPhoneOption(selectedPhone);
      }

      if (selectedEmail === "Other") {
        setCustEmail(newEmail);
        setShowEForm(true);
        setSelectedEmailOption(selectedEmail);
      } else {
        setCustEmail(selectedEmail);
        setShowEForm(false);
        setSelectedEmailOption(selectedEmail);
      }
      setDisableContactNext(false);

      onNext();
    };

    const handlePhoneChange = (event) => {
      setSelectedPhone(event.target.value);
      if (event.target.value === "Other") {
        setShowPhoneForm(true);
      } else {
        setShowPhoneForm(false);
      }
      setNewPhone("");
      checkValidity(event.target.value, newPhone, selectedEmail, newEmail);
    };

    const handleEmailChange = (event) => {
      setSelectedEmail(event.target.value);
      if (event.target.value === "Other") {
        setShowEmailForm(true);
      } else {
        setShowEmailForm(false);
      }
      setNewEmail("");
      checkValidity(selectedPhone, newPhone, event.target.value, newEmail);
    };

    const handlePhoneInputChange = (event) => {
      setNewPhone(event.target.value);
      if (!phoneRegex.test(event.target.value)) {
        setPhoneNotValid(true);
      } else {
        setPhoneNotValid(false);
      }
      checkValidity(selectedPhone, event.target.value, selectedEmail, newEmail);
    };

    const handleEmailInputChange = (event) => {
      setNewEmail(event.target.value);
      if (!emailRegex.test(event.target.value)) {
        setEmailNotValid(true);
      } else {
        setEmailNotValid(false);
      }
      checkValidity(selectedPhone, newPhone, selectedEmail, event.target.value);
    };

    const checkValidity = (phoneOp, phone, emailOp, email) => {
      if (
        ((phoneOp && phoneOp !== "Other") ||
          (phoneOp === "Other" && phoneRegex.test(phone))) &&
        ((emailOp && emailOp !== "Other") ||
          (emailOp === "Other" && emailRegex.test(email)))
      ) {
        setDisableNext(false);
      } else {
        setDisableNext(true);
      }
    };

    return (
      <>
        {emails && phones && (
          <>
            <Container maxWidth="sm">
              <Typography
                style={{
                  fontWeight: 100,
                  fontSize: "14px",
                  marginBottom: "7%",
                }}
              >
                Provide your contact details where we could contact you
                regarding your orders or shipments.
              </Typography>

              <Grid container>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel style={{ color: "white" }}>
                      Select phone number
                    </InputLabel>
                    <Select
                      label="Select phone number"
                      value={selectedPhone}
                      onChange={handlePhoneChange}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        marginBottom: "5%",
                      }}
                      className="select-size"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: "#3b3b3b",
                            color: "white",
                          },
                        },
                      }}
                      sx={{
                        height: "100%",
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                        },
                        "& .MuiSelect-icon": {
                          color: "#fff",
                        },
                        "&:hover": {
                          "& .MuiOutlinedInput-input": {
                            color: "#fff",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff",
                          },
                          "& .MuiSelect-icon": {
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      {phones.map((phone) => (
                        <MenuItem value={phone}>{phone}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {showPhoneForm && (
                    <Box mt={1}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter new phone number"
                        value={newPhone}
                        onChange={handlePhoneInputChange}
                        error={phoneNotValid}
                        helperText={phoneHelperText ? phoneHelperText : ""}
                        required
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel style={{ color: "white" }}>
                      Select email
                    </InputLabel>
                    <Select
                      label="Select email"
                      value={selectedEmail}
                      onChange={handleEmailChange}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        marginBottom: "5%",
                      }}
                      className="select-size"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: "#3b3b3b",
                            color: "white",
                          },
                        },
                      }}
                      sx={{
                        height: "100%",
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                        },
                        "& .MuiSelect-icon": {
                          color: "#fff",
                        },
                        "&:hover": {
                          "& .MuiOutlinedInput-input": {
                            color: "#fff",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff",
                          },
                          "& .MuiSelect-icon": {
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      {emails.map((email) => (
                        <MenuItem value={email}>{email}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {showEmailForm && (
                    <Box mt={1}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter new email"
                        value={newEmail}
                        onChange={handleEmailInputChange}
                        required
                        autoComplete="off"
                        error={emailNotValid}
                        helperText={emailHelperText ? emailHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={0} style={{ marginTop: "5%" }}>
                <Grid item xs={3} sm={2} md={2} lg={2}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    style={{ backgroundColor: "#009CE8" }}
                    disabled={disableNext}
                  >
                    Next
                  </Button>
                </Grid>
                <Grid item xs={3} sm={2} md={2} lg={2}>
                  <Button variant="outlined" color="error" onClick={handleOpen}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
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
          </>
        )}
      </>
    );
  };

  const AddressDetailsStep = ({ onBack }) => {
    const [unitNotValid, setUnitNotValid] = useState(false);
    const [streetNotValid, setStreetNotValid] = useState(false);
    const [provinceNotValid, setProvinceNotValid] = useState(false);
    const [zipcodeNotValid, setZipcodeNotValid] = useState(false);
    const [countryNotValid, setCountryNotValid] = useState(false);

    const [disableSave, setDisableSave] = useState(disableAddressNext);

    const addressHelperText = "Enter here";

    const [unitNumber, setUnitNumber] = useState(custUnitNumber);
    const [postBoxNumber, setPostBoxNumber] = useState(custPostBoxNumber);
    const [street, setStreet] = useState(custStreet);
    const [province, setProvince] = useState(custProvince);
    const [zipcode, setZipcode] = useState(custZipcode);
    const [country, setCountry] = useState(custCountry);

    const [showAddressForm, setShowAddressForm] = useState(showAForm);
    const [selectedAddress, setSelectedAddress] = useState(
      selectedAddressOption
    );

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
        navigate("/");
      }
    };

    const handleAddressChange = (event) => {
      setSelectedAddress(event.target.value);
      if (event.target.value === "Other") {
        setShowAddressForm(true);
      } else {
        setShowAddressForm(false);
      }
      checkAddressValidity(
        event.target.value,
        unitNumber,
        street,
        province,
        zipcode,
        country
      );
    };

    const checkAddressValidity = (
      addOp,
      unit,
      street,
      province,
      zip,
      country
    ) => {
      if (
        (addOp === "Other" && unit && street && province && zip && country) ||
        (addOp && addOp !== "Other")
      ) {
        setDisableSave(false);
      } else {
        setDisableSave(true);
      }
    };

    const handleNext = () => {
      let fullAddress;
      if (
        selectedAddress === "Other" &&
        unitNumber &&
        street &&
        province &&
        zipcode
      ) {
        setSelectedAddressOption(selectedAddress);
        setShowAForm(true);
        setCustUnitNumber(unitNumber);
        setCustPostBoxNumber(postBoxNumber);
        setCustProvince(province);
        setCustStreet(street);
        setCustZipcode(zipcode);
        setCustCountry(country);
        fullAddress = postBoxNumber
          ? `${unitNumber}, ${postBoxNumber}, ${street}, ${province}, ${zipcode}, ${country}`
          : `${unitNumber}, ${street}, ${province}, ${zipcode}, ${country}`;
      } else {
        setSelectedAddressOption(selectedAddress);
        setShowAForm(false);
      }

      const params = {
        ...cartDetails,
        address: selectedAddress === "Other" ? fullAddress : selectedAddress,
        phone: custPhone,
        email: custEmail,
      };

      navigate("/payment", { state: { params } });
    };

    const handleBack = () => {
      onBack();
    };

    return (
      <>
        {addresses && (
          <>
            <Container maxWidth="sm">
              <Typography
                style={{
                  fontWeight: 100,
                  fontSize: "14px",
                  marginBottom: "7%",
                }}
              >
                Provide your shipping address where we you would like your order
                to be shipped or delivered.
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel style={{ color: "white" }}>
                      Select address
                    </InputLabel>
                    <Select
                      label="Select address"
                      value={selectedAddress}
                      onChange={handleAddressChange}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        marginBottom: "5%",
                      }}
                      className="select-size"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            backgroundColor: "#3b3b3b",
                            color: "white",
                          },
                        },
                      }}
                      sx={{
                        height: "100%",
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                        },
                        "& .MuiSelect-icon": {
                          color: "#fff",
                        },
                        "&:hover": {
                          "& .MuiOutlinedInput-input": {
                            color: "#fff",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff",
                          },
                          "& .MuiSelect-icon": {
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      {addresses.map((address) => (
                        <MenuItem value={address}>{address}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {showAddressForm && (
                <>
                  <Typography
                    style={{
                      fontStyle: "italic",
                      fontWeight: 200,
                      paddingBottom: "2%",
                    }}
                  >
                    Enter your address below:
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        label="Unit Number"
                        value={unitNumber}
                        onChange={(e) => {
                          setUnitNumber(e.target.value);
                          if (!e.target.value) {
                            setUnitNotValid(true);
                          } else {
                            setUnitNotValid(false);
                          }
                          checkAddressValidity(
                            selectedAddress,
                            e.target.value,
                            street,
                            province,
                            zipcode,
                            country
                          );
                        }}
                        fullWidth
                        required
                        autoComplete="off"
                        error={unitNotValid}
                        helperText={addressHelperText ? addressHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        label="Post Box Number"
                        value={postBoxNumber}
                        onChange={(e) => setPostBoxNumber(e.target.value)}
                        fullWidth
                        autoComplete="off"
                        helperText={addressHelperText ? addressHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                      <TextField
                        label="Street"
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                          if (!e.target.value) {
                            setStreetNotValid(true);
                          } else {
                            setStreetNotValid(false);
                          }
                          checkAddressValidity(
                            selectedAddress,
                            unitNumber,
                            e.target.value,
                            province,
                            zipcode,
                            country
                          );
                        }}
                        fullWidth
                        required
                        autoComplete="off"
                        error={streetNotValid}
                        helperText={addressHelperText ? addressHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        label="Province"
                        value={province}
                        onChange={(e) => {
                          setProvince(e.target.value);
                          if (!e.target.value) {
                            setProvinceNotValid(true);
                          } else {
                            setProvinceNotValid(false);
                          }
                          checkAddressValidity(
                            selectedAddress,
                            unitNumber,
                            street,
                            e.target.value,
                            zipcode,
                            country
                          );
                        }}
                        fullWidth
                        required
                        autoComplete="off"
                        error={provinceNotValid}
                        helperText={addressHelperText ? addressHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        label="Zipcode"
                        value={zipcode}
                        onChange={(e) => {
                          setZipcode(e.target.value);
                          if (!e.target.value) {
                            setZipcodeNotValid(true);
                          } else {
                            setZipcodeNotValid(false);
                          }
                          checkAddressValidity(
                            selectedAddress,
                            unitNumber,
                            street,
                            province,
                            e.target.value,
                            country
                          );
                        }}
                        fullWidth
                        required
                        autoComplete="off"
                        error={zipcodeNotValid}
                        helperText={addressHelperText ? addressHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <TextField
                        label="Country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (!e.target.value) {
                            setCountryNotValid(true);
                          } else {
                            setCountryNotValid(false);
                          }
                          checkAddressValidity(
                            selectedAddress,
                            unitNumber,
                            street,
                            province,
                            zipcode,
                            e.target.value
                          );
                        }}
                        fullWidth
                        required
                        autoComplete="off"
                        error={countryNotValid}
                        helperText={addressHelperText ? addressHelperText : ""}
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
                            "&:focus-within fieldset, &:focus-visible fieldset":
                              {
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
                  </Grid>
                </>
              )}
              <Grid container spacing={1} style={{ marginTop: "5%" }}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    style={{ backgroundColor: "#009CE8" }}
                    disabled={disableSave}
                  >
                    Proceed to Pay
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                  <Button variant="outlined" onClick={handleBack} color="info">
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={2}>
                  <Button variant="outlined" onClick={handleOpen} color="error">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
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
          </>
        )}
      </>
    );
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      {emails.length > 0 ? (
        <>
          <Container
            maxWidth="sm"
            style={{ paddingTop: "3%", paddingBottom: "10%" }}
          >
            <Typography style={{ paddingLeft: "1%" }}>
              <ReceiptIcon
                style={{ height: "7rem", width: "7rem", color: "#009CE8" }}
              />
            </Typography>
            <Typography
              style={{ fontWeight: 200, fontSize: "xx-large", padding: "3%" }}
            >
              Billing Details
            </Typography>
            <Stepper
              activeStep={activeStep}
              style={{
                padding: "3%",
                marginBottom: "4%",
              }}
              sx={{
                "& .MuiStepLabel-label": {
                  color: "white",
                },
                "& .MuiStepLabel-label.Mui-active ": {
                  color: "#009ce8",
                  fontWeight: "bold",
                },
                "& .MuiStepLabel-label.Mui-completed ": {
                  color: "#00e600",
                  fontWeight: "bold",
                },
              }}
              className="stepper-icon"
            >
              <Step>
                <StepLabel>Contact Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Address Details</StepLabel>
              </Step>
            </Stepper>

            {activeStep === 0 && <ContactDetailsStep onNext={handleNext} />}
            {activeStep === 1 && <AddressDetailsStep onBack={handleBack} />}
          </Container>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
      <Footer />
    </>
  );
};

export default BillingDetails;
