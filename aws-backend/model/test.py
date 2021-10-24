from tick import Tick
from pool import Pool
from trade_distribution import create_trade_distribution
from swap_parser import swapParser
import numpy as np


t = Tick(-1000, 1000, 0, 0, 5000000)
#t1 = Tick(-2000, -1000, 5000000)
liquidity_concentration = [t]
p = Pool(liquidity_concentration, 1, 5000000, 0)
print(p.getX())
print(p.getY())
deltaX = 2000
deltaL = deltaX/(1 - 1/t.next)
deltaY = deltaL * (1-t.prev)
p.add_liquidity(t.prev**2, t.next**2, deltaX, deltaY)
print(p.getX())
print(p.getY())
p.swap(50)
print(p.getX())
print(p.getY())
print(p.coin_value())
print(p.fee_value())

'''
dist = swapParser()
print(sum(dist)/len(dist))
np.random.shuffle(dist)
#print(dist)
dist = dist.reshape(-1, 1)
trade_dist = create_trade_distribution(dist)
sample = trade_dist(100)
print(sample)
print(sum(sample)/len(sample))
'''