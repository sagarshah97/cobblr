import React from 'react';
import { FormControlLabel, Radio, RadioGroup, Box, Typography, Button } from '@mui/material';

const FilterColumn = ({ selectedFilters, handleFilterChange, handleResetFilters }) => {
  console.log('Selected Filters:', selectedFilters);

  const handleChange = (event) => {
    const { name, value } = event.target;
    handleFilterChange({ [name]: value });
  };

  const handleReset = () => {
    handleResetFilters();
  };

  const { gender = '', size = '', price = '' } = selectedFilters;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Gender
      </Typography>
      <RadioGroup aria-label="Gender" name="gender" value={gender} onChange={handleChange}>
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="M"
          label="Men"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="W"
          label="Women"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="U"
          label="Unisex"
          sx={{ color: '#fff' }}
        />
      </RadioGroup>

      <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: '8px' }} />
      <Typography variant="h6" gutterBottom>
        Size
      </Typography>
      <RadioGroup aria-label="Size" name="size" value={size} onChange={handleChange}>
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="6"
          label="6"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="7"
          label="7"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="8"
          label="8"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="9"
          label="9"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="10"
          label="10"
          sx={{ color: '#fff' }}
        />
      </RadioGroup>

      <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: '8px' }} />
      <Typography variant="h6" gutterBottom>
        Price
      </Typography>
      <RadioGroup aria-label="Price" name="price" value={price} onChange={handleChange}>
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="100"
          label="<100"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="100_200"
          label="100-200"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={<Radio sx={{ color: '#fff' }} />}
          value="200"
          label=">200"
          sx={{ color: '#fff' }}
        />
      </RadioGroup>

      <Button variant="outlined" onClick={handleReset} sx={{ marginTop: '16px' }}>
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterColumn;
