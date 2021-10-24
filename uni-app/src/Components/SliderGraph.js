import React from "react";
import TotalVolumeGraph from "./TotalVolumeGraph";
import RangeSlider from "./RangeSlider";


function SliderGraph(props) {
  const [lineValue, setLineValue] = React.useState([30, 70])  
  
  return (
    <div>
      <TotalVolumeGraph
        lineValue={lineValue}
        availableTicks={props.availableTicks}
      />
      <RangeSlider
        sliderMax={100}
        setLineValue={setLineValue}
      />
    </div>

  )
}

export default SliderGraph