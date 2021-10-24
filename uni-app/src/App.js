import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';
import DropdownIntoConverter from './Components/DropdownIntoConverter';
import RangeSlider from './Components/RangeSlider';
import uniflow_logo from './Components/uniflow.png'
import LineChart from './Components/LineChart';
import SliderGraph from './Components/SliderGraph';

//"#0F051B"
//"#FFFFFF"
const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0F051B"
      }}
    >
      <div>
        <div
          style={{
            width: '55%',
            float: 'right',
            paddingTop: '20px',
            paddingLeft: '20px'
          }}
        >
          <SliderGraph />
        </div>
        <div
          style={{
            paddingTop: '20px',
            paddingLeft: '50px'
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "30vw",
              paddingBottom: "60px"
              
            }}
          >
            <img
              src={uniflow_logo}
              style={{
                width: "15vw"
              }}
            />
            <h1
              style={{
                color: "#FFFFFF",
                paddingTop: "30px",
                fontSize: "60px"
              }}
            >
              uniFLOW
            </h1>
          </div>
          <div
            style={{
              paddingLeft: "160px"
            }}
          >
            <DropdownIntoConverter />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App;
