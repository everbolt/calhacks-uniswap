import React from "react";
import { Box } from "@mui/system";

import DoubleDropdown from "./DoubleCoinDropdown";
import Calculator from "./CryptoConverter";

export default function DropdownIntoConverter(prop) {
  const [coinA_name, setCoinA_name] = React.useState('');
  const [coinB_name, setCoinB_name] = React.useState('');
  return (
    <Box>
      <DoubleDropdown setCoinA_name={setCoinA_name} setCoinB_name={setCoinB_name}/>
      <Calculator coinA_name={coinA_name} coinB_name={coinB_name} />
    </Box>
  )
}