import numpy as np

class Simulator:
    def __init__(self, pool, price0Min, price0Max, init0, init1, trades_per_day, trade_distr):
        self.pool = pool
        self.price0Min = price0Min
        self.price0Max = price0Max
        self.init0 = init0
        self.init1 = init1
        self.trades_per_day = trades_per_day
        self.trade_distr = trade_distr

    def simulate_day(self):
        num_trades = np.random.poisson(self.trades_per_day)
        for _ in range(num_trades):
            self.pool.swap(self.trade_distr())
            #tracking gains/ losses

    def run_simulations(self, num_days=365):
        return