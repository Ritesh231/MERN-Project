import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const styles = `
  @keyframes blinkBorder {
    0%, 100% { border-color: transparent; }
    50% { border-color: #FBB741; }
  }

 
`;

export default function SimpleContainer() {
  const videoWidth = 700; // Set your video width
  const videoHeight = 350; // Set your video height

  const [harmfulNotificationActive, setHarmfulNotificationActive] = useState(false);

  useEffect(() => {
    // Simulating harmful notification arrival for testing purposes
    const notificationTimeout = setTimeout(() => {
      setHarmfulNotificationActive(true);

      // Reset harmfulNotificationActive after 2 seconds (adjust as needed)
      setTimeout(() => {
        setHarmfulNotificationActive(false);
      }, 2000);
    }, 5000); // Delay for 5 seconds (adjust as needed)

    // Cleanup the timeout on component unmount
    return () => clearTimeout(notificationTimeout);
  }, []); // Empty dependency array ensures it runs only once

  return (
    <React.Fragment>
      <CssBaseline />
      <style>{styles}</style>
      <Container maxWidth={false} disableGutters sx={{ paddingLeft: 2.5 }} className='video-container'>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '',
            width: videoWidth,
            height: videoHeight,
            // for circular shape
            // initial border styling
            animation: harmfulNotificationActive ? 'blinkBorder 1s infinite' : 'none', // blink animation
            transition: 'border-radius 0.5s, box-shadow 0.5s, border 0.5s', // for animating border-radius, box-shadow, and border
            '&:hover': {
              borderRadius: '10px', // adjust the percentage based on your preference
               // adding box shadow for an animated effect on hover
               // border styling on hover
            },
          }}
        >
          <video 
            style={{
              width: '100%',
              height:window.innerWidth <=768 ? '50%':'100%',
              marginLeft:innerWidth <=768 ? '400px':'',
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: 'inherit', // inherit the border-radius to make the video fit the rounded container
            }}
            controls
            autoPlay
            id='video'
          >
            <source src="your-video-file.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Container>
    </React.Fragment>
  );
}
