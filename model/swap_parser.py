import json
import swap

f = open('model/Trade-res.json')
data = json.load(f)['data']['pool']

swaps = []

for curr_swap in data['swaps']:
    swaps += [swap.Swap(float(curr_swap['amount0']), float(curr_swap['amount1']), int(curr_swap['timestamp']))]

def get_swaps():
    return swaps