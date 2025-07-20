import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const Home = () => {
  return (
    <>
      {/* Navbar */}
 

      {/* Landing Section */}
     <Box
      sx={{
    minHeight: '100vh',
    width: '100%',
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/shocase.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'right center', // 👈 aligns the image to the right
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
  }}
    >
      <Box>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Developer Forum
          </Typography>
          <Typography variant="h6" mb={4}>
            Create a developer profile/portfolio, share posts and get help from other developers
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" href="/register">
              Sign Up
            </Button>
            <Button variant="outlined" color="inherit" href="/login">
              Login
            </Button>
          </Stack>
        </Container>
         </Box>
      </Box>
    </>
  );
};

export default Home;