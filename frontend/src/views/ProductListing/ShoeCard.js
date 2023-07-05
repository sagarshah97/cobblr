import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const ShoeCard = ({ shoe }) => {
  const handleClick = () => {
    console.log(shoe.name);
  };

  return (
    <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' } }} onClick={handleClick}>
      <CardMedia component="img" height="200" src={shoe.image} alt={shoe.name} />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h7" component="div">
            {shoe.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              ${shoe.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShoeCard;
