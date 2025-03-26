import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Album from './Album';
import Navigation from './Navigation';
import Textlayout from './textLayout';
import Paymentplan from '../component/Paymentplan'
import logo from '../assets/Logo5.svg';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Basic',
    price: '20',
    description: [
      '10 Movie Access',
      '2 Friends',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '30',
    description: [
      '20 Movie Access',
      '5 Friends Allowed',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '50',
    description: [
      '50 Movie Access',
      '10 Friends Allowed',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Navigation />
      {/* Hero unit */}
      <Album></Album>
   <Textlayout/>
   <Paymentplan/>
      {/* Footer */}
      <Container
  maxWidth="xll"
  component="footer"
  sx={{
    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
    py: [7, 6],
    width: '100%',
    backgroundColor: 'black',
    '@media only screen and (max-width: 675px)': {
      flexDirection: 'column',
      width: '1140px', // Change flex direction to column
    },
    '@media only screen and (min-width:700px) and  (max-width:800px)': {
      flexDirection: 'column',
      width: '1140px', // Change flex direction to column
    },
  }}
>
  <Grid container spacing={2} justifyContent="space-between" alignItems="center">
    {/* Centered position for logo on mobile view */}
    <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 2 }, textAlign: 'center' }}>
      <img  alt="Company Logo" style={{ width: '350px', margin: '0 auto 10px' }} />
      <Typography variant="subtitle1" style={{ color: 'white' }}>
        {/* Add your company text here */}
      </Typography>
    </Grid>

    {/* Footer titles and subtitles */}
    <Grid style={{gap:"140%",paddingRight:"36%"}} item xs={12} sm={6} sx={{ order: { xs: 1, sm: 1 }, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
  {footers.map((footer) => (
    <div key={footer.title}>
      <Typography variant="h5" color="white" gutterBottom sx={{ fontSize: { xs: '24px', sm: '21px', md: '32px' } }}>
        {footer.title}
      </Typography>
      <ul>
        {footer.description.map((item) => (
          <li key={item}>
            <Link href="#" variant="subtitle1" style={{ color: 'white', fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ))}
</Grid>
  </Grid>
  <Copyright sx={{ mt: 2 }} style={{ color: 'white', fontSize: '13px' }} />
</Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
