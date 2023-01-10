from brownie import accounts, ZAOToken
import re


def get_account(index=0):
    return accounts[index]


def validate_token_address(address):
    if not address or len(address) == 0:
        return ZAOToken[-1].address

    potential_address = re.match("/(\b0x[a-f0-9]{40}\b)/g", address)

    if not potential_address:
        return ZAOToken[-1].address

    return potential_address


def validate_user_address(address):
    if not address or len(address) == 0:
        return get_account()

    potential_address = re.match("/(\b0x[a-f0-9]{40}\b)/g", address)

    if not potential_address:
        return get_account()

    return potential_address
