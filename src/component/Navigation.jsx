import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import '../pages/Navigation/Navigation.css';

function Navigation() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className='navigation-bar'
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: 'black', // Set background color to black
        color: 'white', // Set text color to white
        '@media only screen and (min-width: 330px) and (max-width: 575px)': {
          backgroundColor: 'rgb(17, 12, 12)', // Change background color for the specified media query
          width: '1140px', // Change width for the specified media query
        },
        '@media only screen and (min-width: 576px) and (max-width: 800px)': {
          backgroundColor: 'rgb(17, 12, 12)', // Change background color for the specified media query
          width: '1140px', // Change width for the specified media query
        },
        '@media only screen and (min-width: 801px) and (max-width: 900px)': {
          backgroundColor: 'rgb(17, 12, 12)', // Change background color for the specified media query
          width: '830px', // Change width for the specified media query
        }
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
      <Typography 
  variant="h6" 
  color="inherit" 
  noWrap 
  sx={{ 
    flexGrow: 1,
    fontSize: '25px', // Default font size
    fontWeight: '900',
    '@media only screen and (min-width: 330px) and (max-width: 575px)': {
      fontSize: '50px', // Font size for screens between 330px and 575px
    },
    '&:hover': {
      color: 'white',
      backgroundColor: '', // Adjust the background color on hover as needed
    },
  }} 
  className='Navbar'
>
  
</Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5, color: 'white' }} // Set text color to white
          >
            <Link href="/" variant="outlined" color="text.primary" sx={{ 
    flexGrow: 1,
    fontSize: '13px', // Default font size
    fontWeight: '900',
    color:'white',
    '@media only screen and (min-width: 330px) and (max-width: 575px)': {
      fontSize: '28px',
      color:'white',
    },
    '&:hover': {
      color: 'white',
      backgroundColor: '', // Adjust the background color on hover as needed
    },
  }} >
              Home
            </Link>
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5, color: 'white' }} // Set text color to white
          >
            <Link href="/Pricing" variant="outlined" color="text.primary" sx={{ 
    flexGrow: 1,
    fontSize: '13px', // Default font size
    fontWeight: '900',
    color:'white',
    '@media only screen and (min-width: 330px) and (max-width: 575px)': {
      fontSize: '28px',
      color:'white',
    },
    '&:hover': {
      color: 'white',
      backgroundColor: '', // Adjust the background color on hover as needed
    },
  }}>
              Pricing
            </Link>
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5, color: 'white', }} // Set text color to white
          >
            <Link href="/SupportPage" variant="outlined" color="text.primary" sx={{ 
    flexGrow: 1,
    fontSize: '13px', // Default font size
    fontWeight: '900',
    color:'white',
    '@media only screen and (min-width: 330px) and (max-width: 575px)': {
      fontSize: '28px',
      color:'white',
    },
    '&:hover': {
      color: 'white',
      backgroundColor: '', // Adjust the background color on hover as needed
    },
  }}>
              Support
            </Link>
          </Link>
        </nav>
        <Button href="/NewSignIn" variant="outlined"  sx={{
    my: 1,
    mx: 1.5,
    color: 'black',
    fontSize: '12px',
    backgroundColor: 'aqua',
    '&:hover': {
      color: 'white', // Set text color to white on hover
      backgroundColor: 'black', // Adjust the background color on hover as needed
    },
    '@media only screen and (min-width: 330px) and (max-width: 575px)': {
      fontSize: '30px',
      color:'black',
    },
  }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
