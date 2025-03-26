import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

function getStyles(number, selectedNumbers, theme) {
  return {
    fontWeight:
      selectedNumbers === number
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function SingleSelect() {
  const theme = useTheme();
  const [selectedNumber, setSelectedNumber] = React.useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedNumber(Number(value));
  };

  return (
    <div>
      <FormControl sx={{ sm: 1, width: 300, }}>
        <InputLabel id="demo-single-number-label">Camera</InputLabel>
        <Select
          labelId="demo-single-number-label"
          id="demo-single-number"
          value={selectedNumber}
          onChange={handleChange}
          input={<OutlinedInput label="Number" />}
          MenuProps={MenuProps}
        >
          {numbers.map((number) => (
            <MenuItem
              key={number}
              value={number}
              style={getStyles(number, selectedNumber, theme)}
            >
              {number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
