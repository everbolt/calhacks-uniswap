import React from "react";

import {Bar} from "react-chartjs-2"
import { useQuery, gql } from "@apollo/client";
import Box from '@mui/material/Box';

const POOL_TICKS = gql`
  query GetTokenValues {
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"){
      ticks(first:1000 orderBy:tickIdx orderDirection:asc){
        id
        price0
        price1
        liquidityGross
        liquidityNet
        tickIdx
      }
    }
  }
`

function VerticalLine (props) {
  return (
    <Box
      sx={{
        zIndex: 10,
        width: 2,
        height: 385,
        position: "absolute",
        marginLeft: "350px",
        marginTop: "20px",
        backgroundColor: "#f731ed"
      }}
    />
  )
}

function TotalVolumeGraph(props) {
  const { loading, error, data } = useQuery(POOL_TICKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  //DISPLAY DATA HERE
  // console.log(data)
  // console.log(data['pool']['ticks'][200])
  // console.log(data['pool']['ticks'][250])
  const availableTicks = [[],[]];
  var sum = 0;
  for (let i = 0; i < data['pool']['ticks'].length; i++) {
      sum += Number(data['pool']['ticks'][i]['liquidityNet']);
      availableTicks[0].push(10**12 / (1.0001 ** Number(data['pool']['ticks'][i]['tickIdx'])));
      availableTicks[1].push(sum ** 0.25);
  }
  console.log(availableTicks);

  const start = 175;
  const end = 700;

  return (
    <div>
      <VerticalLine />
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