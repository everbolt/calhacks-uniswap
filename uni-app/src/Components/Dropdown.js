import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import token_names from './Data/token_names.js'

function DropdownOptions (props) {
  return (
    Object.keys(props.tokens.token_names).map(token => <MenuItem value={token} key={token}>{token} </MenuItem>)
  )
}

export default function BasicSelect() {
  const [coin, setCoin] = React.useState('');

  const handleChange = (event) => {
    setCoin(event.target.value);
  };
  console.log(token_names)
  const test = token_names
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
          
          {/* Object.keys(token_names).map(token => <MenuItem value={token}>{token} </MenuItem>) */}
          
          <DropdownOptions tokens={test} />
        </Select>
      </FormControl>
    </Box>
  );
}
