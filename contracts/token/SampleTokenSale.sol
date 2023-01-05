// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SampleToken.sol";

contract SampleTokenSale {
    SampleToken public tokenContract;
    uint256 private tokenPrice;
    address private owner;
    uint256 private tokensSold;

    event LogCreateContract(
        address _owner,
        SampleToken _tokenContract,
        uint256 _initialTokenPrice
    );
    event LogSell(address indexed _buyer, uint256 indexed _amount);
    event LogApprove(uint256 _amountToApprove);

    modifier ownerOnly() {
        require(
            msg.sender == owner,
            "Only the contract owner is allowed to call this function"
        );
        _;
    }

    constructor(SampleToken _tokenContract, uint256 _tokenPrice) {
        emit LogCreateContract(msg.sender, _tokenContract, _tokenPrice);

        owner = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function getTokenPrice() public view returns (uint256) {
        return tokenPrice;
    }

    function getTokensSold() public view returns (uint256) {
        return tokensSold;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function setTokenPrice(uint256 _tokenPrice)
        external
        ownerOnly
        returns (bool success)
    {
        require(_tokenPrice != 0);

        tokenPrice = _tokenPrice;

        return true;
    }

    function approvePartialContractSpend(uint256 _amountToApprove)
        external
        ownerOnly
    {
        emit LogApprove(_amountToApprove);

        tokenContract.approve(address(this), _amountToApprove);
    }

    function approveTotalContractSpend() external ownerOnly {
        uint256 totalSupply = tokenContract.totalSupply();

        emit LogApprove(totalSupply);

        tokenContract.approve(address(this), totalSupply);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        uint256 totalValue = _numberOfTokens * tokenPrice;
        require(msg.value >= totalValue);
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);

        emit LogSell(msg.sender, _numberOfTokens);

        tokensSold += _numberOfTokens;

        require(tokenContract.transferFrom(owner, msg.sender, _numberOfTokens));

        if (msg.value > totalValue) {
            payable(msg.sender).transfer(msg.value - totalValue);
        }
    }

    function endSale() public ownerOnly {
        require(
            tokenContract.transfer(
                owner,
                tokenContract.balanceOf(address(this))
            )
        );

        payable(msg.sender).transfer(address(this).balance);
    }
}
