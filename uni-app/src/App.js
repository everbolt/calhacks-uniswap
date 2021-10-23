import React from 'react';
import './App.css';
import LineChart from './Components/LineChart';
import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';
import Calculator from './Components/CryptoConverter'
import BasicSelect from './Components/Dropdown.js';
import DoubleDropdown from './Components/DoubleCoinDropdown';

const App = () => {
  return (
    <div>
      <LineChart />
      <MinimumDistanceSliderWithInput />
      <Calculator />
      <BasicSelect />
      <DoubleDropdown />
    </div>
  )
}

export default App;
