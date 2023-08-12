// Author: Sahil Dilip Dalvi (B00939343)
import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const CustomModal = () => {
  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    outline: "none",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    width: "300px",
    height: "250px",
  };

  const iconStyle = {
    position: "absolute",
    top: "10px",
    right: "auto",
    bottom: "auto",
    left: "50%",
    transform: "translateX(-50%)",
    cursor: "pointer",
    color: "red",
    fontSize: "52px",
  };
  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const navigate = useNavigate();

  return (
    <Modal open>
      <div style={modalStyle}>
        <CancelIcon style={iconStyle} sx={{ marginTop: "30px" }} />
        {/* <img src={CancelIcon} alt="Cancel" style={iconStyle} /> */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginTop: "70px", fontFamily: "Your Custom Font" }}
        >
          Login to explore more
        </Typography>
        <Button
          sx={{ marginTop: "10px" }}
          variant="contained"
          className="cool-button"
          style={buttonStyle}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
