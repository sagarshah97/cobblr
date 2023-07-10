import { Snackbar, Alert } from "@mui/material";

const Snackbars = (props) => {
  const detail = props.details;

  return (
    <>
      <Snackbar
        open={detail.show}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => props.onClickHandler(false)}
      >
        <Alert
          severity={detail.variant}
          variant="filled"
          onClose={() => props.onClickHandler(false)}
        >
          {detail.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Snackbars;
