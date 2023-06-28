import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

import "../../App.css";


const SortDropdown = ({ value, handleSortChange }) => {
  return (
    <Box sx={{ p: 2, borderRadius: 4, position: 'sticky' }}>
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <InputLabel sx={{ color: '#fff' }} id="sort-label">
          Sort
        </InputLabel>
        <Select
          labelId="sort-label"
          label="Sort"
          value={value}
          onChange={handleSortChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                backgroundColor: '#000',
              },
            },
          }}
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiOutlinedInput-input': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '& .MuiSelect-icon': {
              color: '#fff',
            },
          }}
        >
          <MenuItem value="sort1" sx={{ color: '#fff' }}>
            Popular
          </MenuItem>
          <MenuItem value="sort2" sx={{ color: '#fff' }}>
            Price: Low to High
          </MenuItem>
          <MenuItem value="sort3" sx={{ color: '#fff' }}>
            Price: High to Low
          </MenuItem>
          {/* Add more sort options */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
