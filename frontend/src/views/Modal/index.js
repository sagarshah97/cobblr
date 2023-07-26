import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
// import CancelIcon from "../../assets/Home/lock.png";
// import "./CustomModal.css"; // Import your custom CSS file for additional styles

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
    borderRadius: "12px", // Add slightly curved edges
    padding: "30px", // Increase the padding for a bigger modal
    outline: "none",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
    width: "300px", // Adjust the width as needed
    height: "250px", // Adjust the height as needed
  };

  const iconStyle = {
    position: "absolute",
    top: "10px", // Move the icon to the top center
    right: "auto",
    bottom: "auto",
    left: "50%", // Move the icon to the center horizontally
    transform: "translateX(-50%)", // Center the icon horizontally
    cursor: "pointer",
    color: "red", // Set the cross color to red
    fontSize: "52px", // Adjust the icon size as needed
  };
  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    // Add more styles as needed...
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
