//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC721A.sol";

contract StandardERC721Demo is StandardERC721A  {
    constructor() ERC721A("StandardERC721ADemo", "STD721A") {
        baseTokenURI = "https://www.qiyichain.com/";
    }

}