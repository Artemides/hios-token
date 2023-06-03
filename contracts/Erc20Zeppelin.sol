// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HiosZeppelin is ERC20 {
    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _initialSupply
    ) ERC20(_tokenName, _tokenSymbol) {
        _mint(msg.sender, _initialSupply);
    }
}
