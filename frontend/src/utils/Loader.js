import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import spinner from "../assets/images/spinner.png";
export default function Loader() {
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
        <img className="spinner-image" src={spinner} alt="Spinner" />
      </Backdrop>
    </div>
  );
}
