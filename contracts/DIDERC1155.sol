//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC1155.sol";

contract DIDERC1155 is StandardERC1155 {
    constructor(string memory _baseURI) ERC1155(_baseURI) {}
}
