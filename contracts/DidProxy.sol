// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC721.sol";
import "./StandardERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./library/SafeSend.sol";

contract DidProxy is SafeSend, Ownable {
    mapping(uint256 => bool) public erc721aMap;
    mapping(uint256 => bool) public erc721Map;

    uint public MAX_BATCH_LIMITS = 3001;

    // 部署721 合约事件
    event DeployERC721(uint256  _id, address  _owneraddr, address indexed _caddr);
    event DeployERC721A(uint256  _id, address  _owneraddr, address indexed _caddr);
    event Received(address sender, uint256 value);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // 部署合约721a
    function deployERC721A(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _id,
        bool isMint,
        uint256 mintQuantity,
        address _owneraddr
    ) public onlyOwner  {
        require(erc721aMap[_id] == false, "Contract already exists");
        if(isMint) {
            require(0 < mintQuantity && mintQuantity <= MAX_BATCH_LIMITS, "invalid mint quantity");
        }

        StandardERC721A _erc721a = new StandardERC721A(
            _name,
            _symbol,
            _baseURI,
            address(this)
        );
        emit DeployERC721A(_id, _owneraddr, address(_erc721a));
        erc721aMap[_id] = true;

        require(_erc721a.addAdmin(_owneraddr), "add admin failed");

        // batch mint after create contract
        if(isMint) {
            _erc721a.mint(_owneraddr, mintQuantity);
        }
        _erc721a.transferOwnership(_owneraddr);
    }


    // 部署合约721
    function deployERC721(
        string memory name_,
        string memory symbol_,
        string memory _baseURI,
        uint256 _id,
        bool isMint,
        uint256 mintQuantity,
        address _owneraddr
    ) public onlyOwner  {
        require(erc721Map[_id] == false, "Contract already exists");
        StandardERC721 _erc721 = new StandardERC721(
            name_,
            symbol_,
            _baseURI,
            address(this)
        );
        emit DeployERC721(_id, _owneraddr, address(_erc721));
        erc721Map[_id] = true;

        // batch mint after create contract
        if(isMint && mintQuantity > 0) {
            _erc721.mintBatch(_owneraddr, mintQuantity);
        }

        _erc721.transferOwnership(_owneraddr);
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
