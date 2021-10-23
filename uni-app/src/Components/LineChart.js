import React from "react";
import {Line} from "react-chartjs-2"

const LineChart = () => {
  return (
    <div>
      <Line 
        data = {{
          // labels: ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          labels: [1,2,3,4,5,6,7,8,9,10,11,12],
          datasets: [
            {
              label: 'DataSet1',
              data: [1, 5, 6, 10, 1, 5, 3, 7, 4, 8, 9, 3],
              fill: +1,
            }, 
            {
              label: 'DataSet2',
              data: [12, 19, 9, 17, 5, 8, 7, 10, 5, 10, 11, 7],
            }, 
          ]
        }}
        
        options = {{
          interaction: {
            mode: 'index',
            axis: 'x',
            intersect: false
          },
          borderColor: "#080554",
          backgroundColor: "#b3b2d4",
          pointBackgroundColor: "#f731ed",
          scales: {
            x: {
              type: 'linear',
              suggestedMinimum: 1
            }
          }
        }}
      
      />
    </div>
  )
}

export default LineChart