// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Intent Fusion Engine
 * @notice Fuse intents across multiple domains with atomic, best-effort, or partial fusion strategies
 */
contract IntentFusionEngine {
    enum FusionStrategy { Atomic, BestEffort, Partial }

    struct FusedIntent {
        uint256 id;
        uint256 achievementId;
        bytes32[] intentHashes;
        FusionStrategy strategy;
        bytes32 fusionProof;
        bool executed;
        uint256 recordedAt;
    }

    uint256 public fusedIntentCount;
    mapping(uint256 => FusedIntent) public fusedIntents;

    event IntentFused(
        uint256 indexed fusedIntentId,
        uint256 indexed achievementId,
        bytes32[] intentHashes,
        FusionStrategy strategy
    );

    function fuseIntents(
        uint256 achievementId,
        bytes32[] memory intentHashes,
        FusionStrategy strategy,
        bytes32 fusionProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(intentHashes.length >= 2, "At least 2 intents required");
        
        fusedIntentCount++;
        fusedIntents[fusedIntentCount] = FusedIntent({
            id: fusedIntentCount,
            achievementId: achievementId,
            intentHashes: intentHashes,
            strategy: strategy,
            fusionProof: fusionProof,
            executed: false,
            recordedAt: block.timestamp
        });

        emit IntentFused(fusedIntentCount, achievementId, intentHashes, strategy);
        return fusedIntentCount;
    }
}

