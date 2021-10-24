import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';

import DropdownIntoConverter from './Components/DropdownIntoConverter';
import RangeSlider from './Components/RangeSlider';
import LineChart from './Components/LineChart';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import MyChart from './Components/TestingAnnotation';

const App = () => {
  return (
    <div>
      <TotalVolumeGraph />
      <RangeSlider />
      <DropdownIntoConverter />
      {/* <MyChart /> */}
      {/* <LineChart /> */}
    </div>
  )
}

export default App;
