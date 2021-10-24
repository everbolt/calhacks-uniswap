# from model.simulator import Simulator
# from model.pool_parser import createPool
# from model.swap_parser import swapParser
# from model.trade_distribution import create_trade_distribution
# from model.get_trades_per_day import getTradesPerDay
from simulator import Simulator
from pool_parser import createPool
from swap_parser import swapParser
from trade_distribution import create_trade_distribution
from get_trades_per_day import getTradesPerDay
from gql_calls import *

def run_model(pool_id, lower_bound=0, upper_bound=0, token0_quantity=0, token1_quantity=0, ):
    tick_data = getTicks(pool_id)
    swap_data = getSwaps(pool_id)
    pool_data = getPoolData(pool_id)
    token_data = getTokenData()
       
    res_swaps = swapParser(swap_data)
    trade_distr = create_trade_distribution(res_swaps)
    pool = createPool(tick_data, pool_data, token_data)
    trades_per_day = getTradesPerDay(swap_data)

    #hardcoded for testing
    lower_bound = pool.liquidity_concentration[288].prev
    upper_bound = pool.liquidity_concentration[302].next
    deltaX = 50
    deltaL = deltaX/(1/pool.sqrtPrice - 1/upper_bound)
    deltaY = deltaL * (pool.sqrtPrice-lower_bound)
    lower_bound = lower_bound**2
    upper_bound = upper_bound**2
    token0_quantity = deltaX
    token1_quantity = deltaY

    sim = Simulator(
            pool,
            lower_bound,
            upper_bound,
            token0_quantity,
            token1_quantity,
            trades_per_day,
            trade_distr
        )
    
    return sim.run_simulations(50)

pool_id = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"


print(run_model(pool_id))