 import React from 'react'
 import { AppBar, Toolbar, Typography, Box, Button, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
 const Navbar = () => {
   return (
     <>    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <CodeIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="a" href="/" sx={{ textDecoration: 'none', color: '#fff' }}>
              DevForum
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" href="/profiles">Developers</Button>
            <Button color="inherit" href="/register">Register</Button>
            <Button color="inherit" href="/login">Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      </>
   )
 }
 
 export default Navbar