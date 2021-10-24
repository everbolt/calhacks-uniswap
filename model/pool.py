import numpy as np

class Pool:
    def __init__(self, liquidity_concentration, sqrtPrice, liquidity, curTick):
        self.liquidity_concentration = liquidity_concentration
        self.sqrtPrice = sqrtPrice
        self.liquidity = liquidity
        self.tick = curTick

    def verify_liquidity(quantity0, quantity1, minPrice0, maxPrice0):
        return True

    def add_liquidity(self, minPrice0, maxPrice0, deltaX, deltaY):
        deltaL = None
        if deltaX == 0:
            deltaL = deltaY/(np.sqrt(maxPrice0)-np.sqrt(minPrice0))
        elif deltaY == 0:
            deltaL = deltaX/(1/np.sqrt(minPrice0)-1/np.sqrt(maxPrice0))
        else:
            deltaL = deltaX/(1/self.sqrtPrice - 1/np.sqrt(maxPrice0))
            if abs(deltaL-deltaY/(self.sqrtPrice-np.sqrt(minPrice0))) > 0.01:
                return
        if not deltaL:
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
            tickX = self.liquidity/self.liquidity_concentration[self.tick].pa-virtualX
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
        print(str(self.liquidity/self.sqrtPrice) + " " + str(self.liquidity_concentration[self.tick].pb))
        return self.liquidity/self.sqrtPrice - self.liquidity/self.liquidity_concentration[self.tick].pb

    def getY(self):
        return self.liquidity*self.sqrtPrice - self.liquidity*self.liquidity_concentration[self.tick].pa