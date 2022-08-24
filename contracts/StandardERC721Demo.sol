//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC721.sol";

contract StandardERC721Demo is StandardERC721  {
    constructor() ERC721("StandardERC721Demo", "STD721"){
    }

}