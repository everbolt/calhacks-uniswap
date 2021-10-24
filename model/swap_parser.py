import json
import swap
import math
import numpy as np

f = open('./Trade-res.json')
data = json.load(f)['data']['pool']

swaps = []

for curr_swap in data['swaps']:
    #swap_distribution += [swap.Swap(float(curr_swap['amount0']), float(curr_swap['amount1']), int(curr_swap['timestamp']))]
    swaps.append(float(curr_swap['amount0']))
    
#print(swap_distribution)
def get_swaps():
    return np.array(swaps)
