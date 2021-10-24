import json
import pool
import tick

f = open('./Tick-res.json')
data = json.load(f)['data']

liquidity_concentration = []

for curr_tick in data['ticks']:
    liquidity_concentration += [tick.Tick(int(curr_tick['tickIdx']) - 1, int(curr_tick['tickIdx']) + 1, int(curr_tick['liquidityGross']))]

# int(data['token1Price']) = (int(data['pool']['sqrtPrice']) / 2 ** 96) ** 2 / 10 ** (xxx - xxx)
# above implies
# *true* sqrtPrice = int(data['pool']['sqrtPrice']) / (2 ** 96 * 10 ** ((xxx - xxx) / 2))

curr_pool = pool.Pool(liquidity_concentration, int(data['pool']['sqrtPrice']), int(data['pool']['liquidity']), int(data['pool']['tick']))

print(curr_pool)