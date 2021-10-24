import json
import swap
import math
import numpy as np

#from gql_calls import *
#data = getSwaps(pool_id)
def swapParser(data):
    swaps = []
    for curr_swap in data:
        #swap_distribution += [swap.Swap(float(curr_swap['amount0']), float(curr_swap['amount1']), int(curr_swap['timestamp']))]
        swaps.append(swap.Swap(float(curr_swap['amount0']), float(curr_swap['amount1']), int(curr_swap['timestamp'])))
    return np.array(swaps)