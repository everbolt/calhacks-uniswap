import React from 'react';

import './App.css';
import LineChart from './Components/LineChart';
import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';
import Calculator from './Components/CryptoConverter'
import tokens from './Components/Data/tokens.js'
import BasicSelect from './Components/Dropdown.js';

const App = () => {
  
  console.log(JSON.stringify(tokens))
  
  return (
    <div>
      <LineChart />
      <MinimumDistanceSliderWithInput />
      <Calculator />
      <BasicSelect />
    </div>
  )
}

export default App;
