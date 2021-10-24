import React from "react";
import { Box } from "@mui/system";

import DoubleDropdown from "./DoubleCoinDropdown";
import Calculator from "./CryptoConverter";
import FeeTierSelector from "./FeeTierSelector";

export default function DropdownIntoConverter(prop) {
  return (
    <Box>
      <DoubleDropdown 
        coinA_name={prop.coinA_name} 
        coinB_name={prop.coinB_name} 
        setCoinA_name={prop.setCoinA_name} 
        setCoinB_name={prop.setCoinB_name} 
        setAvailableFeeTier={prop.setAvailableFeeTier}
      />
      <FeeTierSelector 
        setPoolId={prop.setPoolId} 
        coinA_name={prop.coinA_name} 
        coinB_name={prop.coinB_name} 
        availableFeeTier={prop.availableFeeTier} 
        setFeeTier={prop.setFeeTier}  
      />
      <Calculator 
        coinA_name={prop.coinA_name} 
        coinB_name={prop.coinB_name}
      />
    </Box>
  )
}