// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract ERC20 {
    string public name;
    string public symbol;
    uint8 public constant DECIMALS = 18;
    uint256 public totalSupply;

    mapping(address => uint256) balanceOf;
    mapping(address => mapping(address => uint256)) allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _ammount);
    event Aproval(address indexed _owner, address indexed _spender, uint256 _ammount);
    event Burn(address indexed from, uint256 _ammount);

    constructor(string memory _name, string memory _symbol, uint256 initialSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = initialSupply * 10 ** uint256(DECIMALS);
        balanceOf[msg.sender] = totalSupply;
    }

    function _transfer(address _from, address _to, uint256 _ammount) internal {
        require(_to != address(0));

        uint256 senderBalance = balanceOf[_from];
        uint256 receiverBalance = balanceOf[_to];

        require(_ammount <= senderBalance);
        require(senderBalance + _ammount >= senderBalance);

        uint256 previousBalances = senderBalance + receiverBalance;

        balanceOf[_from] -= _ammount;
        balanceOf[_to] += _ammount;

        emit Transfer(_from, _to, _ammount);
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    function transfer(address _to, uint256 _ammount) public returns (bool succcess) {
        _transfer(msg.sender, _to, _ammount);
        return true;
    }
}
