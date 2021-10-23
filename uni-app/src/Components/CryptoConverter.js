import React from "react";

const scaleNames = {
  a: 'ETH',
  b: 'USDC'
};

const scaleAmount = {
  a: 4100,
  b: 1
}
const exchangeRate = scaleAmount['a'] / scaleAmount['b'];

function toCoinA(coinB) {
  return coinB / exchangeRate;
}

function toCoinB(coinA) {
  return coinA * exchangeRate;
}

function tryConvert(amount, convert) {
  const input = parseFloat(amount);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 100000) / 100000;
  return rounded.toString();
}

class CoinInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onCoinChange(e.target.value);
  }

  render() {
    const amount = this.props.amount;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter number of {scaleNames[scale]}:</legend>
        <input value={amount}
                onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCoinAChange = this.handleCoinAChange.bind(this);
    this.handleCoinBChange = this.handleCoinBChange.bind(this);
    this.state = {amount: '', scale: 'a'};
  }

  handleCoinAChange(amount) {
    this.setState({scale: 'a', amount});
  }

  handleCoinBChange(amount) {
    this.setState({scale: 'b', amount});
  }

  render() {
    const scale = this.state.scale;
    const amount = this.state.amount;
    const coinA = scale === 'b' ? tryConvert(amount, toCoinA) : amount;
    const coinB = scale === 'a' ? tryConvert(amount, toCoinB) : amount;

    //Triggered when second token is chosen
    //Determine the token ID's locally
    // Pull USD value of each token via API
    // Locally determine conversion rate based on the two values

    return (
      <div>
        <CoinInput
          scale="a"
          amount={coinA}
          onCoinChange={this.handleCoinAChange} />
        <CoinInput
          scale="b"
          amount={coinB}
          onCoinChange={this.handleCoinBChange} />
      </div>
    );
  }
}

export default Calculator