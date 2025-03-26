import { useState, useEffect } from 'react';
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

import '../pages/Pay/Pay.css';
function Pricing() {
  const theme = createTheme();

  const tiers = [
    {
      title: 'Basic',
      price: '20',
      description: [
        '5 Movie Access',
        '2 Friends Allowed',
        'Help center access',
        'Email support',
      ],
      buttonText: 'Buy Now',
      buttonVariant: 'outlined',
      className: 'greenButton', // Add a custom class for the button
    },
    {
      title: 'Pro',
      subheader: 'Most popular',
      price: '30',
      description: [
        '10 Movie Access',
        '5 Friends Allowed',
        'Help center access',
        'Priority email support',
      ],
      buttonText: 'Buy Now',
      buttonVariant: 'contained',
      className: 'greenButton', // Add a custom class for the button
    },
    {
      title: 'Enterprise',
      price: '50',
      description: [
        'Unlimited Movie Access',
        '10 Friends Allowed',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Buy Now',
      buttonVariant: 'outlined',
      className: 'greenButton', // Add a custom class for the button
    },
  ];

  const [rzpInitialized, setRzpInitialized] = useState(false);

  useEffect(() => {
    // Load Razorpay SDK asynchronously
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setRzpInitialized(true);
      document.body.appendChild(script);
    };

    loadRazorpay();

    // Clean up
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const paymentHandler = async (amount, buttonText) => {
    if (!rzpInitialized) {
      console.error("Razorpay SDK not initialized.");
      return;
    }

    // Fetch order details from your server
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount: amount * 100, 
        currency: "INR",
        receipt: buttonText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    // Configure Razorpay options
    const options = {
      key: "rzp_test_7RrC1sgwqo6mBU",
      amount: order.amount,
      currency: order.currency,
      name: "Enterjoy",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        // Handle payment success
        console.log(response);
      },
      prefill: {
        name: "Enterjoy",
        email: "Enterjoy@example.com",
        contact: "9000000001",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Create Razorpay instance and open checkout
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      // Handle payment failure
      console.error(response.error);
    });
    rzp.open();
  };

  return (
    <div className='pay'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container disableGutters maxWidth="sm" component="main" sx={{}}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Pricing
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            We have 3 Subscriptions
          </Typography><br />
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center', style: { color: 'black' } }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{ align: 'center', color: '#dc3545' }}
                    sx={{
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                        background: `green `,
                      }

                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h4" color="#20c997">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{
                        // Adjust the font size as needed
                      }}>
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="h8"
                          align="left"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      sx={{
                        backgroundColor: tier.className === 'greenButton' ? '#20c997' : 'inherit',
                        color: tier.className === 'greenButton' ? 'black' : 'inherit',
                      }}
                      onClick={() => paymentHandler(tier.price, tier.buttonText)}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Pricing;
