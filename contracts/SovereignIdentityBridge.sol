// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Sovereign Identity Bridge
 * @notice Bridge sovereign identities across domains with DID, ENS, or custom identity types
 */
contract SovereignIdentityBridge {
    enum IdentityType { DID, ENS, Custom }

    struct IdentityBridge {
        uint256 id;
        uint256 achievementId;
        IdentityType identityType;
        bytes32 identityHash;
        string sourceDomain;
        string targetDomain;
        bytes32 bridgeProof;
        uint256 recordedAt;
    }

    uint256 public identityBridgeCount;
    mapping(uint256 => IdentityBridge) public identityBridges;

    event IdentityBridged(
        uint256 indexed bridgeId,
        uint256 indexed achievementId,
        IdentityType identityType,
        bytes32 identityHash,
        string sourceDomain,
        string targetDomain
    );

    function bridgeIdentity(
        uint256 achievementId,
        IdentityType identityType,
        bytes32 identityHash,
        string memory sourceDomain,
        string memory targetDomain,
        bytes32 bridgeProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(sourceDomain).length > 0, "Source domain required");
        require(bytes(targetDomain).length > 0, "Target domain required");
        
        identityBridgeCount++;
        identityBridges[identityBridgeCount] = IdentityBridge({
            id: identityBridgeCount,
            achievementId: achievementId,
            identityType: identityType,
            identityHash: identityHash,
            sourceDomain: sourceDomain,
            targetDomain: targetDomain,
            bridgeProof: bridgeProof,
            recordedAt: block.timestamp
        });

        emit IdentityBridged(identityBridgeCount, achievementId, identityType, identityHash, sourceDomain, targetDomain);
        return identityBridgeCount;
    }
}

