import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import NotificationBar from '../../../component/NotificationBar';
import Switch from '../../../component/Switch';
import Container from '../../../component/Container';
import Pagenumber2 from '../../../component/pagenumber2';
import Select2 from '../../../component/Select2';
import '../../NewSignUp/Payment1/Payment2.css';
import '../../NewSignUp/Payment1/Payment1.css';

function UserHomePage() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState('success');
  const [notificationData, setNotificationData] = useState({
    plate: '',
    isHarmful: false,
  });

  useEffect(() => {
    // Start generating notifications every 10 seconds
    const notificationInterval = setInterval(() => {
      generateRandomNotification();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(notificationInterval);
  }, []); // Empty dependency array ensures it runs only once

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    setNotificationSeverity('success');
  };

  const handleNotificationClick = (isHarmful, plate) => {
    // Set blinkBorder only for harmful notifications
    setNotificationSeverity(isHarmful ? 'error' : 'success');

    // Send notification data to the backend
    const notificationData = {
      plate,
      isHarmful,
    };

    fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    })
      .then(response => response.json())
      .then(data => console.log('Notification data sent to backend:', data))
      .catch(error => console.error('Error sending notification data to backend:', error));
  };

  const generateRandomNotification = () => {
    // Generate a random notification
    const isHarmful = Math.random() < 0.5; // 50% chance of being harmful
    const plate = isHarmful ? 'GJ 12 SH 3241' : 'MH 20 PH 9923';

    handleNotificationClick(isHarmful, plate);

    setNotificationData({
      plate,
      isHarmful,
    });
    setNotificationOpen(true);
  };

  return (
    <div
      style={{
        background: 'white',
        height: '100vh',
        position: 'relative',
        boxShadow:
          notificationSeverity === 'error'
            ? 'inset 0 0 110px red'
            : 'none',
        animation:
          notificationSeverity === 'error' ? 'blinking 0.1s linear infinite' : 'none',
      }}
    >
     
        {/* Buttons above the video box on the right side */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '',
              marginTop:'100px',
              marginRight: '100px',
            }}
          >
            <Container />
          </div>
          <div className='container2'>
            <Select2 />
            <br />
            <Switch />
          </div>
        </div>
        {/* Replace with your Video Box (Container component) */}
        {/* Other content */}
        <div style={{ marginTop: '20px', width: '100%' }}>
          <div style={{ paddingLeft: 670, position: 'relative' }}>
            <div style={{ position: 'absolute' }}>
            </div>
          </div>
          <br />
        </div>
      

      {/* Notification Bar */}
      <div style={{ position: 'absolute', right: 0, top: 0 }}>
        <NotificationBar
          open={notificationOpen}
          handleClose={handleNotificationClose}
          message={`Notification: ${notificationData.plate} is ${
            notificationData.isHarmful ? 'harmful' : 'useful'
          }.`}
          severity={notificationSeverity}
        />
      </div>
    </div>
  );
}

export default UserHomePage;
