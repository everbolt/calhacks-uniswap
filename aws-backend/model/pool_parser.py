import json
import pool
import tick
import math

#from gql_calls import *
#data = getTokenData()
def getTokenDecimals(data):
    decimals_dic = {}
    for token in data:
        decimals_dic[token['id']] = int(token['decimals'])

    return decimals_dic

#from gql_calls import *
#data_tick = getTicks(pool_id)
#data_pool = getPoolData(pool_id)
def createPool(data_tick, data_pool, data_tokens):
    
    decimals_dic = getTokenDecimals(data_tokens)
    
    liquidity_concentration = []

    for curr_tick in data_tick:
        liquidity_concentration += [tick.Tick(0, 0, int(curr_tick['tickIdx']), int(curr_tick['liquidityGross']), int(curr_tick['liquidityNet']))]

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
        int(data_pool['sqrtPrice']) / (2 ** 96 * 10 ** ((decimals_dic[data_pool['token1']['id']] - decimals_dic[data_pool['token0']['id']]) / 2)),
        int(data_pool['liquidity']) / 10 ** ((decimals_dic[data_pool['token0']['id']] + decimals_dic[data_pool['token1']['id']]) / 2),
        int(data_pool['tick']))
    
    return ret_pool