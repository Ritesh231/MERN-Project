import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const settings = ['Profile', 'LogOut'];

function Navigation({srcImg}){
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate(); 

  const[anchorUser,setAnchorUser]=React.useState(null);

  const openUserMenu=(event)=>{
    setAnchorUser(event.currentTarget)
  }
  const closeUserMenu=()=>{
    setAnchorUser(null)
  } 
  const navigateToProfile = () => {
    navigate('/Profile');
    closeUserMenu();
  };
  const opneNav=()=>{
    console.log("hello")
  }

    return(
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ 
          borderBottom: (theme) => `0.5px solid ${theme.palette.divider}`,
          backgroundColor: 'rgba(0, 3, 8, 0.649)',
          color: 'white',
          height: '50px',
          '@media (max-width: 400px)': {
            width: '400px', // Adjust height for smaller screens
          },
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Movies
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ color: 'white', marginBottom: { xs: "20px", md: "0px"} }}
            >
              <Link href="/" variant="outlined" color="text.primary" sx={{ my: 1, mx: 1.5, color: 'white', paddingTop: { xs: '20px', md: '0px' } }}>
                Home
              </Link>
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/UserHomePage/NewPrice"
              sx={{ my: 1, mx: 1.5, color: 'white' }}
            >
              Pricing
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              <Link href="/SupportPage" variant="outlined" color="text.primary" sx={{ my: 1, mx: 1.5, color: 'white' }}>
                Support
              </Link>
            </Link>
          </nav>
          <Stack direction="row" spacing={2}>
            <IconButton onClick={openUserMenu}>
              <div>
                {(location.pathname === "/UserHomePage" || Object.keys(user).length !== 0) && (
                  <div style={{ marginBottom: '10px' }}>
                    <Avatar alt={user.image} src={srcImg} />
                  </div>
                )}
              </div>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorUser}
              open={Boolean(anchorUser)}
              onClose={closeUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Profile' ? navigateToProfile : closeUserMenu}>
                  <Typography>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    )
}

export default Navigation;
