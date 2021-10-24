import json
import numpy as np
import sklearn
from runner import run_model
from simulator import Simulator
from pool_parser import createPool
from swap_parser import swapParser
from trade_distribution import create_trade_distribution
from get_trades_per_day import getTradesPerDay
from gql_calls import *

def lambda_handler(event, context):
    
    print("STARTED")
    parameters = event["queryStringParameters"]
    print("GOT PARAMETERS")
    pool_id = parameters["pool_id"]
    lower_bound = float(parameters["lower_bound"])
    upper_bound = float(parameters["upper_bound"])
    #token0_symbol = parameters["token0_symbol"]
    #token1_symbol = parameters["token1_symbol"]
    token0_quantity = float(parameters["token0_quantity"])
    token1_quantity = float(parameters["token1_quantity"])
    sample_size = int(parameters['sample_size'])
    print("PROCESSED PARAMETERS")

    tick_data = getTicks(pool_id)
    swap_data = getSwaps(pool_id)
    pool_data = getPoolData(pool_id)
    token_data = getTokenData()
       
    res_swaps = swapParser(swap_data)
    trade_distr = create_trade_distribution(res_swaps)
    trades_per_day = getTradesPerDay(swap_data)

    #---

    #data = np.array([])
    data = []
    num_iters = sample_size
    num_completed = 0
    while num_completed < num_iters:
        pool = createPool(tick_data, pool_data, token_data)
        try:
            # data = np.append(
            #     data,
            #     [run_model(pool, lower_bound, upper_bound, token0_quantity, token1_quantity, trades_per_day, trade_distr)],
            #     axis=0
            # )
            temp = run_model(pool, lower_bound, upper_bound, token0_quantity, token1_quantity, trades_per_day, trade_distr)
            if float('nan') in temp: continue
            data.append(temp)
            print("Success:", num_completed)
            num_completed += 1
        except:
            print("Failed:", num_completed)

    box = np.array(data)
    box = np.sort(box, axis=0)

    print("FINISHED RUNNING MODEL")

    res = {
        "worst": [i for i in box[num_iters // 20]],
        "best": [i for i in box[num_iters - (num_iters // 20)]],
        "median": [i for i in box[num_iters // 2]],
        "first": [i for i in box[num_iters // 4]],
        "third": [i for i in box[3 * num_iters // 4]]
    }

    return {
        'statusCode': 200,
        'body': res
    }