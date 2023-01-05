// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../token/SampleToken.sol";
import "../../interfaces/auction/Auction.sol";

contract MyAuction is Auction {
    SampleToken public tokenContract;

    constructor(
        uint256 _biddingTime,
        address payable _owner,
        string memory _brand,
        string memory _rNumber,
        SampleToken _tokenContract // maybe add a modifier
    ) {
        auctionOwner = _owner;
        auctionStart = block.timestamp;
        auctionEnd = auctionStart + _biddingTime * 1 hours;
        STATE = auctionState.STARTED;
        myCar.brand = _brand;
        myCar.rNumber = _rNumber;
        tokenContract = _tokenContract;
    }

    function get_owner() public view returns (address) {
        return auctionOwner;
    }

    fallback() external payable {}

    receive() external payable {}

    function bid(uint256 _amount)
        public
        payable
        override
        auctionOngoing
        returns (bool)
    {
        require(bidOf[msg.sender] == 0);
        require(_amount != 0);
        require(_amount > highestBid);

        emit BidEvent(highestBidder, highestBid);

        highestBid = _amount;
        highestBidder = msg.sender;
        bidders.push(msg.sender);
        bidOf[msg.sender] = highestBid;
        tokenContract.transferFrom(msg.sender, address(this), _amount);
        return true;
    }

    function cancelAuction()
        external
        override
        ownerOnly
        auctionOngoing
        returns (bool)
    {
        STATE = auctionState.CANCELLED;
        emit CanceledEvent("Auction Cancelled", block.timestamp);
        return true;
    }

    function withdraw() public override auctionEnded returns (bool) {
        uint256 amount = bidOf[msg.sender];

        bidOf[msg.sender] = 0;

        emit WithdrawalEvent(msg.sender, amount);

        tokenContract.transfer(msg.sender, amount);

        return true;
    }

    function retrieveFunds() external ownerOnly auctionEnded returns (bool) {
        tokenContract.transfer(
            msg.sender,
            tokenContract.balanceOf(address(this))
        );

        return true;
    }

    function destructAuction() external ownerOnly auctionEnded returns (bool) {
        for (uint256 i = 0; i < bidders.length; i++) {
            if (bidOf[bidders[i]] != 0) {
                tokenContract.transferFrom(
                    address(this),
                    bidders[i],
                    bidOf[bidders[i]]
                );
            }
        }

        selfdestruct(auctionOwner);
        return true;
    }
}
