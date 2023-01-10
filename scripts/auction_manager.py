from scripts.utilities import validate_token_address, validate_user_address
from scripts.constants import BIDDING_TIME, CAR_BRAND, REGISTRATION_NUMBER
from scripts.deployment_manager import deploy_auction


def create_new_auction(
    bidding_time=BIDDING_TIME,
    owner_address="",
    car_brand=CAR_BRAND,
    registration_number=REGISTRATION_NUMBER,
    token_contract_address="",
):
    owner_address = validate_user_address(owner_address)
    token_contract_address = validate_token_address(token_contract_address)

    deploy_auction(
        bidding_time,
        owner_address,
        car_brand,
        registration_number,
        token_contract_address,
    )


def main():
    create_new_auction()
