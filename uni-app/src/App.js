import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';

import DropdownIntoConverter from './Components/DropdownIntoConverter';
import RangeSlider from './Components/RangeSlider';

const App = () => {
  return (
    <div>
      <div
        style={{
          width: '50%',
          float: 'right',
          paddingTop: '20px',
          paddingLeft: '20px'
        }}
      >
        <TotalVolumeGraph />
        <RangeSlider />
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
