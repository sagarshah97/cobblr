import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import spinnerWhite from "../assets/images/spinner-white.png";
import spinnerBlack from "../assets/images/spinner-black.png";
export default function Loader(props) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleClose = () => {};
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
