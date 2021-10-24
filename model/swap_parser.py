import json
import swap
import math
import numpy as np

f = open('./Trade-res.json')
data = json.load(f)['data']['pool']

swap_distribution = []

for curr_swap in data['swaps']:
    #swap_distribution += [swap.Swap(float(curr_swap['amount0']), float(curr_swap['amount1']), int(curr_swap['timestamp']))]
    swap_distribution.append(float(curr_swap['amount0']))

def get_swap_dist():
    return np.array(swap_distribution)

#print(swap_distribution)