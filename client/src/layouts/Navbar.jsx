import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <CodeIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: '#fff' }}
          >
            DevForum
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          {
            token ? (
              <>

                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>

              </>
            )

              : (
                <>
                  <Button color="inherit" component={Link} to="/profiles">
                    Developers
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                </>

              )
          }



        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;