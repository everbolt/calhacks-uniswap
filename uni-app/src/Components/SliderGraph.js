import React from "react";
import TotalVolumeGraph from "./TotalVolumeGraph";
import RangeSlider from "./RangeSlider";


function SliderGraph(prop) {
  const [lineValue, setLineValue] = React.useState([30, 70])  
  
  return (
    <div
      style={{
        marginTop: "140px"
      }}
    >
      <TotalVolumeGraph
        lineValue={lineValue}
        availableTicks={prop.availableTicks}
      />
      <RangeSlider
        sliderMax={10383}
        setLineValue={setLineValue}
      />
    </div>

  )
}

export default SliderGraph