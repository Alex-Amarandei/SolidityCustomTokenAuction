from brownie import MyAuction
from scripts.utilities import validate_user_address


def cancel_auction(index=-1, address=None):
    contract = MyAuction[min(index, len(MyAuction) - 1)]
    print(contract.address)

    address = validate_user_address(address)

    contract.cancelAuction({"from": address})


def main():
    cancel_auction(-2)
