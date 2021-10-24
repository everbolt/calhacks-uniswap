import numpy as np

class Pool:
    def __init__(self, liquidity_concentration, sqrtPrice, liquidity, curTick, fee=0.003):
        self.liquidity_concentration = liquidity_concentration
        self.sqrtPrice = sqrtPrice
        self.liquidity = liquidity
        self.tick = curTick
        self.leftTrack = -1
        self.rightTrack = -1
        self.fee = fee
        self.fees_collectedX = 0
        self.fees_collectedY = 0
        self.liquidity_tracked = 0


    def add_liquidity(self, minPrice0, maxPrice0, deltaX, deltaY, track=True):
        #print(minPrice0)
        #print(maxPrice0)
        #print(deltaX)
        #print(deltaY)
        deltaL = None
        pa = np.sqrt(minPrice0)
        pb = np.sqrt(maxPrice0)
        if deltaX == 0:
            deltaL = deltaY/(pb-pa)
        elif deltaY == 0:
            deltaL = deltaX/(1/pa-1/pb)
        else:
            deltaL = deltaX/(1/self.sqrtPrice - 1/pb)
            if abs(deltaL-deltaY/(self.sqrtPrice-pa)) > 0.1:
                print("unable to add: " + str(abs(deltaL-deltaY/(self.sqrtPrice-pa))))
                return
        if not deltaL:
            return
        print("liquidity added:" + str(deltaL))
        lo = 0
        hi = len(self.liquidity_concentration)-1
        while lo < hi:
            mid = (lo + hi) // 2
            if self.liquidity_concentration[mid].prev < pa:
                lo = mid + 1
            elif self.liquidity_concentration[mid].prev > pa:
                hi = mid - 1
            else:
                lo = mid
                hi = mid
        l = lo

        lo = 0
        hi = len(self.liquidity_concentration)
        while lo < hi:
            mid = (lo + hi) // 2
            if self.liquidity_concentration[mid].prev < pb:
                lo = mid + 1
            elif self.liquidity_concentration[mid].prev > pb:
                hi = mid
            else:
                lo = mid
                hi = mid
        r = lo
        
        self.liquidity_concentration[l].netL += deltaL
        if r < len(self.liquidity_concentration):
            self.liquidity_concentration[r].netL -= deltaL
        if l <= self.tick and r > self.tick:
            self.liquidity += deltaL

        if track:
            self.leftTrack = l
            self.rightTrack = r
            self.trackX = deltaX
            self.trackY = deltaY
            self.fees_collectedX = 0
            self.fees_collectedY = 0
            self.init_value_x = deltaX + deltaY/(self.sqrtPrice**2)
            self.liquidity_tracked = deltaL
        
    def swap(self, deltaX):
        # print("deltaX: " + str(deltaX))
        virtualX = self.liquidity/self.sqrtPrice
        init_price = self.sqrtPrice
        if deltaX < 0:
            tickX = virtualX - self.liquidity/self.liquidity_concentration[self.tick].next
            if abs(deltaX) > tickX:
                deltaX += tickX
                self.sqrtPrice = self.liquidity_concentration[self.tick].next
                deltaY = (init_price-self.sqrtPrice)*self.liquidity
                if self.tick >= self.leftTrack and self.tick < self.rightTrack:
                    self.fees_collectedY += self.fee*deltaY*(self.liquidity_tracked/self.liquidity)
                self.tick += 1
                self.liquidity += self.liquidity_concentration[self.tick].netL
                self.swap(deltaX)
            else:
                virtualX += deltaX
                virtualY = (self.liquidity/np.sqrt(virtualX))**2
                self.sqrtPrice = np.sqrt(virtualY/virtualX)
                deltaY = (init_price-self.sqrtPrice)*self.liquidity
                if self.tick >= self.leftTrack and self.tick < self.rightTrack:
                    self.fees_collectedY += self.fee*deltaY*(self.liquidity_tracked/self.liquidity)
                deltaX = 0
        else:
            if self.liquidity_concentration[self.tick].prev == 0:
                print(self.tick)
            tickX = self.liquidity/self.liquidity_concentration[self.tick].prev-virtualX
            if deltaX > tickX:
                deltaX -= tickX
                if self.tick >= self.leftTrack and self.tick < self.rightTrack:
                    self.fees_collectedX += tickX*(1/(1-self.fee)-1)*(self.liquidity_tracked/self.liquidity)
                self.sqrtPrice = self.liquidity_concentration[self.tick].prev
                self.tick -= 1
                self.liquidity -= self.liquidity_concentration[self.tick].netL
                self.swap(deltaX)
            else:
                if self.tick >= self.leftTrack and self.tick < self.rightTrack:
                    self.fees_collectedX += deltaX*(1/(1-self.fee)-1)*(self.liquidity_tracked/self.liquidity)
                virtualX += deltaX
                virtualY = (self.liquidity/np.sqrt(virtualX))**2
                self.sqrtPrice = np.sqrt(virtualY/virtualX)
                deltaX = 0
    
    def getX(self):
        return self.liquidity_tracked/self.sqrtPrice - self.liquidity_tracked/self.liquidity_concentration[self.rightTrack].prev

    def getY(self):
        return self.liquidity_tracked*self.sqrtPrice - self.liquidity_tracked*self.liquidity_concentration[self.leftTrack].prev
    
    def value(self, X, Y):
        return X + Y/(self.sqrtPrice**2)

    def coin_value(self):
        return self.value(self.getX(), self.getY())
    
    def fee_value(self):
        return self.value(self.fees_collectedX, self.fees_collectedY)

    def total_value(self):
        return self.fee_value() + self.coin_value()
    
    def init_value(self):
        return self.init_value_x