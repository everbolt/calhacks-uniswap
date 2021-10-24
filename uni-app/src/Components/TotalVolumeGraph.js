import React from "react";
import {Line} from "react-chartjs-2"

import {Bar} from "react-chartjs-2"
import { useQuery, gql } from "@apollo/client";

const POOL_TICKS = gql`
  query GetTokenValues {
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"){
      ticks(first:1000 orderBy:tickIdx orderDirection:asc){
        id
        price0
        price1
        liquidityGross
        tickIdx
      }
    }
  }
`

const TotalVolumeGraph = () => {
  const { loading, error, data } = useQuery(POOL_TICKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  //DISPLAY DATA HERE
  // console.log(data)
  // console.log(data['pool']['ticks'][200])
  // console.log(data['pool']['ticks'][250])
  const availableTicks = [[],[]];

  for (let i = 0; i < data['pool']['ticks'].length; i++) {
    var sum = 0;
    // Number(data['pool']['ticks'][i]['tickIdx']) > 0 && Number(data['pool']['ticks'][i]['tickIdx']) < 400000 &&
    if (data['pool']['ticks'][i]['liquidityGross'] !=='0') {
      // sum += Math.log(Number(data['pool']['ticks'][i]['price0'])) / Math.log(1.0001);
      availableTicks[0].push(Number(data['pool']['ticks'][i]['tickIdx']));
      availableTicks[1].push(Number(data['pool']['ticks'][i]['liquidityGross'])**0.5);
    }
  }
  console.log(availableTicks);

  return (
    <div>
      <Bar
        data = {{
          // labels: ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          // labels: [1,2,3,4,5,6,7,8,9,10,11,12],
          labels: availableTicks[0].slice(0,12),
          datasets: [
            {
              label: 'DataSet1',
              // data: [12, 19, 9, 17, 5, 8, 7, 10, 5, 10, 11, 7],
              data: availableTicks[1],
              fill: 0,
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
          borderColor: "#080554",
          backgroundColor: "#080554",
          pointBackgroundColor: "#f731ed",
          scales: {
            x: {
              type: 'linear',
              // suggestedMin: 0,
              // suggestedMax: 400000
            }
          },
          barThickness: "flex"
        }}
      
      />
    </div>
  )
}

export default TotalVolumeGraph