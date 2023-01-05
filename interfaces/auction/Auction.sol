// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Auction {
    address payable internal auctionOwner;
    uint256 public auctionStart;
    uint256 public auctionEnd;
    uint256 public highestBid;
    address public highestBidder;

    enum auctionState {
        CANCELLED,
        STARTED
    }

    struct car {
        string brand;
        string rNumber;
    }

    car public myCar;
    address[] bidders;

    mapping(address => uint256) public bidOf;

    auctionState public STATE;

    modifier auctionOngoing() {
        require(
            block.timestamp <= auctionEnd && STATE == auctionState.STARTED,
            "Auction must be ongoing."
        );
        _;
    }

    modifier auctionEnded() {
        require(
            block.timestamp > auctionEnd || STATE == auctionState.CANCELLED,
            "Auction must have ended or canceled."
        );
        _;
    }

    modifier ownerOnly() {
        require(msg.sender == auctionOwner);
        _;
    }

    function bid(uint256 _amount)
        public
        payable
        virtual
        auctionOngoing
        returns (bool)
    {}

    function withdraw() public virtual returns (bool) {}

    function cancelAuction() external virtual returns (bool) {}

    event BidEvent(address indexed highestBidder, uint256 highestBid);
    event WithdrawalEvent(address withdrawer, uint256 amount);
    event CanceledEvent(string message, uint256 time);
}
