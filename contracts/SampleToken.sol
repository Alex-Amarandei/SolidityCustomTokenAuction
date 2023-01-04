// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../interfaces/IERC20.sol";

contract SampleToken is IERC20 {
    string private _name = "Sample Token";
    string private _symbol = "TOK";

    uint256 private _totalSupply;

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

    mapping(address => uint256) private _balanceOf;
    mapping(address => mapping(address => uint256)) private _allowance;

    constructor(uint256 _initialSupply) {
        emit LogTransfer(address(0), msg.sender, _initialSupply);

        _balanceOf[msg.sender] = _initialSupply;
        _totalSupply = _initialSupply;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balanceOf[owner];
    }

    function allowance(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return _allowance[owner][spender];
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        require(_spender != address(0));

        emit LogApproval(msg.sender, _spender, _value);

        _allowance[msg.sender][_spender] = _value;

        return true;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(_balanceOf[msg.sender] >= _value);
        require(_to != address(0));

        emit LogTransfer(msg.sender, _to, _value);

        _balanceOf[msg.sender] -= _value;
        _balanceOf[_to] += _value;

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= _balanceOf[_from]);
        require(_value <= _allowance[_from][msg.sender]);
        require(_to != address(0));

        emit LogTransfer(_from, _to, _value);

        _balanceOf[_from] -= _value;
        _balanceOf[_to] += _value;
        _allowance[_from][msg.sender] -= _value;

        return true;
    }
}
