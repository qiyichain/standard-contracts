// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AuthManage.sol";
import "./erc721a/extensions/ERC721ABurnable.sol";
import "./erc721a/extensions/ERC721AQueryable.sol";

// ERC721Enumerable, ERC721URIStorage {
contract StandardERC721A is
    AuthManage,
    Pausable,
    ERC721ABurnable,
    ERC721AQueryable
{
    string public baseTokenURI;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_,
        address _owneraddr
    ) ERC721A(name_, symbol_) AuthManage(_owneraddr) {
        baseTokenURI = baseURI_;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // 批量mint
    function mint(uint256 quantity) public onlyOwner whenNotPaused {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }

    function mint(address to_, uint256 quantity) public onlyOwner whenNotPaused {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(to_, quantity);
    }




    // 合约开始id
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function _beforeTokenTransfers(
        address from,
        address to,
        uint256 startTokenId,
        uint256 quantity
    ) internal override whenNotPaused {}
}
