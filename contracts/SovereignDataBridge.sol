// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Sovereign Data Bridge
 * @notice Bridge sovereign data with jurisdiction compliance, encryption, and data handling policies
 */
contract SovereignDataBridge {
    struct DataBridge {
        uint256 id;
        uint256 achievementId;
        bytes32 dataHash;
        string jurisdiction;
        bytes32 encryptionPolicyHash;
        bytes32 handlingPolicyHash;
        bytes32 bridgeProof;
        uint256 recordedAt;
    }

    uint256 public dataBridgeCount;
    mapping(uint256 => DataBridge) public dataBridges;
    mapping(string => uint256[]) public jurisdictionBridges;

    event DataBridgeCreated(
        uint256 indexed bridgeId,
        uint256 indexed achievementId,
        bytes32 dataHash,
        string jurisdiction,
        bytes32 encryptionPolicyHash
    );

    function createDataBridge(
        uint256 achievementId,
        bytes32 dataHash,
        string memory jurisdiction,
        bytes32 encryptionPolicyHash,
        bytes32 handlingPolicyHash,
        bytes32 bridgeProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(jurisdiction).length > 0, "Jurisdiction required");
        
        dataBridgeCount++;
        dataBridges[dataBridgeCount] = DataBridge({
            id: dataBridgeCount,
            achievementId: achievementId,
            dataHash: dataHash,
            jurisdiction: jurisdiction,
            encryptionPolicyHash: encryptionPolicyHash,
            handlingPolicyHash: handlingPolicyHash,
            bridgeProof: bridgeProof,
            recordedAt: block.timestamp
        });

        jurisdictionBridges[jurisdiction].push(dataBridgeCount);

        emit DataBridgeCreated(dataBridgeCount, achievementId, dataHash, jurisdiction, encryptionPolicyHash);
        return dataBridgeCount;
    }
}

