import React from "react";
import {Line} from "react-chartjs-2"

const LineChart = () => {
  return (
    <div>
      <Line 
        data = {{
          labels: ['1','2', '3', '4', '5', '6'],
          datasets: [
            {
              label: 'DataSet1',
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "#bae755",
              backgroundColor: "#e755ba",
            }
          ]
        }}
        
      />
    </div>
  )
}

export default LineChart