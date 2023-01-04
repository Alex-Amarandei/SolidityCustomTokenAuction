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
        returns (bool success)
    {
        require(msg.sender == owner);
        require(_tokenPrice != 0);

        tokenPrice = _tokenPrice;

        return true;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == _numberOfTokens * tokenPrice);
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);

        emit LogSell(msg.sender, _numberOfTokens);

        tokensSold += _numberOfTokens;

        require(tokenContract.approve(msg.sender, _numberOfTokens));
        require(
            tokenContract.transferFrom(
                address(this),
                msg.sender,
                _numberOfTokens
            )
        );
    }

    function endSale() public {
        require(msg.sender == owner);

        require(
            tokenContract.transfer(
                owner,
                tokenContract.balanceOf(address(this))
            )
        );

        payable(msg.sender).transfer(address(this).balance);
    }
}
