import React from 'react';

import './App.css';
import LineChart from './Components/LineChart';
import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';
import Calculator from './Components/CryptoConverter'
import tokens from './Components/Data/tokens.js'

const App = () => {
  
  console.log(JSON.stringify(tokens))
  
  return (
    <div>
      <LineChart />
      <MinimumDistanceSliderWithInput />
      <Calculator />
    </div>
  )
}

export default App;
