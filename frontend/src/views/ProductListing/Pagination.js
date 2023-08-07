//Author: Ashish Ojha (B00931967)
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "../../App.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }} spacing={2}>
      {currentPage > 1 && (
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>
      )}
      <Typography variant="outlined" className="custom-current-page">
        {currentPage}
      </Typography>
      {currentPage < totalPages && (
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default Pagination;
