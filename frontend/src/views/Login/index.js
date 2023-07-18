import { useState } from "react";
// axios
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

// Material UI's template has been reffered https://github.com/mui/material-ui/tree/v5.13.5/docs/data/material/getting-started/templates/sign-in-side
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userId, setUserId] = useState("");
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
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

    if (!validateEmail(email)) {
      setLoginError("Please enter a valid email");
      return;
    }

    const params = {
      email,
      password,
    };

    axios
      .post("http://localhost:8000/users/login", params)
      .then((response) => {
        console.log(response);
        const { userId } = response.data;
        setUserId(userId);
        console.log(userId);
        if (response.status === 200) {
          // setRegistrationError("");
          setLoginError("Login successful");
          setTimeout(() => {
            navigate("/homepage");
          }, 3000);
        } else {
          setLoginError("Invalid Credentials. Please try again.");
          // setRegistrationMessage("");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError("Invalid Credentials. Please try again");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          // minHeight: "100vh",
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
              {/* <Grid container>
                <Grid item style={{}}> */}
              <Typography
                variant="body2"
                onClick={() => navigate("/register")}
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
              >
                {/* For now type any email and password and it will take you to the
                HomePage for the purpose of this proposal */}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
