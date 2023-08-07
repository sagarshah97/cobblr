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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
const ImageModal = ({
  open,
  handleClose,
  uploadedImages,
  handleImageUpload,
  setUploadedImages,
}) => {
  const handleDeleteImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  const handleImageDownload = (imageData) => {
    const a = document.createElement("a");
    a.href = "data:image/png;base64," + imageData.data;
    a.download = imageData.name;
    a.click();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add/Update Images</DialogTitle>
      <DialogContent>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="image-upload">
          <IconButton component="span">
            <AddPhotoAlternateIcon />
          </IconButton>
        </label>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image Name</TableCell>
                <TableCell>Remove</TableCell>
                <TableCell>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedImages.map((image, index) => (
                <TableRow key={index}>
                  <TableCell>{image.name}</TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      onClick={() => handleImageDownload(image)}
                    >
                      <DownloadIcon />
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

export default ImageModal;
