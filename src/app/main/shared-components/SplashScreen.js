import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48rem',
          maxWidth: '48rem',
          height: 'auto',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: '3.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4rem',
            lineHeight: '1.25',
            letterSpacing: '-0.025rem',
            background:
              '-webkit-linear-gradient(90deg, rgba(94,14,198,1) 0%, rgba(63,27,116,1) 69%, rgba(80,14,175,1) 92%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Digitinary
        </Typography>
        <LinearProgress
          color="inherit"
          sx={{
            width: '100%',
            height: '0.8rem',
            borderRadius: '0.4rem',

            '& .MuiLinearProgress-bar': {
              backgroundColor: '#5E0EC6',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SplashScreen;
