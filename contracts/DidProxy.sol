// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DIDERC721A.sol";
import "./DIDERC721.sol";
// import "./AuthManage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./library/SafeSend.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract DidProxy is Context, SafeSend, Ownable {
    mapping(uint256 => bool) public erc721aMap;
    mapping(uint256 => bool) public erc721Map;

    // 部署合约721a
    function deployERC721A(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _id,
        bool isMint,
        uint256 mintQuantity,
        address _owneraddr
    ) public onlyOwner {
        require(erc721aMap[_id] == false, "Contract already exists");
        new DIDERC721A(
            _name,
            _symbol,
            _baseURI,
            isMint,
            mintQuantity,
            _owneraddr
        );
        erc721aMap[_id] = true;
    }

    // 部署合约721a
    function deployERC721(
        string memory name_,
        string memory symbol_,
        string memory _baseURI,
        uint256 _id,
        bool isMint,
        uint256 mintQuantity,
        address _owneraddr
    ) public onlyOwner {
        require(erc721Map[_id] == false, "Contract already exists");
        new DIDERC721(
            name_,
            symbol_,
            _baseURI,
            isMint,
            mintQuantity,
            _owneraddr
        );
        erc721Map[_id] = true;
    }

    // 转帐
    function safeTransfer(address payable to, uint256 amount)
        public
        virtual
        onlyOwner
    {
        require(address(this).balance > amount, "amount is not enough");
        sendValue(to, amount);
    }

    // 批量转账
    function safeBatchTransfer(
        address payable[] memory accounts,
        uint256[] memory amounts
    ) public virtual onlyOwner {
        uint256 _totalAmount = 0;

        for (uint256 i = 0; i < amounts.length; ++i) {
            _totalAmount = _totalAmount + amounts[i];
        }

        require(address(this).balance > _totalAmount, "amounts is not enough");

        for (uint256 i = 0; i < accounts.length; ++i) {
            require(accounts[i] != address(0), "transfer to the zero address");
            sendValue(accounts[i], amounts[i]);
        }
    }
}
