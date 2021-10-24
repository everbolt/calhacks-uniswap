import numpy as np
from sklearn.mixture import GaussianMixture

def create_trade_distribution(trade_data):
    models = []
    for i in range(5, 25):
        models.append(GaussianMixture(n_components=i+1, covariance_type='spherical').fit(trade_data))
    BIC = [m.bic(trade_data) for m in models]
    best_model = models[np.argmin(BIC)]
    print(best_model.n_components)

    def trade_dist(n=1):
        samples = best_model.sample(n_samples=n)[0].reshape(n)
        np.random.shuffle(samples)
        return samples

    return trade_dist