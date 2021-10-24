def getTradesPerDay(data):
    sample = data[:2500]
    new_time = sample[0]["timestamp"]
    old_time = sample[-1]["timestamp"]
    time_diff = int(new_time) - int(old_time)
    return int(2500 / (time_diff / 60 / 60/ 24))