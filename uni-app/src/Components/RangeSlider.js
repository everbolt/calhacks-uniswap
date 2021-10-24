import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}



export default function RangeSlider(props) {
  const minDistance = 0;
  const minValue = 0;
  const maxValue = props.sliderMax;

  const [value, setValue] = React.useState([0.7 * minValue + 0.3 * maxValue, 0.3 * minValue + 0.7 * maxValue]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      props.setLineValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
      console.log("Changed 0")
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      props.setLineValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
      console.log("Changed 1")
    }
  };
  
  return (
    <Box 
      sx={{ 
        width: 540,
        paddingTop: "35px",
        paddingLeft: "113px"
      }}
    >
      
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={minValue}
        max={maxValue}
        disableSwap
      />
        
    </Box>
  );
}