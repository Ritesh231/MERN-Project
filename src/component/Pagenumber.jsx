
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DynamicSelectLabels from './Select';

export default function PaginationWithSelect() {
  const [selectedCameraCount, setSelectedCameraCount] = useState(0);

  const handleCameraCountChange = (count) => {
    setSelectedCameraCount(count);
  };

  const handlePaginationChange = (event, value) => {
    // Handle pagination change
    console.log(`Page changed to: ${value}`);
  };

  return (
    <div>
      <DynamicSelectLabels onCameraCountChange={handleCameraCountChange} />
      
      <Stack spacing={2}>
        <Pagination count={selectedCameraCount} onChange={handlePaginationChange} />
      </Stack>
    </div>
  );
}
