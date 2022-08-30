// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract AuthManage is Ownable {
    // 管理员map

    mapping(address => bool) public adminSet;
    address private _superAdmin;

    event SuperAdminTransferred(
        address indexed previousSuperAdmin,
        address indexed newSuperAdmin
    );

    constructor(address _owneraddr) {
        if (address(0) == _owneraddr) {
            _transferOwnership(_msgSender());
        } else {
            _transferOwnership(_owneraddr);
        }
    }

    // 管理员
    modifier allowAdmin() {
        require(
            owner() == _msgSender() ||
                superAdmin() == _msgSender() ||
                adminSet[msg.sender]
        );
        _;
    }

    // 超级管理员
    modifier allowSuperAdmin() {
        _checkSuperAdmin();
        _;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual override {
        require(
            owner() == _msgSender() || superAdmin() == _msgSender(),
            "Ownable: caller is not the owner or superAdmin"
        );
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function superAdmin() public view virtual returns (address) {
        return _superAdmin;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkSuperAdmin() internal view virtual {
        require(
            superAdmin() == _msgSender(),
            "Ownable: caller is not the superAdmin"
        );
    }

    // 添加管理员
    function addAdmin(address _id) public onlyOwner returns (bool) {
        adminSet[_id] = true;
        return true;
    }

    // 删除管理员
    function delAdmin(address _id) public onlyOwner returns (bool) {
        adminSet[_id] = false;
        return true;
    }

    /**
     * @dev
     * Internal function without access restriction.
     */
    function _transferSuperAdmin(address newSuperAdmin)
        internal
        virtual
        allowSuperAdmin
    {
        address oldSuperAdmin = _superAdmin;
        _superAdmin = newSuperAdmin;
        emit SuperAdminTransferred(oldSuperAdmin, newSuperAdmin);
    }
}
