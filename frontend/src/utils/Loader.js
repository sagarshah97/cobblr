// Author: Aayush Yogesh Pandya (B00939670)

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import spinnerWhite from "../assets/images/spinner-white.png";
import spinnerBlack from "../assets/images/spinner-black.png";
import "../Spinner.css";

export default function Loader(props) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) =>
            Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
        }}
        open={true}
      >
        {props?.color === "black" ? (
          <img className="spinner-image" src={spinnerBlack} alt="Spinner" />
        ) : (
          <img className="spinner-image" src={spinnerWhite} alt="Spinner" />
        )}
      </Backdrop>
    </div>
  );
}
