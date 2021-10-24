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

def run_model(pool_id, lower_bound, upper_bound, token0_quantity, token1_quantity, ):
    tick_data = getTicks(pool_id)
    swap_data = getSwaps(pool_id)
    pool_data = getPoolData(pool_id)
    token_data = getTokenData()

       
    res_swaps = swapParser(swap_data)
    trade_distr = create_trade_distribution(res_swaps)
    pool = createPool(tick_data, pool_data, token_data)
    trades_per_day = getTradesPerDay(swap_data)

    sim = Simulator(
            pool,
            lower_bound,
            upper_bound,
            token0_quantity,
            token1_quantity,
            trades_per_day,
            trade_distr
        )
    
    day_count = 365
    for day in range(day_count):
        sim.simulate_day()
    
    return sim #TODO: Determine loss/gain of the model here

pool_id = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"
tick_data = getTicks(pool_id)
swap_data = getSwaps(pool_id)
pool_data = getPoolData(pool_id)
token_data = getTokenData()
pool = createPool(tick_data, pool_data, token_data)