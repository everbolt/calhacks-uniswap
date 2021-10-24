import React from "react";

import {Bar} from "react-chartjs-2"

import Box from '@mui/material/Box';


function VerticalLine (props) {
  return (
    <Box
      sx={{
        zIndex: 10,
        width: 2,
        height: 368,
        position: "absolute",
        marginLeft: (113 + props.lineValue / 100 * 585) + 'px',
        marginTop: "25px",
        backgroundColor: "#f731ed"
      }}
    />
  )
}

function TotalVolumeGraph(props) {
  const availableTicks = props.availableTicks;

  const start = 175;
  const end = 700;

  return (
    <div>
      <VerticalLine lineValue={props.lineValue[0]}/>
      <VerticalLine lineValue={props.lineValue[1]}/>
      <Bar
        data = {{
          labels: availableTicks[0].slice(start, end),
          datasets: [
            {
              label: 'Total Volume Locked',
              data: availableTicks[1].slice(start, end),
              // fill: +1,
            }, 
            // {
            //   label: 'DataSet2',
            //   data: [12, 19, 9, 17, 5, 8, 7, 10, 5, 10, 11, 7],
            // }, 
          ]
        }}
        options = {{
          interaction: {
            mode: 'index',
            axis: 'x',
            intersect: false
          },
          borderColor: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          pointBackgroundColor: "#f731ed",
          scales: {
            xAxis: {
              scaleId: 'xAxis',
              type: 'linear',
              beginAtZero: true,
              min: 0,
              ticks: {
                color: "#FFFFFF"
              },
              grid: {
                color: "#adadad",
              },
              // suggestedMin: 0,
              // suggestedMax: 400000
            },
            yAxis: {
              ticks: {
                color: "#FFFFFF"
              },
              grid: {
                color: "#adadad"
              }
            }
          },
          barThickness: "flex",
          borderWidth: 1,
          hoverBorderColor: "#ffffff",
        }}
      
      
      />
    </div>
  )
}

export default TotalVolumeGraph