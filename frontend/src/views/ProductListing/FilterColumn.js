//Author: Ashish Ojha (B00931967)
import React from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Button,
} from "@mui/material";

const FilterColumn = ({
  selectedFilters,
  handleFilterChange,
  handleResetFilters,
  isMobileScreen,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    handleFilterChange({ [name]: value });
  };

  const handleReset = () => {
    handleResetFilters();
  };

  const { sort = "", gender = "", size = "", price = "" } = selectedFilters;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="outlined"
        onClick={handleReset}
        sx={{ marginBottom: "8px" }}
      >
        Reset Filters
      </Button>
      {isMobileScreen && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Sort
          </Typography>
          <RadioGroup
            aria-label="Sort"
            name="sort"
            value={sort}
            onChange={handleChange}
          >
            <FormControlLabel
              control={<Radio sx={{ color: "#fff" }} />}
              value="sort1"
              label="Popular"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              control={<Radio sx={{ color: "#fff" }} />}
              value="sort2"
              label="Price: Low to High"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              control={<Radio sx={{ color: "#fff" }} />}
              value="sort3"
              label="Price: High to Low"
              sx={{ color: "#fff" }}
            />
          </RadioGroup>

          <Box sx={{ borderBottom: "1px solid #ccc", marginBottom: "8px" }} />
        </Box>
      )}
      <Typography variant="h6" gutterBottom>
        Gender
      </Typography>
      <RadioGroup
        aria-label="Gender"
        name="gender"
        value={gender}
        onChange={handleChange}
      >
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="Men"
          label="Men"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="Women"
          label="Women"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="Unisex"
          label="Unisex"
          sx={{ color: "#fff" }}
        />
      </RadioGroup>

      <Box sx={{ borderBottom: "1px solid #ccc", marginBottom: "8px" }} />
      <Typography variant="h6" gutterBottom>
        Size (US)
      </Typography>
      <RadioGroup
        aria-label="Size"
        name="size"
        value={size}
        onChange={handleChange}
      >
        {[
          { label: "W 7.5 / M 6", value: "US W 7.5 / M 6" },
          { label: "W 8 / M 6.5", value: "US W 8 / M 6.5" },
          { label: "W 8.5 / M 7", value: "US W 8.5 / M 7" },
          { label: "W 9 / M 7.5", value: "US W 9 / M 7.5" },
          { label: "W 9.5 / M 8", value: "US W 9.5 / M 8" },
          { label: "W 10 / M 8.5", value: "US W 10 / M 8.5" },
          { label: "W 10.5 / M 9", value: "US W 10.5 / M 9" },
        ].map((sizeOption) => (
          <FormControlLabel
            key={sizeOption.value}
            control={<Radio sx={{ color: "#fff" }} />}
            value={sizeOption.value}
            label={sizeOption.label}
            sx={{ color: "#fff", mb: "5px" }}
          />
        ))}
      </RadioGroup>

      <Box sx={{ borderBottom: "1px solid #ccc", marginBottom: "8px" }} />
      <Typography variant="h6" gutterBottom>
        Price
      </Typography>
      <RadioGroup
        aria-label="Price"
        name="price"
        value={price}
        onChange={handleChange}
      >
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="100"
          label="<100"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="100_200"
          label="100-200"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="200"
          label=">200"
          sx={{ color: "#fff" }}
        />
      </RadioGroup>
      <Button
        variant="outlined"
        onClick={handleReset}
        sx={{ marginTop: "8px" }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterColumn;
