import json
import pool
import tick

f = open('model\Tick-res.json')
data = json.load(f)['data']

liquidity_concentration = []

for curr_tick in data['ticks']:
    liquidity_concentration += [tick.Tick(int(curr_tick['tickIdx']), int(curr_tick['tickIdx']), int(curr_tick['liquidityGross']))]

curr_pool = pool.Pool(liquidity_concentration, int(data['pool']['sqrtPrice']), int(data['pool']['liquidity']), int(data['pool']['tick']))