import requests
import json

#pool_id = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"

def getTicks(pool_id):
  url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
  query = """
    query ($skip: Int! $pool_id: String!) {
      pool(id: $pool_id){
        ticks(skip: $skip first:1000 orderBy: tickIdx orderDirection: asc){
          liquidityGross
          liquidityNet
          tickIdx
        }
      }
    }
  """
  res, done, skip = [], False, 0
  while not done:
    variables = {"skip": skip, "pool_id": pool_id}
    r = requests.post(url, json={"query": query , "variables": variables})
    try: temp = json.loads(r.text)["data"]["pool"]["ticks"]
    except: print("ERROR:", r.text)
    for i in temp:
      res.append(i)
    
    if len(temp) < 1000: done = True
    else:
      skip += 1000
      if skip > 5000: return res #Max skip is 5000 (THIS IS AN ISSUE IF THERE"S 5k+ TICKS)
  return res

def getSwaps(pool_id):
  url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
  query = """
    query ($max_timestamp: String! $pool_id: String!) {
      pool(id: $pool_id){
        swaps(where:{timestamp_lt: $max_timestamp} first:1000 orderBy:timestamp orderDirection:desc){
          amount0
          amount1
          timestamp
        }
      }
    }
  """
  res, done, max_timestamp = [], False, "9999999999"
  total = 0
  while not done:
    variables = {"max_timestamp": max_timestamp, "pool_id": pool_id}
    r = requests.post(url, json={"query": query , "variables": variables})
    try: temp = json.loads(r.text)["data"]["pool"]["swaps"]
    except: print("ERROR", r.text)
    for i in temp:
      res.append(i)
    
    last_time_stamp = temp[-1]["timestamp"]
    total += len(temp)
    if total >= 10000 or int(last_time_stamp) < 1627098384 or len(temp) < 1000:
      done = True #Need at least 10k swaps or last 90 days of swaps
    else:
      max_timestamp = last_time_stamp
  return res

def getPoolData(pool_id):
  url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
  query = """
    query ($pool_id: String!) {
      pool(id: $pool_id){
        token0 { id }
        token1 { id }
        token0Price
        token1Price
        sqrtPrice
        tick
        liquidity
      }
    }
  """
  variables = {"pool_id": pool_id}
  r = requests.post(url, json={"query": query , "variables": variables})
  try: res = json.loads(r.text)["data"]["pool"]
  except: print("ERROR", r.text)
  return res

def getTokenData():
  token_ids = [
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
    "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
  ]
  url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
  query = """
    query ($token_ids: [String]!) {
      tokens(where: {id_in: $token_ids}){
        symbol
        id
        decimals
        derivedETH
      }
    }
  """
  variables = {"token_ids": token_ids}
  r = requests.post(url, json={"query": query , "variables": variables})
  try: res = json.loads(r.text)["data"]["tokens"]
  except: print("ERROR", r.text)
  return res