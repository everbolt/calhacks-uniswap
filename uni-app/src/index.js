import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
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
        ]
      },
        orderBy:derivedETH,
        orderDirection:desc){
      id
      name
      derivedETH
    }
  }
    `
  })
  .then(result => console.log(result));

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
      ]
    },
      orderBy:derivedETH,
      orderDirection:desc){
    id
    name
    derivedETH
  }
}
`

function TokenValues() {
  const { loading, error, data } = useQuery(TOKEN_VALUES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.tokens.map(({ id, name, derivedETH }) => (
    <div key={id}>
      <p>
        {name}: {derivedETH}
      </p>
    </div>
  ));
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <TokenValues />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
