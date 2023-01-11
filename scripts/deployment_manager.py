from brownie import ZAOToken, MyAuction, accounts
from scripts.constants import (
    INITIAL_SUPPLY,
    BIDDING_TIME,
    CAR_BRAND,
    REGISTRATION_NUMBER,
)
from scripts.utilities import validate_token_address, validate_user_address


def deploy_zao_token(deployment_account=None):
    deployment_account = validate_user_address(deployment_account)

    zao_token = ZAOToken.deploy(INITIAL_SUPPLY, {"from": deployment_account})
    print(f"Contract deployed to {zao_token.address}")


def deploy_auction(
    bidding_time,
    owner_address,
    car_brand,
    registration_number,
    token_contract_address,
    deployment_account=None,
):
    deployment_account = validate_user_address(deployment_account)

    auction = MyAuction.deploy(
        BIDDING_TIME,
        owner_address,
        CAR_BRAND,
        REGISTRATION_NUMBER,
        token_contract_address,
        {"from": deployment_account},
    )
    print(f"Contract deployed to {auction.address}")


def main():
    deploy_zao_token()
    deploy_auction()
