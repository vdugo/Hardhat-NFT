// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721
{
    uint256 private s_tokenCounter;

    constructor() ERC721("Dogie", "DOG")
    {
        s_tokenCounter = 0;
    }

    function mintNFT() public returns(uint256)
    {
        // mint the token to whoever calls this mint function
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += 1;
        return s_tokenCounter;
    }

    function getTokenCounter() public view returns(uint256)
    {
        return s_tokenCounter;
    }
}