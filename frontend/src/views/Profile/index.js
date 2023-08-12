// Author: Sahil Dilip Dalvi (B00939343)
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import defaultImage from "../../assets/images/Home/dummy.png";
import {
  Button,
  Modal,
  TextField,
  Box,
  Divider,
  Card,
  CardMedia,
  FormControlLabel,
  Radio,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  RadioGroup,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Footer from "../HomePage/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const profileStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5vh",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  media: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  addButton: {
    marginTop: "16px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "16px",
  },
};
export default function Profile() {
  const token = window.sessionStorage.getItem("token");
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("private");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const renderIcon = (label) => {
    switch (label) {
      case "First Name":
      case "Last Name":
        return <PersonIcon />;
      case "Email":
        return <EmailIcon />;
      case "Phone":
        return <PhoneIcon />;
      default:
        return null;
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = () => {
    const data = {
      currentPassword,
      newPassword,
      email,
    };

    axios
      .post("/users/changepassword", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage("Password changed successfully");
        } else {
          setMessage("Failed to change password");
        }
      })
      .catch((error) => {
        setMessage("Failed to change password");
        console.error("Error changing password:", error);
      });

    setCurrentPassword("");
    setNewPassword("");
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    if (isPasswordChanged) {
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    handleClose();
  };

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSaves = () => {
    const visibilityValue = selectedOption === "private" ? true : "public";

    axios
      .post(
        "/users/profile-visibility",
        {
          visibility: visibilityValue,
          email: email,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {});
    handleModalClose();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [newAddressModal, setNewAddressModal] = useState(false);
  const [tempAddress, setTempAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    label: "",
  });
  const [editAddressRow, setEditAddressRow] = React.useState(null);
  const [addressArray, setAddressArray] = useState([]);
  const addNewAddress = () => {
    setNewAddressModal(false);
    setAddressArray((addressArray) => [...addressArray, tempAddress]);
    setTempAddress({
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      label: "",
    });
  };
  const editNewAddress = (row, index) => {
    setEditAddressRow(index);
    setTempAddress(row);
    setNewAddressModal(true);
  };
  const closeNewAddressModal = () => {
    setNewAddressModal(false);
    setTempAddress({
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      label: "",
    });
  };
  const setNewTempAddress = (e) => {
    setTempAddress((prevAddress) => ({
      ...prevAddress,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVisibilityClick = () => {
    setIsModalOpen(true);
  };

  const handleModalCloses = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSaveAddress = () => {
    const data = {
      email,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      label: addressLabel,
    };

    axios
      .post("/users/address", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        handleModalCloses();
      })
      .catch((error) => {
        console.error("Error saving address:", error);
      });
  };

  const handleChanges = (e) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [e.target.name]: e.target.value,
    }));
  };

  const getUserDetails = (id) => {
    axios
      .get(`/users/profile/${id}`)
      .then((response) => {
        const { line1, line2, city, state, postalCode } = response.data.user;

        setAddress({
          line1,
          line2,
          city,
          state,
          postalCode,
        });

        setProfilePhoto(
          response.data.user.profileImage
            ? `data:image/png;base64,${response.data.user.profileImage}`
            : defaultImage
        );
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setPhone(response.data.user.phone);
        setEmail(response.data.user.email);
        setDisplayText(response.data.user.inputText);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const id = window.sessionStorage.getItem("userId");
  useEffect(() => {
    if (id) {
      setUserId(id);
      getUserDetails(id);
    } else {
      navigate("/login");
    }
  }, [id]);

  const isValidInput = (input) => /^[A-Za-z]+$/.test(input);
  const isValidPhone = (input) => /^\d{10}$/.test(input);

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    if (isValidInput(value) || value === "") {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    if (isValidInput(value) || value === "") {
      setLastName(value);
    }
  };
  const handlePhoneChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/\D/g, "");

    const formattedValue = sanitizedValue.substring(0, 10);

    setPhone(formattedValue);
  };

  const handleSaveChangesForEdit = () => {
    const updatedData = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
    };

    axios
      .post("/users/profileupdate", updatedData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating user data:", error);
      });

    setIsModalOpenP(false);
  };

  const labels = ["First Name", "Last Name", "Email", "Phone"];
  const initialValues = [];
  const [values, setValues] = useState(initialValues);

  const [profileValues, setProfileValues] = useState(initialValues);
  const [isModalOpenP, setIsModalOpenP] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpenP(true);
  };

  const handleModalCloseForPersonal = () => {
    setIsModalOpenP(false);
  };

  const handleSaveChanges = () => {
    handleModalCloseForPersonal();
  };

  const handleInputChange = (e, index) => {
    const updatedValues = [...profileValues];
    updatedValues[index] = e.target.value;
    setProfileValues(updatedValues);
  };
  const [addressLabel, setAddressLabel] = useState("Home");

  const [isModalOpenProfile, setIsModalOpenProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const handleModalOpenProfile = () => {
    setIsModalOpenProfile(true);
  };

  const handleModalCloseProfile = () => {
    setIsModalOpenProfile(false);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSavePhoto = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];

        axios
          .post(
            "/users/uploadImage",
            {
              file: base64String,
              email,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {})
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      };
      reader.readAsDataURL(selectedFile);
    }
    setIsModalOpenProfile(false);
  };

  const handlePhotoChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setProfilePhoto(null);
  };

  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleInputChangeForBio = (e) => {
    setInputText(e.target.value);
  };

  const handleSaveText = () => {
    setDisplayText(inputText);
    const data = {
      inputText,
      email,
    };
    const token = sessionStorage.getItem("token");
    axios
      .post("/users/displaytext", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error saving text:", error);
      });
    setInputText("");
    setIsAddModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div
      className="fullscreen-container"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "3%", marginBottom: "5%" }}
        >
          <Grid item xs={12} sm={6} md={4} lg={5}>
            <div style={profileStyles.container}>
              <Card style={profileStyles.root}>
                <CardMedia
                  style={profileStyles.media}
                  image={profilePhoto}
                  alt="Profile"
                />
                <Button
                  variant="contained"
                  style={profileStyles.addButton}
                  onClick={handleModalOpenProfile}
                  sx={{
                    backgroundColor: "#262626",
                    color: "white",
                  }}
                >
                  Add/Change Photo
                </Button>
              </Card>

              <Modal
                open={isModalOpenProfile}
                onClose={handleModalCloseProfile}
              >
                <Box style={profileStyles.modal}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ marginBottom: "16px" }}
                  />

                  <Button variant="contained" onClick={handleSavePhoto}>
                    Save & Close
                  </Button>
                </Box>
              </Modal>
            </div>
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                    width: "50%",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {displayText ? (
                    <Typography variant="body1">{displayText}</Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                      value={inputText}
                    >
                      Tell me something about yourself...
                    </Typography>
                  )}{" "}
                </Box>
                <Button variant="contained" onClick={handleOpenAddModal}>
                  Add
                </Button>
                <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      textAlign: "center",
                    }}
                  >
                    <TextField
                      label="How are you feeling?"
                      fullWidth
                      value={inputText}
                      onChange={handleInputChangeForBio}
                    />
                    <Box sx={{ marginTop: 2 }}>
                      <Button variant="contained" onClick={handleSaveText}>
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={8}
            lg={6}
            sx={{ marginTop: "2%", paddingLeft: "2%", paddingRight: "2%" }}
          >
            <div>
              <Accordion defaultExpanded onChange={handleChange("panel1")}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Personal Details
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {" "}
                    "The perfect shoelaces that tie your digital identity
                    together."
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        {renderIcon("First Name")}
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          fontWeight="bold"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          First Name:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          {firstName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {renderIcon("Last Name")}
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          fontWeight="bold"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          Last Name:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          {lastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {renderIcon("Phone")}
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          fontWeight="bold"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          Phone:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          {phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {renderIcon("Email")}
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          fontWeight="bold"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          Email:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          display="inline"
                          sx={{ ml: 1, overflowWrap: "anywhere" }}
                        >
                          {email}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                        <Button
                          variant="contained"
                          onClick={handleModalOpen}
                          size="small"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Grid>
                    <Modal
                      open={isModalOpenP}
                      onClose={handleModalCloseForPersonal}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="subtitle1"
                                display="inline"
                                fontWeight="bold"
                                sx={{ ml: 1, overflowWrap: "anywhere" }}
                              >
                                First Name: {firstName}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="subtitle1"
                                display="inline"
                                fontWeight="bold"
                                sx={{ ml: 1, overflowWrap: "anywhere" }}
                              >
                                Phone: {phone}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                display="inline"
                                sx={{ ml: 1, overflowWrap: "anywhere" }}
                              >
                                {phone}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="subtitle1"
                                display="inline"
                                fontWeight="bold"
                                sx={{ ml: 1, overflowWrap: "anywhere" }}
                              >
                                Email: {email}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                display="inline"
                                sx={{ ml: 1, overflowWrap: "anywhere" }}
                              >
                                {email}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                              <Button
                                variant="contained"
                                onClick={handleModalOpen}
                                size="small"
                                startIcon={<EditIcon />}
                              >
                                Edit
                              </Button>
                            </Box>
                          </Grid>
                          <Modal
                            open={isModalOpenP}
                            onClose={handleModalCloseForPersonal}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 4,
                              }}
                            >
                              <form>
                                <TextField
                                  label="First Name"
                                  fullWidth
                                  value={firstName}
                                  onChange={handleFirstNameChange}
                                  margin="normal"
                                />
                                <TextField
                                  label="Last Name"
                                  fullWidth
                                  value={lastName}
                                  onChange={handleLastNameChange}
                                  margin="normal"
                                />
                                <TextField
                                  label="Phone"
                                  fullWidth
                                  value={phone}
                                  onChange={handlePhoneChange}
                                  margin="normal"
                                />

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: 2,
                                  }}
                                >
                                  <Button
                                    onClick={handleSaveChangesForEdit}
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginRight: 1 }}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={handleModalCloseForPersonal}
                                    variant="contained"
                                    color="secondary"
                                  >
                                    Close
                                  </Button>
                                </Box>
                              </form>
                            </Box>
                          </Modal>
                        </Typography>
                      </Box>
                    </Modal>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion onChange={handleChange("panel4")}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Saved Address:{" "}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    "A reliable shoe rack for your digital destinations."
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={10}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "10px",
                            marginBottom: "10px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          <Typography variant="body1">
                            {addressLabel}:
                          </Typography>

                          <Typography variant="body1">
                            Address: {address.line1}, {address.line2},{" "}
                            {address.city}, {address.state} {address.postalCode}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={2}>
                        <EditIcon
                          onClick={handleEdit}
                          sx={{
                            fontSize: 24,
                            color: "#888",
                            cursor: "pointer",
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Modal open={isModalOpen} onClose={handleModalClose}>
                      <div
                        className="modal"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "white",
                          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                          padding: "20px",
                          borderRadius: "4px",
                          width: "300px",
                        }}
                      >
                        <h2 style={{ marginBottom: "20px" }}>Edit Address</h2>
                        <TextField
                          label="Address Line 1"
                          name="line1"
                          value={address.line1}
                          onChange={handleChanges}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Address Line 2"
                          name="line2"
                          value={address.line2}
                          onChange={handleChanges}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="City"
                          name="city"
                          value={address.city}
                          onChange={handleChanges}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="State"
                          name="state"
                          value={address.state}
                          onChange={handleChanges}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Postal Code"
                          name="postalCode"
                          value={address.postalCode}
                          onChange={handleChanges}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Address Label"
                          name="addressLabel"
                          value={addressLabel}
                          onChange={(e) => setAddressLabel(e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                        <Button
                          variant="contained"
                          onClick={handleSaveAddress}
                          style={{ marginRight: "10px" }}
                        >
                          Save Address
                        </Button>
                        <Button variant="outlined" onClick={handleModalCloses}>
                          Close
                        </Button>
                      </div>
                    </Modal>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Profile Visibility
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    "Like a pair of shoes, choose who gets a glimpse of your
                    digital footprint."
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>
                      <p>
                        Choose how you will appear on any Cobblr product reviews
                        you complete.
                      </p>
                      <Chip
                        label={selectedOption}
                        color="primary"
                        icon={<VisibilityIcon />}
                        onClick={handleIconClick}
                        clickable
                      />
                      <Modal open={modalOpen} onClose={handleModalClose}>
                        <div
                          className="modal"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                            padding: "20px",
                            borderRadius: "4px",
                            width: "300px",
                          }}
                        >
                          <h2 style={{ marginBottom: "20px" }}>
                            Profile Visibility
                          </h2>
                          <RadioGroup
                            name="visibility"
                            value={selectedOption}
                            onChange={handleOptionChange}
                          >
                            <FormControlLabel
                              value="private"
                              control={<Radio />}
                              label="Private: Profile visible to only you"
                              style={{ marginBottom: "10px" }}
                            />
                            <FormControlLabel
                              value="public"
                              control={<Radio />}
                              label="Public: Everyone can view profile"
                              style={{ marginBottom: "10px" }}
                            />
                          </RadioGroup>
                          <Button
                            variant="contained"
                            onClick={handleSaves}
                            style={{ marginRight: "10px" }}
                          >
                            Save
                          </Button>
                          <Button variant="outlined" onClick={handleModalClose}>
                            Close
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Change Password
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    "Changing passwords is like changing shoes, it keeps you one
                    step ahead in the digital world."
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Dialog>
                      <DialogTitle>Confirm Password Change</DialogTitle>
                      <DialogContent>
                        Are you sure you want to change your password?
                      </DialogContent>
                      <DialogActions>
                        <Box
                          display="flex"
                          justifyContent="center"
                          sx={{ marginRight: "100px" }}
                        >
                          <Button
                            onClick={() => {
                              setIsPasswordChanged(true);
                              handleConfirmationClose();
                            }}
                            color="primary"
                          >
                            Change Passworddd
                          </Button>
                        </Box>
                      </DialogActions>
                    </Dialog>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {isPasswordChanged ? (
                        <LockOpenIcon color="success" />
                      ) : (
                        <LockIcon color="primary" />
                      )}

                      <TextField
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />

                      <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePasswordChange}
                      >
                        Change Password
                      </Button>
                    </div>
                  </Typography>
                  {message && (
                    <Typography
                      variant="body1"
                      color={
                        message.includes("successfully") ? "success" : "error"
                      }
                    >
                      {message}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </Grid>
      </>
      <Footer />
    </div>
  );
}
