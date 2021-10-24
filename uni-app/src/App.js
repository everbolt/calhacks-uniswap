import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';

import DropdownIntoConverter from './Components/DropdownIntoConverter';
import RangeSlider from './Components/RangeSlider';
<<<<<<< Updated upstream
=======
import LineChart from './Components/LineChart';
>>>>>>> Stashed changes

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
