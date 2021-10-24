import React from 'react';
import './App.css';
import TotalVolumeGraph from './Components/TotalVolumeGraph';
import DropdownIntoConverter from './Components/DropdownIntoConverter';
import RangeSlider from './Components/RangeSlider';
import uniflow_logo from './Components/uniflow.png'
import LineChart from './Components/LineChart';
import SliderGraph from './Components/SliderGraph';
import { useQuery, gql } from "@apollo/client";


//"#0F051B"
//"#FFFFFF"
const App = () => {
  const [poolId, setPoolId] = React.useState("0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8");
  
  const [coinA_name, setCoinA_name] = React.useState("");
  const [coinB_name, setCoinB_name] = React.useState("");
  const [availableFeeTier, setAvailableFeeTier] = React.useState([false, false, false]);
  const [feeTier, setFeeTier] = React.useState('');

  //ADDING API CALL PARAMETERS

  const POOL_TICKS = gql`
    query GetTokenValues($pool_id: String!) {
      pool(id: $pool_id){
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

  const { loading, error, data } = useQuery(
    POOL_TICKS, {variables: {"pool_id": poolId}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  const availableTicks = [[],[]];
  var sum = 0;
  for (let i = 0; i < data['pool']['ticks'].length; i++) {
      sum += Number(data['pool']['ticks'][i]['liquidityNet']);
      availableTicks[0].push(10**12 / (1.0001 ** Number(data['pool']['ticks'][i]['tickIdx'])));
      availableTicks[1].push(sum ** 0.25);
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0F051B"
      }}
    >
      <div>
        <div
          style={{
            width: '55%',
            float: 'right',
            paddingTop: '20px',
            paddingLeft: '20px'
          }}
        >
          <SliderGraph 
            availableTicks={availableTicks}
            
            setPoolId={setPoolId} 
            coinA_name={coinA_name} 
            setCoinA_name={setCoinA_name} 
            coinB_name={coinB_name} 
            setCoinB_name={setCoinB_name}
            availableFeeTier={availableFeeTier}
            setAvailableFeeTier={setAvailableFeeTier}
            feeTier={feeTier}
            setFeeTier={setFeeTier}
          />
        </div>
        <div
          style={{
            paddingTop: '20px',
            paddingLeft: '50px'
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "30vw",
              paddingBottom: "60px"
              
            }}
          >
            <img
              src={uniflow_logo}
              style={{
                width: "15vw"
              }}
            />
            <h1
              style={{
                color: "#FFFFFF",
                paddingTop: "30px",
                fontSize: "60px"
              }}
            >
              uniFLOW
            </h1>
          </div>
          <div
            style={{
              paddingLeft: "160px"
            }}
          >
            <DropdownIntoConverter 
              setPoolId={setPoolId} 
              coinA_name={coinA_name} 
              setCoinA_name={setCoinA_name} 
              coinB_name={coinB_name} 
              setCoinB_name={setCoinB_name}
              availableFeeTier={availableFeeTier}
              setAvailableFeeTier={setAvailableFeeTier}
              feeTier={feeTier}
              setFeeTier={setFeeTier}
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App;
