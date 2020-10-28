// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

interface IBattles {
    function requestBattleResults(uint256 tokenId)
        external
        returns (bytes32 requestId);
}
