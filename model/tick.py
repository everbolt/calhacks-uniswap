class Tick:
    ##pa and pb are square roots of endpoints of tick
    def __init__(self, ltick, rtick, L):
        self.pa = pow(1.0001, ltick)
        self.pa = pow(1.0001, rtick)
        self.L = L