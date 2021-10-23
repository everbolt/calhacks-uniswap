import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input1 = styled(MuiInput)`
  width: 42px;
`;
const Input2 = styled(MuiInput)`
  width: 42px;
`;

const minDistance = 0

export default function MinimumDistanceSliderWithInput() {
  const [value, setValue] = React.useState([40,60]);

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleInputChange1 = (event) => {
    if (event.target.value === '') {
      setValue(['', value[1]]);
    } else {
      var inputNumber = Number(event.target.value)
      setValue([Math.min(inputNumber, value[1]), Math.max(inputNumber, value[1])])
    }
  };

  const handleInputChange2 = (event) => {
    if (event.target.value === '') {
      setValue([value[0], '']);
    } else {
      var inputNumber = Number(event.target.value)
      setValue([Math.min(inputNumber, value[0]), Math.max(inputNumber, value[0])])
    }
  };

  const handleBlur = () => {
    if (value[0] < 0) {
      setValue(0, value[1]);
    } else if (value[1] > 100) {
      setValue(value[0], 100);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <Input1
            value={value[0]}
            size="small"
            onChange={handleInputChange1}
            onBlur={handleBlur}
            
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={Array.isArray(value) ? value : [0,100]}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            disableSwap
          />
        </Grid>
        <Grid item>
          <Input2
            value={value[1]}
            size="small"
            onChange={handleInputChange2}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
