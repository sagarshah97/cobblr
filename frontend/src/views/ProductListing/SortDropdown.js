//Author: Ashish Ojha (B00931967)
import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import "../../App.css";

const SortDropdown = ({ value, handleSortChange }) => {
  return (
    <Box sx={{ borderRadius: 4, position: "sticky" }}>
      <FormControl variant="outlined" sx={{ width: "100%" }}>
        <InputLabel sx={{ color: "#fff" }} id="sort-label">
          Sort
        </InputLabel>
        <Select
          labelId="sort-label"
          label="Sort"
          value={value}
          onChange={handleSortChange}
          fullWidth
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                backgroundColor: "#262626",
              },
            },
          }}
          sx={{
            height: "100%",
            "& .MuiOutlinedInput-input": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "& .MuiSelect-icon": {
              color: "#fff",
            },
            "&:hover": {
              "& .MuiOutlinedInput-input": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "& .MuiSelect-icon": {
                color: "#fff",
              },
            },
          }}
        >
          <MenuItem value="sort1" sx={{ color: "#fff" }}>
            Popular
          </MenuItem>
          <MenuItem value="sort2" sx={{ color: "#fff" }}>
            Price: Low to High
          </MenuItem>
          <MenuItem value="sort3" sx={{ color: "#fff" }}>
            Price: High to Low
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
