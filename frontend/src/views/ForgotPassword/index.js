// Author: Sahil Dilip Dalvi (B00939343)
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPasswordToken } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/users/updatepassword", {
        password,
        forgotPasswordToken,
      });

      if (response.status === 200) {
        setMessage("Password changed successfully");
        navigate("/login");
      } else {
        setMessage("Failed to change password");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to change password");
    }
  };

  const handleCloseMessage = () => {
    setMessage("");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Box
          component="form"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& label": {
                color: "white",
              },
              "& input": {
                background: "white",
              },
            }}
          />
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& label": {
                color: "white",
              },
              "& input": {
                background: "white",
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Change Password
          </Button>
        </Box>
        <Snackbar
          open={Boolean(message)}
          autoHideDuration={5000}
          onClose={handleCloseMessage}
          message={message}
        />
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
