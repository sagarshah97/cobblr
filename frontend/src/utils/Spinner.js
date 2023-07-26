import React from "react";
import "../Spinner.css";
import spinner from "../assets/images/spinner.png";

const CustomSpinner = () => {
  return (
    <div className="spinner-container">
      <img className="spinner-image" src={spinner} alt="Spinner" />
    </div>
  );
};

export default CustomSpinner;
