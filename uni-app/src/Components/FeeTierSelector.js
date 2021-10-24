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

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      {prop.availableFeeTier[0] ? 
        <ToggleButton 
          value="500" 
        >
          {"0.05%"}   
        </ToggleButton> 
      : <ToggleButton 
        value="500" 
        disabled
      >
          {"0.05%"}   
      </ToggleButton>}
      
      
      {prop.availableFeeTier[1] ? 
        <ToggleButton 
          value="3000" 
        >
          {"0.3%"}   
        </ToggleButton> 
      : <ToggleButton 
        value="3000" 
        disabled
      >
          {"0.3%"}   
      </ToggleButton>}
      
      
      {prop.availableFeeTier[2] ? 
        <ToggleButton 
          value="10000" 
        >
          {"1%"}   
        </ToggleButton> 
      : <ToggleButton 
        value="10000" 
        disabled
      >
          {"1%"}   
      </ToggleButton>}
    </ToggleButtonGroup>
  );
}