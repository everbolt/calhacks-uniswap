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
        print("deltaX: " + str(deltaX))
        virtualX = self.liquidity/self.sqrtPrice
        if deltaX < 0:
            tickX = virtualX - self.liquidity/self.liquidity_concentration[self.tick].pb
            if abs(deltaX) > tickX:
                deltaX += tickX
                self.sqrtPrice = self.liquidity_concentration[self.tick].pb
                self.tick += 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                virtualX += deltaX
                virtualY = (self.liquidity/np.sqrt(virtualX))**2
                self.sqrtPrice = np.sqrt(virtualY/virtualX)
                deltaX = 0
        else:
            tickX = self.liquidity*self.liquidity_concentration[self.tick].pa-virtualX
            if deltaX > tickX:
                deltaX -= tickX
                self.sqrtPrice = self.liquidity_concentration[self.tick].pa
                self.tick -= 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                virtualX += deltaX
                virtualY = (self.liquidity/np.sqrt(virtualX))**2
                self.sqrtPrice = np.sqrt(virtualY/virtualX)
                deltaX = 0
    
    def getX(self):
        return self.liquidity/self.sqrtPrice - self.liquidity/self.liquidity_concentration[self.tick].pb

    def getY(self):
        return self.liquidity*self.sqrtPrice - self.liquidity*self.liquidity_concentration[self.tick].pa