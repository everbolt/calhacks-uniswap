import json
import numpy as np
import sklearn

def lambda_handler(event, context):
    parameters = event["queryStringParameters"]
    pool_id = parameters["pool_id"]
    lower_bound = parameters["lower_bound"]
    upper_bound = parameters["upper_bound"]
    token0_symbol = parameters["token0_symbol"]
    token1_symbol = parameters["token1_symbol"]
    token0_quantity = parameters["token0_quantity"]
    token1_quantity = parameters["token1_quantity"]

    print(pool_id)
    print(lower_bound)
    print(upper_bound)
    print(token0_symbol)
    print(token1_symbol)
    print(token0_quantity)
    print(token1_quantity)

    return {
        'statusCode': 200,
        'body': json.dumps(int(lower_bound) + int(upper_bound))
    }