import json
import pool
import tick
import math

f = open('model/testing-data/token_info.json')
data = json.load(f)['data']

decimals_dic = {}

# NEED TOKEN ID IN TOKEN_INFO.JSON, PUT IN MANUALLY FOR NOW

for token in data:
    decimals_dic[token['id']] = token['decimals']

f = open('model/Tick-res.json')
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

ret_pool = pool.Pool(liquidity_concentration,
    int(data['pool']['sqrtPrice']) / (2 ** 96 * 10 ** ((decimals_dic[data['pool']['token1']['id']] - decimals_dic[data['pool']['token0']['id']]) / 2)),
    int(data['pool']['liquidity']) / 10 ** ((decimals_dic[data['pool']['token0']['id']] + decimals_dic[data['pool']['token1']['id']]) / 2),
    int(data['pool']['tick']))

def get_pool():
    return ret_pool