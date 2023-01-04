// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SampleToken {
    string public name = "Sample Token";
    string public symbol = "TOK";

    uint256 public totalSupply;

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

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialSupply) {
        emit LogTransfer(address(0), msg.sender, _initialSupply);

        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);

        emit LogTransfer(msg.sender, _to, _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        emit LogApproval(msg.sender, _spender, _value);

        allowance[msg.sender][_spender] = _value;

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        emit LogTransfer(_from, _to, _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        return true;
    }
}

contract SampleTokenSale {
    SampleToken public tokenContract;
    uint256 public tokenPrice;
    address owner;
    uint256 public tokensSold;

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

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == _numberOfTokens * tokenPrice);
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);

        emit LogSell(msg.sender, _numberOfTokens);

        tokensSold += _numberOfTokens;

        require(tokenContract.transfer(msg.sender, _numberOfTokens));
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
