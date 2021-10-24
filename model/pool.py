import numpy as np

class Pool:
    def __init__(self, liquidity_concentration, sqrtPrice, liquidity, curTick):
        self.liquidity_concentration = liquidity_concentration
        self.sqrtPrice = sqrtPrice
        self.liquidity = liquidity
        self.tick = curTick
        self.leftTrack = -1
        self.rightTrack = -1

    def verify_liquidity(quantity0, quantity1, minPrice0, maxPrice0):
        return True

    def add_liquidity(self, minPrice0, maxPrice0, deltaX, deltaY, track=True):
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
        l = len(self.liquidity_concentration)
        r = -1
        for i in range(len(self.liquidity_concentration)):
            if self.liquidity_concentration[i].prev >= np.sqrt(minPrice0) and self.liquidity_concentration[i].next <= np.sqrt(maxPrice0):
                self.liquidity_concentration[i].L += deltaL
                l = min(l, i)
                r = max(r, i)
        if track:
            self.leftTrack = l
            self.rightTrack = r
            self.trackX = deltaX
            self.trackY = deltaY
            self.fees_collectedX = 0
            self.fees_collectedY = 0
            self.init_value_x = deltaX + deltaY/(self.sqrtPrice**2)
        
    def swap(self, deltaX):
        print("deltaX: " + str(deltaX))
        virtualX = self.liquidity/self.sqrtPrice
        if deltaX < 0:
            tickX = virtualX - self.liquidity/self.liquidity_concentration[self.tick].next
            if abs(deltaX) > tickX:
                deltaX += tickX
                self.sqrtPrice = self.liquidity_concentration[self.tick].next
                self.tick += 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                virtualX += deltaX
                virtualY = (self.liquidity/np.sqrt(virtualX))**2
                self.sqrtPrice = np.sqrt(virtualY/virtualX)
                deltaX = 0
        else:
            tickX = self.liquidity/self.liquidity_concentration[self.tick].prev-virtualX
            if deltaX > tickX:
                deltaX -= tickX
                self.sqrtPrice = self.liquidity_concentration[self.tick].prev
                self.tick -= 1
                self.liquidity = self.liquidity_concentration[self.tick].L
                self.swap(deltaX)
            else:
                virtualX += deltaX
                virtualY = (self.liquidity/np.sqrt(virtualX))**2
                self.sqrtPrice = np.sqrt(virtualY/virtualX)
                deltaX = 0
    
    def getX(self):
        return self.liquidity/self.sqrtPrice - self.liquidity/self.liquidity_concentration[self.tick].next

    def getY(self):
        return self.liquidity*self.sqrtPrice - self.liquidity*self.liquidity_concentration[self.tick].prev
    
    def value(self):
        return self.getX() + self.getY()/(self.sqrtPrice**2)