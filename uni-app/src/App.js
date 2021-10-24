import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';

import DropdownIntoConverter from './Components/DropdownIntoConverter';
import RangeSlider from './Components/RangeSlider';
import LineChart from './Components/LineChart';
import SliderGraph from './Components/SliderGraph';

const App = () => {
  return (
    <div>
      <div
        style={{
          width: '70%',
          float: 'right',
          paddingTop: '20px',
          paddingLeft: '20px'
        }}
      >
        <SliderGraph />
      </div>
      <div
        style={{
          paddingTop: '20px'
        }}
      >
        <DropdownIntoConverter />
      </div>
    </div>
  )
}

export default App;
