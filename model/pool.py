import numpy as np

class Pool:
    def __init__(self, liquidity_concentration, sqrtPrice, liquidity):
        self.liquidity_concentration = liquidity_concentration
        self.price0 = sqrtPrice**2

    def verify_liquidity(quantity0, quantity1, minPrice0, maxPrice0):
        return True

    def add_liquidity(self, minPrice0, maxPrice0, quantity0, quantity1):
        if not verify_liquidity(quantity0, quantity1):
            return
