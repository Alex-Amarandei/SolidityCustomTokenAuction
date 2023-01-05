// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../../interfaces/token/IERC20.sol";

contract SampleToken is IERC20 {
    string private tokenName = "ZAO Token";
    string private tokenSymbol = "ZAO";
    uint256 private totalTokenSupply;

    mapping(address => uint256) private balance;
    mapping(address => uint256) private transferredAmount;
    mapping(address => mapping(address => uint256)) private allowanceOf;

    modifier differentFromZeroAddress(address _address) {
        require(
            _address != address(0),
            "The address must be different than address(0)"
        );
        _;
    }

    constructor(uint256 initialSupply) {
        emit LogTransfer(address(0), msg.sender, initialSupply);

        balance[msg.sender] = initialSupply;
        totalTokenSupply = initialSupply;
    }

    function name() external view override returns (string memory) {
        return tokenName;
    }

    function symbol() external view override returns (string memory) {
        return tokenSymbol;
    }

    function decimals() external pure override returns (uint8) {
        return 18;
    }

    function totalSupply() external view override returns (uint256) {
        return totalTokenSupply;
    }

    function balanceOf(address owner) external view override returns (uint256) {
        return balance[owner];
    }

    function allowance(address owner, address spender)
        external
        view
        override
        returns (uint256)
    {
        return allowanceOf[owner][spender];
    }

    function approve(address spender, uint256 value)
        external
        override
        differentFromZeroAddress(spender)
        returns (bool success)
    {
        emit LogApproval(msg.sender, spender, value);

        allowanceOf[msg.sender][spender] = value;

        return true;
    }

    function transfer(address to, uint256 value)
        external
        override
        differentFromZeroAddress(to)
        returns (bool success)
    {
        require(
            balance[msg.sender] >= value,
            "Balance of sender must be greater than transfer value"
        );

        emit LogTransfer(msg.sender, to, value);

        balance[msg.sender] -= value;
        balance[to] += value;
        transferredAmount[msg.sender] += value;

        uint256 potentialTokens = transferredAmount[msg.sender] / 10000;

        if (potentialTokens > 0) {
            transferredAmount[msg.sender] %= 10000;

            mint(msg.sender, potentialTokens);
        }

        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external override differentFromZeroAddress(to) returns (bool success) {
        require(
            balance[from] >= value,
            "Balance of sender must be greater than transfer value"
        );
        require(
            allowanceOf[from][msg.sender] >= value,
            "Balance of sender must be greater than transfer value"
        );
        emit LogTransfer(from, to, value);

        balance[from] -= value;
        balance[to] += value;
        allowanceOf[from][msg.sender] -= value;

        return true;
    }

    function mint(address account, uint256 amount)
        internal
        virtual
        differentFromZeroAddress(account)
    {
        emit LogTransfer(address(0), account, amount);

        totalTokenSupply += amount;
        balance[account] += amount;
        allowanceOf[msg.sender][account] += amount;
    }
}
