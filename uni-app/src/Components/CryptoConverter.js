import React from "react";
import { useQuery, gql } from "@apollo/client";

const TOKEN_VALUES = gql`
  query GetTokenValues {
	  tokens(where:{
      id_in: [
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "0x6b175474e89094c44da98b954eedeac495271d0f",
        "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        "0x853d955acef822db058eb8505911ed77f175b99e",
        "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
        "0x6123b0049f904d730db3c36a31167d9d4121fa6b",
        "0xb4efd85c19999d84251304bda99e90b92300bd93",
        "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      ]},
        orderBy:derivedETH,
        orderDirection:desc){
      id
      symbol
      derivedETH
    }
  }
`

function tryConvert(amount, convert) {
  const input = parseFloat(amount);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 100000) / 100000;
  return rounded.toString();
}

function CoinInput(props) {
  function handleChange(e) {
    props.onCoinChange(e.target.value);
  }

  const amount = props.amount;
  const scale = props.scale;
  
  return (
    <fieldset>
      <legend>Enter number of {scale ? scale : "COIN"}:</legend>
      <input value={amount}
              onChange={handleChange} />
    </fieldset>
  );
}

function Calculator(props) {
  
  //TODO TODO TODO TODO
  //REMOVE THESE LATER=============================
  var coinA_name = props.coinA_name
  var coinB_name = props.coinB_name
  //ADD THESE INSTEAD
  //coinA = props.coinA
  //coinB = props.coinB

  const [amount, setAmount] = React.useState('');
  const [scale, setScale] = React.useState(coinA_name);

  function handleCoinAChange(amount) {
    setScale(coinA_name)
    setAmount(amount)
  }

  function handleCoinBChange(amount) {
    setScale(coinB_name)
    setAmount(amount)
  }

  const { loading, error, data } = useQuery(TOKEN_VALUES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const scaleAmount = {}
  for (var i in data.tokens) {
    scaleAmount[data.tokens[i].symbol] = parseFloat(data.tokens[i].derivedETH)
  }

  const exchangeRate = scaleAmount[coinA_name] / scaleAmount[coinB_name];
  function toCoinA(coinB_val) {
    return coinB_val / exchangeRate;
  }
  
  function toCoinB(coinA_val) {
    return coinA_val * exchangeRate;
  }  

  const coinA_val = scale === coinB_name ? tryConvert(amount, toCoinA) : amount;
  const coinB_val = scale === coinA_name ? tryConvert(amount, toCoinB) : amount;

  return (
    <div>
    <CoinInput
      scale={coinA_name}
      amount={coinA_val}
      onCoinChange={handleCoinAChange} />
    <CoinInput
      scale={coinB_name}
      amount={coinB_val}
      onCoinChange={handleCoinBChange} />
    </div>
  )
}

export default Calculator