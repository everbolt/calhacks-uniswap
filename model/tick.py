from math import sqrt
class Tick:
    ##pa and pb are square roots of endpoints of tick
    def __init__(self, ltick, rtick, L):
        self.pa = pow(1.0001, ltick)
        self.pa = sqrt(self.pa)
        self.pb = pow(1.0001, rtick)
        self.pb = sqrt(self.pb)
        self.L = L