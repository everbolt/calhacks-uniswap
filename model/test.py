from tick import Tick
from pool import Pool

t = Tick(-300, 300, 5000)
liquidity_concentration = [t]
p = Pool(liquidity_concentration, 1, 5000, 0)
print(p.getX())
print(p.getY())
p.swap(30)
print(p.getX())
print(p.getY())
