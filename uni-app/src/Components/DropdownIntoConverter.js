import React from "react";
import { Box } from "@mui/system";
import DoubleDropdown from "./DoubleCoinDropdown";
import Calculator from "./CryptoConverter";
import FeeTierSelector from "./FeeTierSelector";
import GenerateButton from "./GenerateButton"

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
      <GenerateButton
        setAPIloading={prop.setAPIloading}
        APIpoolid={prop.APIpoolid}
        APIlowerbound={prop.APIlowerbound}
        APIupperbound={prop.APIupperbound}
        APItoken0quantity={prop.APItoken0quantity}
        APItoken1quantity={prop.APItoken1quantity}
        setGeneratedData={prop.setGeneratedData}
        setFinishedGeneration={prop.setFinishedGeneration}
      />
    </Box>
  )
}