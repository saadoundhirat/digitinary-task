import React from 'react';
import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <img
        style={{
          width: '20rem',
        }}
        src="assets/images/logo/logo.png"
        alt="logo"
        loading="lazy"
      />
    </Box>
  );
};

export default Logo;
