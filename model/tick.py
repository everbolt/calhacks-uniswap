from math import sqrt
class Tick:
    def __init__(self, prev, next, idx, grossL, netL):
        self.idx = idx
        self.val = sqrt(pow(1.0001, idx))
        self.prev = sqrt(pow(1.0001, prev))
        self.next = sqrt(pow(1.0001, next))
        self.grossL = grossL
        self.netL = netL