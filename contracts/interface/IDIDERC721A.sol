// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDIDERC721A {
    function setBaseURI(string memory _baseTokenURI) external;

    function _baseURI() external view returns (string memory);

    function pause() external;

    function unpause() external;

    function mint(uint256 quantity) external;
}
