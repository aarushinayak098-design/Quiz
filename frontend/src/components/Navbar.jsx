import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700,  }}>
            Quiz App
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  const homeLink = user?.role === 'admin' ? '/admin' : '/client';

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          Quiz App
        </Typography>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {user.name && (
              <Chip
                label={`Hi, ${user.name}`}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.16)', color: 'white' }}
              />
            )}
            {user.role === 'admin' ? (
              <>
                <Button color="inherit" component={Link} to="/admin">
                  Admin Panel
                </Button>
                <Button color="inherit" component={Link} to="/client">
                  Client Side
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to={homeLink}>
                Client Side
              </Button>
            )}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
