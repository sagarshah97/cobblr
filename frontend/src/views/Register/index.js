import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/Home/drawing-pair-converse-shoes_897419-89-_1_-removebg-preview.png";

// Material UI's template has been reffered https://github.com/mui/material-ui/tree/v5.13.5/docs/data/material/getting-started/templates/sign-in-side

const defaultTheme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const validateName = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  };

  const validatePassword = (password, confirmPassword) => {
    const isPasswordValid = password.length >= 8;
    const doPasswordsMatch = password === confirmPassword;

    setPasswordError(
      isPasswordValid ? "" : "Password should be at least 8 characters"
    );
    setConfirmPasswordError(doPasswordsMatch ? "" : "Passwords do not match");

    return isPasswordValid && doPasswordsMatch;
  };

  //   const handleFirstNameChange = (e) => {
  //     const value = e.target.value;
  //     setFirstName(value);
  //   };

  //   const handleLastNameChange = (e) => {
  //     const value = e.target.value;
  //     setLastName(value);
  //   };
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    if (value && !validateName(value)) {
      setFirstNameError("Please enter only letters");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    if (value && !validateName(value)) {
      setLastNameError("Please enter only letters");
    } else {
      setLastNameError("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (
  //     firstName &&
  //     lastName &&
  //     email &&
  //     password &&
  //     confirmPassword &&
  //     validateName(firstName) &&
  //     validateName(lastName) &&
  //     validateEmail(email) &&
  //     validatePassword(password, confirmPassword)
  //   ) {
  //     navigate("/login");
  //   } else {
  //     setFormError("Please fill all details correctly");
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePassword(password, confirmPassword)
    ) {
      try {
        const param = {
          firstName,
          lastName,
          email,
          password,
        };

        // const response = await
        axios
          .post("http://localhost:8000/users/register", param)
          .then((response) => {
            console.log(">>>> in resp " + JSON.stringify(response));
            if (response.status === 200) {
              // setRegistrationError("");
              setRegistrationError("Registration successful");
              setTimeout(() => {
                navigate("/login");
              }, 5000);
            } else {
              setRegistrationError("Registration failed. Please try again.");
              // setRegistrationMessage("");
            }
          })
          .catch((error) => {
            console.log(">>>> in error " + JSON.stringify(error));
            if (error.response && error.response.status === 409) {
              setRegistrationError(
                "Email already exists. Please use a different email."
              );
            } else {
              setRegistrationError("Registration failed. Please try again.");
            }
            // setRegistrationMessage("");
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormError("Please fill in all details correctly.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          // minHeight: "6vh",
          backgroundColor: "#0f0f0f",
          overflow: "hidden",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={0}
          md={7}
          lg={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "#0f0f0f",
            paddingTop: "5%",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          component={Paper}
          // elevation={6}
          square
          style={{
            backgroundColor: "#0f0f0f",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingTop: "5%",
              boxShadow: "none",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography
              component="h1"
              variant="h5"
              style={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: 100,
                letterSpacing: "0.3rem",
              }}
            >
              REGISTER
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, boxShadow: "none" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={handleFirstNameChange}
                error={firstName && !validateName(firstName)}
                // error={!!firstNameError}
                helperText={firstNameError}
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={handleLastNameChange}
                error={lastName && !validateName(lastName)}
                helperText={lastNameError}
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
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
              {formError && (
                <Typography variant="body2" color="error" align="center">
                  {formError}
                </Typography>
              )}
              {registrationError && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ color: "white" }}
                >
                  {registrationError}
                </Typography>
              )}

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div style={{ textAlign: "center" }}>
                <span style={{ color: "white" }}>
                  Already have an account?{" "}
                </span>
                <span
                  variant="body2"
                  onClick={() => navigate("/login")}
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Sign Up
                </span>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
