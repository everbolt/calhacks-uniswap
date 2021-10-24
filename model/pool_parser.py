import json
import pool
import tick
import math

f = open('./Tick-res.json')
data = json.load(f)['data']

liquidity_concentration = []

for curr_tick in data['ticks']:
    liquidity_concentration += [tick.Tick(0, 0, int(curr_tick['tickIdx']), int(curr_tick['liquidityGross']), 0)]

liquidity_concentration = sorted(liquidity_concentration, key = lambda tick: tick.idx)

for i in range(len(liquidity_concentration)):
    if i == 0: liquidity_concentration[i].prev = 0
    else: liquidity_concentration[i].prev = liquidity_concentration[i - 1].val
    if i == len(liquidity_concentration) - 1: liquidity_concentration[i].next = math.inf
    else: liquidity_concentration[i].next = liquidity_concentration[i + 1].val

# int(data['token1Price']) = (int(data['pool']['sqrtPrice']) / 2 ** 96) ** 2 / 10 ** (xxx - xxx)
# above implies
# *true* sqrtPrice = int(data['pool']['sqrtPrice']) / (2 ** 96 * 10 ** ((xxx - xxx) / 2))

curr_pool = pool.Pool(liquidity_concentration, int(data['pool']['sqrtPrice']), int(data['pool']['liquidity']), int(data['pool']['tick']))

print(curr_pool)