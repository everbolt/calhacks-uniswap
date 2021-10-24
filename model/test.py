from tick import Tick
from pool import Pool
from trade_distribution import create_trade_distribution
from swap_parser import get_swap_dist
import numpy as np

'''
t = Tick(-1000, 1000, 5000000)
t1 = Tick(-2000, -1000, 5000000)
liquidity_concentration = [t]
p = Pool(liquidity_concentration, 1, 5000000, 0)
print(p.getX())
print(p.getY())
p.swap(-50)
print(p.getX())
print(p.getY())

p.swap(50)
print(p.getX())
print(p.getY())
'''

dist = get_swap_dist()
print(sum(dist)/len(dist))
np.random.shuffle(dist)
#print(dist)
dist = dist.reshape(-1, 1)
trade_dist = create_trade_distribution(dist)
sample = trade_dist(100)
print(sample)
print(sum(sample)/len(sample))