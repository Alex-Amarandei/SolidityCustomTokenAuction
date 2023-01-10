from brownie import ZAOToken
from scripts.utilities import get_account


def balance_of_account_by_index(index=0):
    account = get_account(index)

    zao_token = ZAOToken[-1]

    balance = zao_token.balanceOf(account, {"from": account})
    print(balance)

    return balance


def balance_of_account_by_address(address=None):
    address = validate_user_address(address)

    zao_token = ZAOToken[-1]

    balance = zao_token.balanceOf(address, {"from": address})
    print(balance)

    return balance


def main():
    balance_of_account_by_index()
    # balance_of_account_by_address()
