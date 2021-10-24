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
    prop.setCoinA_name(event.target.value);
    prop.setCoinB_name("");
    prop.setAvailableFeeTier([false, false, false]);
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
          style={{
            backgroundColor: "#FFFFFF"
          }}
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
    const feeTier=[true,true,true];
    if (token_directory[prop.coinA_name][event.target.value]["500"] === "") {
      feeTier[0] = false;
    }
    if (token_directory[prop.coinA_name][event.target.value]["3000"] === "") {
      feeTier[1] = false;
    }
    if (token_directory[prop.coinA_name][event.target.value]["10000"] === "") {
      feeTier[2] = false;
    }
    prop.setAvailableFeeTier(feeTier);
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
          style={{
            backgroundColor: "#FFFFFF"
          }}
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
          style={{
            backgroundColor: "#ababab"
          }}
          disabled
        >
        </Select>
      </FormControl>
    </Box>
  );
}

function DoubleDropdown(prop) {
  // const [coinA_name, setCoinA_name] = React.useState('');
  // const [coinB_name, setCoinB_name] = React.useState('');

  return (
    <Box sx={{ width: 300 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SelectA 
            tokens={Object.keys(token_names.token_names)} 
            coinA_name={prop.coinA_name} 
            coinB_name={prop.coinB_name} 
            setCoinA_name={prop.setCoinA_name} 
            setCoinB_name={prop.setCoinB_name} 
            setAvailableFeeTier={prop.setAvailableFeeTier}
          />
        </Grid>
        {prop.coinA_name === "" ?
          <Grid item>
            <SelectBDisabled />
          </Grid>
          :
          <Grid item>
            <SelectB 
              tokens={availablePools(prop.coinA_name)} 
              coinA_name={prop.coinA_name} 
              coinB_name={prop.coinB_name} 
              setCoinB_name={prop.setCoinB_name} 
              setPoolId={prop.setPoolId} 
              feeTier={prop.feeTier}
              setAvailableFeeTier={prop.setAvailableFeeTier}
            />
          </Grid>
        }
        
      </Grid>
    </Box>
  )
}

export default DoubleDropdown