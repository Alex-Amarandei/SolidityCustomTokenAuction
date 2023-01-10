// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@uniswap/contracts/interfaces/IERC20.sol";

/// @title  A token contract implementing the ERC20 standard
/// @author @Alex-Amarandei @Naclyy @ochesanum
/// @dev    Adds a custom minting feature triggered once every 10000 units transferred per user
contract ZAOToken is IERC20 {
    /// @notice ZAO stands for Zaharia-Amarandei-Ochesanu, the last names of the authors
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
        emit Transfer(address(0), msg.sender, initialSupply);

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
        emit Approval(msg.sender, spender, value);

        allowanceOf[msg.sender][spender] = value;

        return true;
    }

    /// @notice The method was modified to account for transfers and gift the user once every 10000 units
    /// @dev    Only transfer calls are counted and one token is minted as a reward and accounted for everywhere
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

        emit Transfer(msg.sender, to, value);

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
        emit Transfer(from, to, value);

        balance[from] -= value;
        balance[to] += value;
        allowanceOf[from][msg.sender] -= value;

        return true;
    }

    /// @dev Method is called to mint the reward token
    function mint(address account, uint256 amount)
        internal
        virtual
        differentFromZeroAddress(account)
    {
        emit Transfer(address(0), account, amount);

        totalTokenSupply += amount;
        balance[account] += amount;
        allowanceOf[msg.sender][account] += amount;
    }
}
