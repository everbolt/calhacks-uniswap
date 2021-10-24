import numpy as np
from sklearn.mixture import GaussianMixture

def create_trade_distribution(trade_data):
    models = []
    for i in range(10):
        models.append(GaussianMixture(i+1).fit(trade_data))
    BIC = [m.bic(trade_data) for m in models]
    best_model = models[np.argmin(BIC)]

    def trade_dist():
        return best_model.sample()

    return trade_dist