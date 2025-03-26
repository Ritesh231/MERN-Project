// YourNewComponent.jsx
import React from 'react';
import { Element } from 'react-scroll';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import '../pages/Paymentplan/Paymentplan.css';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function YourNewComponent() {
  return (
    <div>
      <Element name="section3">
        <div className="section3-content">
          <div className="section3-inner">
            <div className="section3-text-container">
              <h1>Let's try our services now!</h1>
              <p>Everything you need for secure your society <br />and organization get from us.</p>
            </div>
            <div className="button-container">
              <Button variant="contained"  src sx={{ backgroundColor: 'aqua', color: 'black', width: '200px', 
      height: '60px',  borderRadius: '15px', fontSize: '24px',}}  component="a"
                href="/Pricing">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
}

export default YourNewComponent;
``
