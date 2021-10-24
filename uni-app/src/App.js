import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';

import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';
import DropdownIntoConverter from './Components/DropdownIntoConverter';

const App = () => {
  return (
    <div>
      <TotalVolumeGraph />
      <MinimumDistanceSliderWithInput />
      <DropdownIntoConverter />
    </div>
  )
}

export default App;
