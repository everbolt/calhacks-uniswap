import requests
import json

pool_id = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"

def getTicks(pool_id):
  url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
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
    variables = {'skip': skip, 'pool_id': pool_id}
    r = requests.post(url, json={'query': query , 'variables': variables})
    temp = json.loads(r.text)["data"]["pool"]["ticks"]
    for i in temp:
      res.append(i)
    
    if len(temp) < 1000: done = True
    else:
      skip += 1000
      if skip > 5000: return res #Max skip is 5000 (THIS IS AN ISSUE IF THERE'S 5k+ TICKS)
  return res

def getSwaps(pool_id):
  url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
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
    variables = {'max_timestamp': max_timestamp, 'pool_id': pool_id}
    r = requests.post(url, json={'query': query , 'variables': variables})
    temp = json.loads(r.text)["data"]["pool"]["swaps"]
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
  url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
  query = """
    query ($pool_id: String!) {
      pool(id: $pool_id){
        token0 { id }
        token1 { id }
        token0Price
        token1Price
        sqrtPrice
        tick
      }
    }
  """
  variables = {'pool_id': pool_id}
  r = requests.post(url, json={'query': query , 'variables': variables})
  res = json.loads(r.text)["data"]["pool"]
  return res