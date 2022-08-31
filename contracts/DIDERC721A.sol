//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC721A.sol";

contract DIDERC721A is StandardERC721A {
    constructor(
        string memory name_,
        string memory symbol_,
        string memory _baseURI,
        bool isMint,
        uint256 mintQuantity,
        address _owneraddr
    ) ERC721A(name_, symbol_) AuthManage(_owneraddr) {
        baseTokenURI = _baseURI;
        if (isMint) {
            _mint(_owneraddr, mintQuantity);
        }
    }
}
