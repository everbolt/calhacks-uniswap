import React from "react";

import {Line} from "react-chartjs-2"

export default function LineChart(prop) {
    return (
        <div>
          <Line
            data = {{
              labels: [0,1,2,3,4,5,6,7,8,9,10,11,12],
              datasets: [
                {
                  label: 'Total Volume Locked',
                  data: [1,10, 17, 7, 15, 3, 6, 5, 8, 3, 8, 9, 5],
                  fill: +1,
                }, 
                {
                  label: 'DataSet2',
                  data: [3,12, 19, 9, 17, 5, 8, 7, 10, 5, 10, 11, 7],
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
              backgroundColor: "#080554",
              pointBackgroundColor: "#f731ed",
              scales: {
                xAxis: {
                  type: 'linear',
                  beginAtZero: true,
                  min: 0,
                  // suggestedMin: 0,
                  // suggestedMax: 400000
                },
              },
              barThickness: "flex",
              borderWidth: 1,
              hoverBorderColor: "#ffffff"
            }}
          
          />
        </div>
      )
}