//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC721.sol";
import "./interface/IDIDERC721A.sol";

contract DIDERC721 is StandardERC721 {
    constructor(
        string memory name_,
        string memory symbol_,
        string memory _baseURI,
        bool isMint,
        uint256 mintQuantity,
        address _owneraddr
    ) ERC721(name_, symbol_) AuthManage(_owneraddr) {
        baseTokenURI = _baseURI;
        if (isMint) {
            _mint(msg.sender, mintQuantity);
        }
    }
}
