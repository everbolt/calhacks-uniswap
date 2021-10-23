import React from 'react';

import './App.css';
import LineChart from './Components/LineChart';
import MinimumDistanceSlider from './Components/MinSlider';
import InputSlider from './Components/InputSlider';
import MinimumDistanceSliderWithInput from './Components/MinSliderWithInput';

const App = () => {
  return (
    <div>
      <LineChart />
      <MinimumDistanceSliderWithInput />
    </div>
  )
}

export default App;
