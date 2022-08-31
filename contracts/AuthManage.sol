// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract AuthManage {
    address private _owner;

    // 管理员map

    mapping(address => bool) public adminSet;
    address private _superAdmin;

    event SuperAdminTransferred(
        address indexed previousSuperAdmin,
        address indexed newSuperAdmin
    );

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor(address _owneraddr) {
        _transferOwnership(_owneraddr);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    // 管理员
    modifier allowAdmin() {
        require(
            owner() == msg.sender ||
                superAdmin() == msg.sender ||
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
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(
            owner() == msg.sender || superAdmin() == msg.sender,
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
            superAdmin() == msg.sender,
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
