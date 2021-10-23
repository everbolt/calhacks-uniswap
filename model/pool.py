import numpy as np

class Pool:
    def __init__(self, liquidity_concentration, sqrtPrice, liquidity, curTick):
        self.liquidity_concentration = liquidity_concentration
        self.sqrtPrice = sqrtPrice
        self.liquidity = liquidity
        self.tick = curTick

    def verify_liquidity(quantity0, quantity1, minPrice0, maxPrice0):
        return True

    def add_liquidity(self, minPrice0, maxPrice0, quantity0, quantity1):
        if not self.verify_liquidity(quantity0, quantity1):
            return
        
    def swap(self, deltaX):
        if deltaX < 0:
            if abs(deltaX) > self.liquidity_concentration[self.tick]/self.liquidity_concentration[self.tick].pa - self.liquidity/self.sqrtPrice:
                deltaX += self.liquidity_concentration[self.tick].L/self.liquidity_concentration[self.tick].pa - self.liquidity/self.sqrtPrice
                self.sqrtPrice = self.liquidity_concentration[self.tick].L/self.liquidity_concentration[self.tick].pa
                self.tick += 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                curX = self.liquidity/self.sqrtPrice
                curX += deltaX
                curY = self.liquidity/(curX+self.liquidity/self.liquidity_concentration[self.tick].pb)-self.liquidity/self.liquidity_concentration[self.tick].pa
                self.sqrtPrice = np.sqrt(curY/curX)
        else:
            if deltaX > self.liquidity/self.sqrtPrice-self.liquidity_concentration[self.tick].L/self.liquidity_concentration[self.tick].pb:
                deltaX -= self.liquidity/self.sqrtPrice-self.liquidity_concentration[self.tick].L/self.liquidity_concentration[self.tick].pb
                self.sqrtPrice = self.liquidity_concentration[self.tick]/self.liquidity_concentration[self.tick].pb
                self.tick -= 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                curX = self.liquidity/self.sqrtPrice
                curX += deltaX
                curY = self.liquidity/(curX+self.liquidity/self.liquidity_concentration[self.tick].pb)-self.liquidity/self.liquidity_concentration[self.tick].pa
                self.sqrtPrice = np.sqrt(curY/curX)