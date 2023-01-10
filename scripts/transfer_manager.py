from brownie import ZAOToken
from scripts.utilities import get_account


def transfer_from_to(from_account=0, to_account=1, amount=100):
    zao_token = ZAOToken[-1]

    zao_token.transfer(to_account, amount, {"from": from_account})


def main():
    transfer_from_to()
