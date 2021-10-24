from math import sqrt
class Tick:
    def __init__(self, prev, next, idx, grossL, netL, decimal0, decimal1):
        self.idx = idx
        self.val = sqrt(pow(1.0001, idx) / 10**(decimal1 - decimal0))
        self.prev = sqrt(pow(1.0001, prev))
        self.next = sqrt(pow(1.0001, next))
        self.grossL = grossL / 10**((decimal0 + decimal1)/2)
        self.netL = netL / 10**((decimal0 + decimal1)/2)

    def __repr__(self):
        return f"Idx: {self.idx}, Val: {self.val}, Prev: {self.prev}, Next: {self.next}, GrossL: {self.grossL}, NetL: {self.netL}"