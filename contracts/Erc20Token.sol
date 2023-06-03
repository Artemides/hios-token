// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

interface TokenRecipient {
    function receiveApproval(
        address _from,
        uint256 _value,
        address _token,
        bytes calldata _extraData
    ) external;
}

contract HiosToken {
    string public name;
    string public symbol;
    uint8 public constant DECIMALS = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _ammount);
    event Approval(address indexed _owner, address indexed _spender, uint256 _ammount);
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

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function approveAndCall(
        address _spender,
        uint256 _value,
        bytes calldata _extraData
    ) public returns (bool) {
        TokenRecipient spender = TokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        } else return false;
    }

    //create function to burn tokens
    //verify the amount to be burned
    //update sender balance
    //update total supply
    //emit burn event

    function burn(uint256 _value) public returns (bool) {
        require(_value <= balanceOf[msg.sender]);

        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;
        emit Burn(msg.sender, _value);
        return true;
    }

    function burnFrom(address _from, uint256 _value) public returns (bool) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        totalSupply -= _value;
        emit Burn(_from, _value);
        return true;
    }
}
