import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [coin, setCoin] = React.useState('');

  const handleChange = (event) => {
    setCoin(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Coin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={coin}
          label="Coin"
          onChange={handleChange}
        >
          <MenuItem value={10}>ETH</MenuItem>
          <MenuItem value={20}>BTS</MenuItem>
          <MenuItem value={30}>USDC</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
