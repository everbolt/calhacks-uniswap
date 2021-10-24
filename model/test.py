from tick import Tick
from pool import Pool
from trade_distribution import create_trade_distribution
import numpy as np

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

dist = np.concatenate((np.random.normal(-4, 1, 30), np.random.normal(30, 2, 50), np.random.normal(-20, 2, 10)))
np.random.shuffle(dist)
print(dist)
dist = dist.reshape(-1, 1)
trade_dist = create_trade_distribution(dist)
print(trade_dist(20))