import React from "react";
import { Box } from "@mui/system";

import DoubleDropdown from "./DoubleCoinDropdown";
import Calculator from "./CryptoConverter";
import FeeTierSelector from "./FeeTierSelector";

export default function DropdownIntoConverter(prop) {
  const [coinA_name, setCoinA_name] = React.useState('');
  const [coinB_name, setCoinB_name] = React.useState('');
  const [availableFeeTier, setAvailableFeeTier] = React.useState([false, false, false]);
  const [feeTier, setFeeTier] = React.useState('');
  return (
    <Box>
      <DoubleDropdown coinA_name={coinA_name} coinB_name={coinB_name} setCoinA_name={setCoinA_name} setCoinB_name={setCoinB_name} setAvailableFeeTier={setAvailableFeeTier}/>
      <FeeTierSelector coinA_name={coinA_name} coinB_name={coinB_name} availableFeeTier={availableFeeTier} setPoolId={prop.setPoolId} setFeeTier={setFeeTier} />
      <Calculator coinA_name={coinA_name} coinB_name={coinB_name} />
    </Box>
  )
}