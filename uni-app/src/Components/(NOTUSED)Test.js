import { useQuery, gql } from "@apollo/client";
import React from "react";

const GET_TRANSACTIONS = gql`
  query GetTransactions($skip: Int!) {
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"){
      swaps(skip: $skip first: 10 orderBy:timestamp orderDirection:desc){
        amount0
        amount1
        timestamp
      }
    }
  }
`

function Test(props) {
    const [getTransactions] = useQuery(GET_TRANSACTIONS);
    
    var total_transactions = []
    for (var i = 0; i < 3; i++) {
        var skip = i * 10
        var tempTransactions=async ({
            skip,
        }) => {
            await getTransactions({
                variables: {skip},
            });
        }
        total_transactions.push(tempTransactions.data.pool.swaps)
    }
    console.log("SWAPS", total_transactions)
    return (
        <div/>
    )
}

export default Test