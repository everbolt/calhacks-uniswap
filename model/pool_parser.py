import json
import pool

f = open('model\Tick-res.json')
data = json.load(f)

liquidity_concentration = []

curr_pool = pool.Pool(liquidity_concentration, data['pool']['sqrtPrice'], data['pool']['liquidity'], data['pool']['tick'])