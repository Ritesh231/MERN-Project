import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import robot from '../assets/robot4.png'
import '../pages/Album/Album.css';

import { Element } from 'react-scroll';

function TypewriterText() {
  const [text, setText] = React.useState('');
  const originalText = 'Shaping the Future of Automation';
  const delay = 100;
  const repeatDelay = 2000;

  const startTypewriter = () => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setText(originalText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > originalText.length) {
        clearInterval(intervalId);

        setTimeout(() => {
          setText('');
          currentIndex = 0;
          startTypewriter();
        }, repeatDelay);
      }
    }, delay);
  };

  React.useEffect(() => {
    startTypewriter();
  }, [repeatDelay]);

  return (
    <Typography
      component="div"
      className='title'
      style={{

        overflow: 'hidden',
      }}
      variant="h2"
      align="left"
      color="text.primary"
      gutterBottom
      sx={{ color: 'white', fontSize: '80px', lineHeight: '1', marginBottom: '150px', '@media only screen and (min-width: 330px) and (max-width: 575px)': {
        fontSize: '28px',
        color:'white',
        marginTop:'200px',
      }, }}
  >
      <div className='title1'> Welcome</div><div className='title2'> To Next Generation </div> <div className='title3'>Entertainment </div>
      <p className='para1'>Unlimited Latest Movies are available to watch.Choose your favourite movie,watch and be Happy.</p>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <ScrollLink to="section1" smooth={true} duration={200} offset={610} animate={true}>
          <div className="round-button">
            <div className="blinking-border"></div>
            <div className="arrow-icon">&#8226;</div>
          </div>
        </ScrollLink>
      </Stack>
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Album() {
  const cards = [1, 2, 3, 4, 5, 6]; // Define your cards array

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          id="section1"
        >
          <Container>
            {/* Text and Image Columns Side by Side */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 4,
              }}
            >
              {/* Text Column */}
              <Box sx={{ flexGrow: 1 }}>
                <TypewriterText />
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Element name="section2">

                    {/* Your content for Section 2 */}
                  </Element>
                </Stack>
              </Box>

              {/* Image Column */}
              <Box >
                <img
                  src={robot}  // Add your image source
                  alt="Robotics"
                  className="img-box"
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Section 2 */}

      </main>
    </ThemeProvider>
  );
}
