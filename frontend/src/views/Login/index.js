// Author: Sahil Dilip Dalvi (B00939343)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import logo from "../../assets/images/Home/logo-illustration-vintage-sneakers-shoes-retro-style_194708-640-removebg-preview.png";
import axios from "axios";
import { Modal } from "@mui/material";
import Loader from "../../utils/Loader";

// Material UI's template has been reffered https://github.com/mui/material-ui/tree/v5.13.5/docs/data/material/getting-started/templates/sign-in-side
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [spinner, setSpinner] = useState(false);
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [emailInput, setEmailInput] = useState("");
  const handlePasswordResetSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    closeModal();
    try {
      const response = await axios.post("/users/forgotpassword", {
        email: emailInput,
      });

      if (response.status === 200) {
      } else if (response.status === 404) {
      } else {
      }
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
    }
  };

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
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

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    if (!validateEmail(email)) {
      setLoginError("Please enter a valid email");
      return;
    }

    const params = {
      email,
      password,
    };

    axios
      .post("/users/login", params)
      .then((response) => {
        if (response.status === 200) {
          const { userId } = response.data;
          const { token } = response.data;
          const { Role } = response.data;
          setUserId(userId);
          setToken(token);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("token", token);

          setLoginError("Login successful");
          if (Role === "Admin") {
            setTimeout(() => {
              setSpinner(false);
              navigate("/admin");
            }, 3000);
          } else {
            setTimeout(() => {
              setSpinner(false);
              navigate("/homepage");
            }, 3000);
          }
        } else {
          setSpinner(false);
          setLoginError("Invalid Credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setSpinner(false);
        setLoginError("Invalid Credentials. Please try again");
      });
  };

  return (
    <Box
      sx={{
        color: "#fff",
        backgroundColor: "#0f0f0f",
        width: "100%",
        minHeight: "100vH",
      }}
    >
      <Grid
        container
        component="main"
        sx={{
          backgroundColor: "#0f0f0f",
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
            minHeight: "100vh",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          component={Paper}
          square
          style={{
            backgroundColor: "#0f0f0f",
            boxShadow: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              LOGIN
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {loginError && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ color: "white" }}
                >
                  {loginError}
                </Typography>
              )}

              <Typography
                variant="h6"
                onClick={openModal}
                sx={{
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                  textAlign: "center",
                  paddingTop: "2%",
                }}
              >
                Forgot Password
              </Typography>

              <Modal open={isModalOpen} onClose={closeModal} centered>
                <div
                  className="modal"
                  style={{
                    background: "white",
                    width: "300px",
                    margin: "auto",
                    marginTop: "20vh",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Forgot Password
                  </Typography>
                  <form onSubmit={handlePasswordResetSubmit}>
                    <TextField
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleEmailInputChange}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                    <Typography
                      style={{
                        paddingTop: "5%",
                        fontStyle: "italic",
                        fontSize: "14px",
                      }}
                    >
                      After submiting, please check your email
                    </Typography>
                  </form>
                </div>
              </Modal>
              <div style={{ textAlign: "center" }}>
                <span style={{ color: "white" }}>Dont have an account? </span>
                <span
                  variant="body2"
                  onClick={() => navigate("/register")}
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
              <Typography
                sx={{
                  marginTop: "80px",
                  color: "lightgrey",
                  textAlign: "center",
                }}
              ></Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {spinner && <Loader />}
    </Box>
  );
}
