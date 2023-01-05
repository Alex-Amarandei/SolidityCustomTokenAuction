// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../token/ZAOToken.sol";
import "../../interfaces/auction/Auction.sol";

/// @title  A token contract allowing for car auctioning using a custom token
/// @author @Alex-Amarandei @Naclyy @ochesanum
/// @dev    Allows buyers to purchase tokens directly from the owner's reserve
contract MyAuction is Auction {
    ZAOToken public tokenContract;

    constructor(
        uint256 _biddingTime,
        address payable _owner,
        string memory _brand,
        string memory _rNumber,
        ZAOToken _tokenContract // maybe add a modifier
    ) {
        auctionOwner = _owner;
        auctionStart = block.timestamp;
        auctionEnd = auctionStart + _biddingTime * 1 hours;
        STATE = auctionState.STARTED;
        myCar.brand = _brand;
        myCar.rNumber = _rNumber;
        tokenContract = _tokenContract;
    }

    event SendPrizeEvent(string message, uint256 time, car myCar);

    modifier highestBidderDenied() {
        require(
            msg.sender != highestBidder,
            "You won the auction, you can't widraw your bid!"
        );
        _;
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
        returns (bool success)
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
        returns (bool success)
    {
        STATE = auctionState.CANCELLED;
        emit CanceledEvent("Auction Cancelled", block.timestamp);

        return true;
    }

    function sendPrize() internal returns (bool success) {
        myCar.owner = highestBidder;
        emit SendPrizeEvent("Ownership Transfered", block.timestamp, myCar);
        return true;
    }

    function withdraw()
        public
        override
        auctionEnded
        highestBidderDenied
        returns (bool success)
    {
        uint256 amount = bidOf[msg.sender];

        bidOf[msg.sender] = 0;

        emit WithdrawalEvent(msg.sender, amount);

        tokenContract.transfer(msg.sender, amount);

        return true;
    }

    function retrieveFunds()
        external
        ownerOnly
        auctionEnded
        returns (bool success)
    {
        require(highestBid != 0);
        tokenContract.transfer(msg.sender, highestBid);
        highestBid = 0;
        bidOf[highestBidder] = 0;
        return true;
    }

    function sendFundsToOwner() internal auctionEnded returns (bool success) {
        require(highestBid != 0);
        tokenContract.transfer(msg.sender, highestBid);
        highestBid = 0;
        bidOf[highestBidder] = 0;
        return true;
    }

    function destructAuction()
        external
        ownerOnly
        auctionEnded
        returns (bool success)
    {
        sendFundsToOwner();
        for (uint256 i = 0; i < bidders.length; i++) {
            if (bidOf[bidders[i]] != 0) {
                tokenContract.transfer(bidders[i], bidOf[bidders[i]]);
            }
        }
        sendPrize();
        selfdestruct(auctionOwner);
        return true;
    }
}
