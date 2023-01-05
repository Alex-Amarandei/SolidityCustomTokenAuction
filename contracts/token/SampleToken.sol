// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../../interfaces/token/IERC20.sol";

contract SampleToken is IERC20 {
    string private tokenName = "Sample Token";
    string private tokenSymbol = "TOK";

    uint256 private totalTokenSupply;

    mapping(address => uint256) private balance;
    mapping(address => uint256) private transferredAmount;
    mapping(address => mapping(address => uint256)) private allowanceOf;

    event LogTransfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event LogApproval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    modifier differentFromZeroAddress(address _address) {
        require(
            _address != address(0),
            "The address must be different than address(0)"
        );
        _;
    }

    constructor(uint256 _initialSupply) {
        emit LogTransfer(address(0), msg.sender, _initialSupply);

        balance[msg.sender] = _initialSupply;
        totalTokenSupply = _initialSupply;
    }

    function name() external override view returns (string memory) {
        return tokenName;
    }

    function symbol() external override view returns (string memory) {
        return tokenSymbol;
    }

    function decimals() external override pure returns (uint8) {
        return 18;
    }

    function totalSupply() public override view returns (uint256) {
        return totalTokenSupply;
    }

    function balanceOf(address owner) public override view returns (uint256) {
        return balance[owner];
    }

    function allowance(address owner, address spender)
        public
        override
        view
        returns (uint256)
    {
        return allowanceOf[owner][spender];
    }

    function approve(address _spender, uint256 _value)
        public
        override
        differentFromZeroAddress(_spender)
        returns (bool success)
    {
        emit LogApproval(msg.sender, _spender, _value);

        allowanceOf[msg.sender][_spender] = _value;

        return true;
    }

    function transfer(address _to, uint256 _value)
        public
        override
        differentFromZeroAddress(_to)
        returns (bool success)
    {
        require(balance[msg.sender] >= _value);

        emit LogTransfer(msg.sender, _to, _value);

        balance[msg.sender] -= _value;
        balance[_to] += _value;
        transferredAmount[msg.sender] += _value;

        uint256 potentialTokens = transferredAmount[msg.sender] / 10000;

        if (potentialTokens > 0) {
            transferredAmount[msg.sender] %= 10000;

            mint(msg.sender, potentialTokens);
        }

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public 
    override
    differentFromZeroAddress(_to) returns (bool success) {
        require(_value <= balance[_from]);
        require(_value <= allowanceOf[_from][msg.sender]);

        emit LogTransfer(_from, _to, _value);

        balance[_from] -= _value;
        balance[_to] += _value;
        allowanceOf[_from][msg.sender] -= _value;

        return true;
    }

    function mint(address _account, uint256 _amount)
        internal
        virtual
        differentFromZeroAddress(_account)
    {
        emit LogTransfer(address(0), _account, _amount);

        totalTokenSupply += _amount;
        balance[_account] += _amount;
        allowanceOf[msg.sender][_account] += _amount;
    }
}
