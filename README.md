# SolidityCustomTokenAuction - Homework 2

# Contract Requirements Breakdown
ZAOToken
- a ERC-20 token that respects the Checks-Effects-Interaction pattern in its methods
- implements all mandatory functionalities so that the contract coresponds to the ERC-20 standard

ZAOTokenSale
- uses the tranferFrom method in order to sell the tokens after owner approval
- allows the owner to modify the token price allocated on contract creation
- allows the buyer to not have to pay the exact sum when aquiring tokens, but to be able to pay more and receive the remainder after the purchase
- automated minting functionality: on transfering 10000 units the owner balance and the total supply of token will be increased by 1

MyAuction
- contract that allows the transfer of tokens for the purpose of car auctions through different operations(bidding, withdrawing, etc.)
- a bidder may only bid once and will not be able to overwrite the amount bid
- the owner may cancel or finalize the auction - receive the winning amount bid, while the losing bids will be returned before contract destruction
# Team Members
- Amarandei Alexandru
- Ochesanu Mihnea
- Zaharia Andrei