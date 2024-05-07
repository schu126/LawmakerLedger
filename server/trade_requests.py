import requests

def get_senate_trade_data():
    url = "https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json"
    headers = {'Accept': 'application/json'}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            trade_data = response.json()
            return trade_data
        except ValueError:
            print("Failed to decode JSON from response:")
            print(response.text)
            return None
    else:
        print(f"Error fetching Senate data: {response.status_code}")
        print(response.text)
        return None

def get_house_trade_data():
    url = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json"
    headers = {'Accept': 'application/json'}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            trade_data = response.json()
            return trade_data
        except ValueError:
            print("Failed to decode JSON from response:")
            print(response.text)
            return None
    else:
        print(f"Error fetching House data: {response.status_code}")
        print(response.text)
        return None
