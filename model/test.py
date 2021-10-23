from tick import Tick
from pool import Pool

t = Tick(-2000, 2000, 5000000)
liquidity_concentration = [t]
p = Pool(liquidity_concentration, 1, 5000000, 0)
print(p.getX())
print(p.getY())
p.swap(-p.getX())
print(p.getX())
print(p.getY())
