// DynamicSelectLabels.js
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function DynamicSelectLabels({ onCameraCountChange }) {
  const [userInput, setUserInput] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUserInput(value);
    setSelectedCamera('');
    onCameraCountChange(parseInt(value, 10) || 0);
  };

  const handleDropdownChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const generateCameraOptions = () => {
    const count = parseInt(userInput, 10) || 0;
    return Array.from({ length: count }, (_, index) => index + 1);
  };

  return (
    <div>
      <TextField
        label="Enter the number of cameras"
        type="number"
        value={userInput}
        onChange={handleInputChange}
        InputProps={{ inputProps: { min: 0 } }}
      />

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedCamera}
          onChange={handleDropdownChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            <em>Select Camera</em>
          </MenuItem>
          {generateCameraOptions().map((cameraNumber) => (
            <MenuItem key={cameraNumber} value={cameraNumber}>
              {cameraNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
