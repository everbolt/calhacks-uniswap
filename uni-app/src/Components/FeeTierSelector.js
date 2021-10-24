import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import token_names from './Data/token_names.js'
import { token_directory } from "./Data/token_directory";

export default function FeeTierSelector(prop) {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    prop.setFeeTier(event.target.value);
    console.log(token_directory[prop.coinA_name][prop.coinB_name][event.target.value])    
    prop.setPoolId(token_directory[prop.coinA_name][prop.coinB_name][event.target.value])
  };

  //backgroundColor: "#FFFFFF",
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      style={{
        marginLeft: "39px",
        marginTop: "25px",
      }}
    >
      {prop.availableFeeTier[0] ? 
        <ToggleButton 
          value="500" 
          style={{
            color: "#000000",
            backgroundColor: "#FFFFFF"
          }}
        >
          {"0.05%"}   
        </ToggleButton> 
      : <ToggleButton 
        value="500" 
        disabled
        style={{
          color: "#000000",
          backgroundColor: "#ababab"
        }}
      >
          {"0.05%"}   
      </ToggleButton>}
      
      
      {prop.availableFeeTier[1] ? 
        <ToggleButton 
          value="3000" 
          style={{
            color: "#000000",
            backgroundColor: "#FFFFFF"
          }}
        >
          {"0.3%"}   
        </ToggleButton> 
      : <ToggleButton 
        value="3000" 
        disabled
        style={{
          color: "#000000",
          backgroundColor: "#ababab"
        }}
      >
          {"0.3%"}   
      </ToggleButton>}
      
      
      {prop.availableFeeTier[2] ? 
        <ToggleButton 
          value="10000"
          style={{
            color: "#000000",
            backgroundColor: "#FFFFFF"
          }}
        >
          {"1%"}   
        </ToggleButton> 
      : <ToggleButton 
        value="10000" 
        disabled
        style={{
          color: "#000000",
          backgroundColor: "#ababab"
        }}
      >
          {"1%"}   
      </ToggleButton>}
    </ToggleButtonGroup>
  );
}