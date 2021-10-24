import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import token_names from './Data/token_names.js'
import { token_directory } from "./Data/token_directory";

function availablePools (prop) {
  const available = [];
  for (var coin2 in token_directory[prop]) {
    if (token_directory[prop][coin2]["500"] !== "" || token_directory[prop][coin2]["3000"] !== "" || token_directory[prop][coin2]["10000"] !== "") {
      available.push(coin2);
    }
  }
  return available;
}

function SelectA(prop) {
  const token_names_array = prop.tokens; 
  const [coin, setCoin] = React.useState('');

  const handleChange = (event) => {
    setCoin(event.target.value);
    prop.setCoinA(event.target.value);
    prop.setCoinA_name(event.target.value);
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

function SelectB(prop) {
  const token_names_array = prop.tokens;
  const [coin, setCoin] = React.useState('');

  const handleChange = (event) => {
    setCoin(event.target.value);
    prop.setCoinB_name(event.target.value);
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

function SelectBDisabled(prop) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="coin-select">Coin</InputLabel>
        <Select
          labelId="coin-select"
          id="coin-select"
          disabled
        >
        </Select>
      </FormControl>
    </Box>
  );
}

function DoubleDropdown(prop) {
  const [coinA, setCoinA] = React.useState('');  

  return (
    <Box sx={{ width: 300 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SelectA tokens={Object.keys(token_names.token_names)} setCoinA = {setCoinA} setCoinA_name = {prop.setCoinA_name}/>
        </Grid>
        {coinA === "" ?
          <Grid item>
            <SelectBDisabled />
          </Grid>
          :
          <Grid item>
            <SelectB tokens={availablePools(coinA)} coinA = {coinA} setCoinB_name = {prop.setCoinB_name}/>
          </Grid>
        }
        
      </Grid>
    </Box>
  )
}

export default DoubleDropdown