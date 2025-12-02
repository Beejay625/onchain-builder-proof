// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Continuity Fusion Orchestrator
 * @notice Orchestrate multi-domain continuity flows with sync policies and checkpoint intervals
 */
contract ContinuityFusionOrchestrator {
    struct FusionFlow {
        uint256 id;
        uint256 achievementId;
        bytes32 syncPolicyHash;
        uint256 checkpointInterval;
        uint256 lastCheckpoint;
        bool active;
        uint256 recordedAt;
    }

    uint256 public fusionFlowCount;
    mapping(uint256 => FusionFlow) public fusionFlows;
    mapping(uint256 => bytes32[]) public checkpointHashes;

    event FusionFlowCreated(
        uint256 indexed flowId,
        uint256 indexed achievementId,
        bytes32 syncPolicyHash,
        uint256 checkpointInterval
    );

    event CheckpointRecorded(
        uint256 indexed flowId,
        uint256 checkpointNumber,
        bytes32 checkpointHash
    );

    function createFusionFlow(
        uint256 achievementId,
        bytes32 syncPolicyHash,
        uint256 checkpointInterval
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(checkpointInterval > 0, "Checkpoint interval required");
        
        fusionFlowCount++;
        fusionFlows[fusionFlowCount] = FusionFlow({
            id: fusionFlowCount,
            achievementId: achievementId,
            syncPolicyHash: syncPolicyHash,
            checkpointInterval: checkpointInterval,
            lastCheckpoint: block.timestamp,
            active: true,
            recordedAt: block.timestamp
        });

        emit FusionFlowCreated(fusionFlowCount, achievementId, syncPolicyHash, checkpointInterval);
        return fusionFlowCount;
    }

    function recordCheckpoint(uint256 flowId, bytes32 checkpointHash) public {
        require(flowId > 0 && flowId <= fusionFlowCount, "Invalid flow");
        FusionFlow storage flow = fusionFlows[flowId];
        require(flow.active, "Flow not active");
        require(block.timestamp >= flow.lastCheckpoint + flow.checkpointInterval, "Checkpoint interval not met");
        
        uint256 checkpointNumber = checkpointHashes[flowId].length;
        checkpointHashes[flowId].push(checkpointHash);
        flow.lastCheckpoint = block.timestamp;

        emit CheckpointRecorded(flowId, checkpointNumber, checkpointHash);
    }
}

