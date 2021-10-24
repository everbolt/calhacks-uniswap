import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import token_names from './Data/token_names.js'

export default function SelectA(prop) {
  const token_names_array = prop.tokens; 
  const [coin, setCoin] = React.useState('');

  const handleChange = (event) => {
    setCoin(event.target.value);
    prop.setCoinA(coin);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="coin-select">Coin</InputLabel>
        <Select
          labelId="coin-select"
          id="coin-select"
          value={coin}
          label="Coin"
          onChange={handleChange}
        >
          {token_names_array?.map(token => {
            return (
              <MenuItem key={token} value={token}>
                {token ?? token}
              </MenuItem>
            );
          })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
