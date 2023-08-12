import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AvailableQuantitiesModal = ({
  open,
  handleClose,
  availableQuantities,
  setAvailableQuantities,
}) => {
  const handleQuantityChange = (index, value) => {
    const updatedAvailableQuantity = [...availableQuantities];
    updatedAvailableQuantity[index].quantity = value;
    setAvailableQuantities(updatedAvailableQuantity);
  };
  const initialQuantities = [
    {
      size: "US W 5 / M 3.5",
      quantity: 0,
    },
    {
      size: "US W 5.5 / M 4",
      quantity: 0,
    },
    {
      size: "US W 6 / M 4.5",
      quantity: 0,
    },
    {
      size: "US W 6.5 / M 5",
      quantity: 0,
    },
    {
      size: "US W 7 / M 5.5",
      quantity: 0,
    },
    {
      size: "US W 8.5 / M 7",
      quantity: 0,
    },
    {
      size: "US W 9 / M 7.5",
      quantity: 0,
    },
    {
      size: "US W 9.5 / M 8",
      quantity: 0,
    },
    {
      size: "US W 10 / M 8.5",
      quantity: 0,
    },
    {
      size: "US W 10.5 / M 9",
      quantity: 0,
    },
    {
      size: "US W 11 / M 9.5",
      quantity: 0,
    },
    {
      size: "US W 11.5 / M 10",
      quantity: 0,
    },
    {
      size: "US W 12 / M 10.5",
      quantity: 0,
    },
  ];
  if (availableQuantities?.length == 0) {
    setAvailableQuantities(initialQuantities);
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add/Edit Available Quantities</DialogTitle>
      <DialogContent>
        {availableQuantities && (
          <>
            {availableQuantities.map((item, index) => (
              <Grid container spacing={1} sx={{ marginBottom: "1%" }}>
                <Grid item xs={6}>
                  <TextField fullWidth value={item.size} />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={item.quantity}
                    onChange={(e) => {
                      handleQuantityChange(index, e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvailableQuantitiesModal;
