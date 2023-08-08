import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import invalidSession from "../assets/images/sessionInvalid.png";

const UnauthorizedModal = () => {
  let navigate = useNavigate();
  const onClose = () => {
    window.sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Dialog open={true} onClose={onClose} style={{ textAlign: "center" }}>
      <DialogContent style={{ backgroundColor: "#3d3d3d", color: "white" }}>
        <img
          src={invalidSession}
          alt="Unauthorized"
          height="300px"
          width="300px"
        />
        <DialogTitle
          style={{
            backgroundColor: "#3d3d3d",
            color: "white",
          }}
        >
          Session timed out!
        </DialogTitle>

        <Typography variant="body1" style={{ paddingBottom: "5%" }}>
          Your session timed out due to inactivity. Please login again
        </Typography>
        <Button
          variant="outlined"
          onClick={onClose}
          style={{ marginTop: "5%", borderColor: "#64c6ff", color: "#64c6ff" }}
        >
          Go to Login Page
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UnauthorizedModal;
