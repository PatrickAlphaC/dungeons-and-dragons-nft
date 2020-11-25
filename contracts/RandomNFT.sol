// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomNFT is ERC721, VRFConsumerBase, Ownable {
    address public VRFCoordinator = 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B;
    address public LinkToken = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;
    uint256 power;
    bytes32 internal keyHash;
    uint256 internal fee;

    constructor() public
        VRFConsumerBase(VRFCoordinator, LinkToken)
        ERC721("randomNFT", "rNFT"){
        power = 0;
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10**18; // 0.1 LINK
        _safeMint(msg.sender, 0);
    } 

    function requestRandomPower(uint256 seed) public{
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        requestRandomness(keyHash, fee, seed);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        power = randomness % 100;
    }
}