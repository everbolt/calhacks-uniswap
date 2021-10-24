import React from 'react';
import './App.css';
import LineChart from './Components/LineChart';
import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';
import Calculator from './Components/CryptoConverter'
import DoubleDropdown from './Components/DoubleCoinDropdown';

const App = () => {
  return (
    <div>
      <LineChart />
      <MinimumDistanceSliderWithInput />
      <Calculator />
      <DoubleDropdown />
    </div>
  )
}

export default App;
