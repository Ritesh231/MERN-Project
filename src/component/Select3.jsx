import React, { useState } from 'react';

export default function CameraButtons() {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [hoveredCamera, setHoveredCamera] = useState(null);

  const handleCameraClick = (cameraNumber) => {
    setSelectedCamera(cameraNumber);
  };

  const handleMouseEnter = (cameraNumber) => {
    setHoveredCamera(cameraNumber);
  };

  const handleMouseLeave = () => {
    setHoveredCamera(null);
  };

  const cameraNumbers = Array.from({ length: 50 }, (_, index) => index + 1);

  const colors = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];

  return (
    <div>
      {cameraNumbers.map((cameraNumber, index) => (
        <React.Fragment key={cameraNumber}>
          <button
            onClick={() => handleCameraClick(cameraNumber)}
            onMouseEnter={() => handleMouseEnter(cameraNumber)}
            onMouseLeave={handleMouseLeave}
            className={`camera-button ${selectedCamera === cameraNumber ? 'selected' : ''}`}
            style={{
              padding: '10px',
              margin: '10px',
              backgroundColor:
                selectedCamera === cameraNumber
                  ? colors[index % colors.length] // Use selected color if clicked
                  : hoveredCamera === cameraNumber
                  ? colors[index % colors.length] // Use hover color if hovered
                  : 'white', // Default color
              color: selectedCamera === cameraNumber ? 'white' : 'black',
              border: '1px solid black',
              cursor: 'pointer',
              flex: 1,
              maxWidth: '33%',
              boxSizing: 'border-box',
              borderRadius: '30%',
              transition: 'background-color 0.3s, transform 0.3s',
              transform: selectedCamera === cameraNumber ? 'scale(1.2)' : 'scale(1)',
              ...(cameraNumber < 10 && { fontSize: '17px' }),
              ...(cameraNumber > 10 && { fontSize: '14px', height: '50px' }),
            }}
          >
            Cam {cameraNumber}
          </button>

          {(index + 1) % 5 === 0 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
}
