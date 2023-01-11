from brownie import MyAuction
from scripts.utilities import validate_user_address


def destroy_auction(index=-1, address=None):
    contract = MyAuction[min(index, len(MyAuction) - 1)]
    address = validate_user_address(address)

    contract.destructAuction({"from": address})


def main():
    destroy_auction(-2)
