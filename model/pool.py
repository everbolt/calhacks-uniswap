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
        if deltaX < 0:
            if abs(deltaX) > self.liquidity*(1/self.liquidity_concentration[self.tick].pa - 1/self.sqrtPrice):
                deltaX += self.liquidity*(1/self.liquidity_concentration[self.tick].pa - 1/self.sqrtPrice)
                self.sqrtPrice = self.liquidity_concentration[self.tick].pb
                self.tick += 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                curX = self.liquidity/self.sqrtPrice
                curX += deltaX
                curY = (self.liquidity**2)/(curX+self.liquidity/self.liquidity_concentration[self.tick].pb)-self.liquidity*self.liquidity_concentration[self.tick].pa
                print(curX)
                print(curY)
                self.sqrtPrice = np.sqrt(curY/curX)
        else:
            print(self.liquidity*(1/self.sqrtPrice-1/self.liquidity_concentration[self.tick].pb))
            if deltaX > self.liquidity*(1/self.sqrtPrice-1/self.liquidity_concentration[self.tick].pb):
                deltaX -= self.liquidity/self.sqrtPrice-self.liquidity_concentration[self.tick].L/self.liquidity_concentration[self.tick].pb
                self.sqrtPrice = self.liquidity_concentration[self.tick].pa
                self.tick -= 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                curX = self.liquidity/self.sqrtPrice-self.liquidity/self.liquidity_concentration[self.tick].pb
                curX += deltaX
                print(str(self.liquidity_concentration[self.tick].pa) + " " + str(self.liquidity_concentration[self.tick].pb))
                curY = (self.liquidity**2)/(curX+self.liquidity/self.liquidity_concentration[self.tick].pb)-self.liquidity*self.liquidity_concentration[self.tick].pa
                print(curX)
                print(curY)
                self.sqrtPrice = np.sqrt(curY/curX)
                deltaX = 0
    
    def getX(self):
        return self.liquidity/self.sqrtPrice-self.liquidity/self.liquidity_concentration[self.tick].pb

    def getY(self):
        curX = self.liquidity/self.sqrtPrice-self.liquidity/self.liquidity_concentration[self.tick].pb
        return (self.liquidity**2)/(curX+self.liquidity/self.liquidity_concentration[self.tick].pb)-self.liquidity*self.liquidity_concentration[self.tick].pa