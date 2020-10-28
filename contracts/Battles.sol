// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./IDungeonsAndDragonsCharacter.sol";

contract Battles is ChainlinkClient, Ownable {
    using SafeMath_Chainlink for uint256;
    address public dungeonsAndDragonsContract;
    bytes32 internal JobId = "4ce9b71a1ac94abcad1ff9198e760b8c";
    address
        internal ChainlinkOracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;
    uint256 internal Fee = 0.1 * 10**18; // 0.1 LINK
    mapping(bytes32 => uint256) requestToTokenId;

    constructor(address _dungeonsAndDragonsContract) public {
        setPublicChainlinkToken();
        dungeonsAndDragonsContract = _dungeonsAndDragonsContract;
    }

    function getChainlinkToken() public view returns (address){
        return chainlinkTokenAddress();
    }

    /**
     * this is hardcoded and centralized for now
     * but you'd want to call a network of chainlink nodes
     */
    function requestBattleResults(uint256 tokenId)
        external
        onlyDungeonsAndDragonsContract
        returns (bytes32 requestId)
    {
        //solhint-disable-next-line max-line-length
        Chainlink.Request memory request = buildChainlinkRequest(
            JobId,
            address(this),
            this.fulfillBattleResults.selector
        );
        // Change this to your battle endpoints. Make sure they are decentralized!
        request.add("get", "https://jsonplaceholder.typicode.com/todos/1");
        request.add("path", "completed");
        bytes32 requestId = sendChainlinkRequestTo(
            ChainlinkOracle,
            request,
            Fee
        );
        requestToTokenId[requestId] = tokenId;
        return requestId;
    }

    function fulfillBattleResults(bytes32 _requestId, bool victory)
        public
        recordChainlinkFulfillment(_requestId)
    {
        if (victory) {
            IDungeonsAndDragonsCharacter(dungeonsAndDragonsContract).updateExperience(
                requestToTokenId[_requestId],
                1
            );
        }
    }

    modifier onlyDungeonsAndDragonsContract() {
        require(msg.sender == dungeonsAndDragonsContract); // If it is incorrect here, it reverts.
        _; // Otherwise, it continues.
    }
}
