import requests

def get_senate_trade_data():
    url = "https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json"
    response = requests.get(url)

    if response.status_code == 200:
        trade_data = response.json()
        return trade_data
    else:
        print(f"Error fetching Senate data: {response.status_code}")
        return None

def get_house_trade_data():
    url = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json"
    response = requests.get(url)

    if response.status_code == 200:
        trade_data = response.json()
        return trade_data
    else:
        print(f"Error fetching House data: {response.status_code}")
        return None