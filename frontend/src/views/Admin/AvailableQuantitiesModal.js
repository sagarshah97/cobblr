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

const AvailableQuantitiesModal = ({ open, handleClose, handleAddQuantity }) => {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [availableQuantities, setAvailableQuantities] = useState([]);

  const handleAddSizeAndQuantity = () => {
    if (size && quantity) {
      setAvailableQuantities([...availableQuantities, { size, quantity }]);
      setSize("");
      setQuantity("");
    }
  };

  const handleDeleteQuantity = (index) => {
    const updatedQuantities = [...availableQuantities];
    updatedQuantities.splice(index, 1);
    setAvailableQuantities(updatedQuantities);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Available Quantities</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <TextField
              label="Size"
              variant="outlined"
              fullWidth
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={handleAddSizeAndQuantity}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableQuantities.map((quantityData, index) => (
                <TableRow key={index}>
                  <TableCell>{quantityData.size}</TableCell>
                  <TableCell>{quantityData.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteQuantity(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
