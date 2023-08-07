import React from "react";
import { Button, Modal, Paper, Typography, Grid } from "@mui/material";

const GenericModal = ({
  open,
  onClose,
  onButtonClick,
  heading,
  content,
  buttonLabel1,
  buttonColor1,
  buttonLabel2,
  buttonColor2,
}) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const paperStyle = {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    padding: "2%",
    margin: "4%",
    width: "30rem",
  };

  const buttonStyle = {
    marginTop: "16px",
  };

  const handleButtonClick = (event) => {
    onButtonClick(event.target.value);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} style={modalStyle}>
        <Paper style={paperStyle}>
          <Typography
            component="h2"
            style={{
              paddingBottom: "8%",
              paddingLeft: "2%",
              paddingRight: "2%",
              paddingTop: "3%",
              fontSize: "1.5rem",
              fontWeight: 200,
            }}
          >
            {heading}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            style={{
              paddingBottom: "10%",
              paddingLeft: "2%",
              paddingRight: "2%",
              fontSize: "1rem",
              fontWeight: 200,
            }}
          >
            {content}
          </Typography>
          <Grid
            container
            spacing={1}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                color={buttonColor1}
                style={buttonStyle}
                value={buttonLabel1}
                onClick={handleButtonClick}
              >
                {buttonLabel1}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={buttonColor2}
                style={buttonStyle}
                value={buttonLabel2}
                onClick={handleButtonClick}
              >
                {buttonLabel2}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
};

export default GenericModal;
