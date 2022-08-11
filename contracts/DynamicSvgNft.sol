// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// will be stored completely on-chain, use regular ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DynamicSvgNft is ERC721
{
    // mint
    // store our svg information somewhere
    // some logic to say 'show x image' or 'show y image'

    uint256 private s_tokenCounter;

    constructor(string memory lowSvg, string memory highSvg) ERC721("Dynamic SVG NFT", "DSN")
    {
        s_tokenCounter = 0;
    }

    function mintNft() public
    {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += 1;
    }
}