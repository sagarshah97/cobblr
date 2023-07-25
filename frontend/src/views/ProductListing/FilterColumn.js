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
  //handleApplyFilters,
  isMobileScreen,
}) => {
  console.log("Selected Filters:", selectedFilters);

  const handleChange = (event) => {
    const { name, value } = event.target;
    handleFilterChange({ [name]: value });
  };

  const handleReset = () => {
    handleResetFilters();
  };

  // const handleApply = () => {
  //   handleApplyFilters();
  // };

  const { sort = "", gender = "", size = "", price = "" } = selectedFilters;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          value="Male"
          label="Male"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="Female"
          label="Female"
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
        Size
      </Typography>
      <RadioGroup
        aria-label="Size"
        name="size"
        value={size}
        onChange={handleChange}
      >
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 5.5 / M 4.5"
          label="US W 5.5 / M 4.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 6 / M 5"
          label="US W 6 / M 5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 6.5 / M 5.5"
          label="US W 6.5 / M 5.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 7.5 / M 6"
          label="US W 7.5 / M 6"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 7.5 / M 6.5"
          label="US W 7.5 / M 6.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 8 / M 7"
          label="US W 8 / M 7"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 8.5 / M 8"
          label="US W 8.5 / M 8"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 9 / M 8.5"
          label="US W 9 / M 8.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 9.5 / M 9"
          label="US W 9.5 / M 9"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 10 / M 9.5"
          label="US W 10 / M 9.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 10.5 / M 10"
          label="US W 10.5 / M 10"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 11 / M 10.5"
          label="US W 11 / M 10.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 11.5 / M 11"
          label="US W 11.5 / M 11"
          sx={{ color: "#fff" }}
        />
        {/* <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 12 / M 11.5"
          label="US W 12 / M 11.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 12.5 / M 12"
          label="US W 12.5 / M 12"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 13 / M 12.5"
          label="US W 13 / M 12.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 13.5 / M 13"
          label="US W 13.5 / M 13"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 14 / M 13.5"
          label="US W 14 / M 13.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 15 / M 14"
          label="US W 15 / M 14"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 15.5 / M 14.5"
          label="US W 15.5 / M 14.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 16 / M 15"
          label="US W 16 / M 15"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 16.5 / M 15.5"
          label="US W 16.5 / M 15.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 17 / M 16"
          label="US W 17 / M 16"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 17.5 / M 16.5"
          label="US W 17.5 / M 16.5"
          sx={{ color: "#fff" }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: "#fff" }} />}
          value="US W 18 / M 17"
          label="US W 18 / M 17"
          sx={{ color: "#fff" }}
        /> */}
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

      {/* {isMobileScreen && (
        <Button
          variant="outlined"
          onClick={handleApply}
          sx={{ marginTop: "16px" }}
        >
          Apply Filters
        </Button>
      )} */}
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
