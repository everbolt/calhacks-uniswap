import React from 'react';
import './App.css';
import LineChart from './Components/LineChart';

import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';
import Calculator from './Components/CryptoConverter'
import DoubleDropdown from './Components/DoubleCoinDropdown';
import DropdownIntoConverter from './Components/DropdownIntoConverter';

const App = () => {
  return (
    <div>
      <LineChart />
      <MinimumDistanceSliderWithInput />
      {/* <Calculator />
      <DoubleDropdown /> */}
      <DropdownIntoConverter />
    </div>
  )
}

export default App;
