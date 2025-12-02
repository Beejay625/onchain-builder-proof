// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Fusion Data Pipeline
 * @notice Pipeline for fusing data across domains with streaming, batch, or hybrid processing modes
 */
contract FusionDataPipeline {
    enum ProcessingMode { Streaming, Batch, Hybrid }

    struct DataPipeline {
        uint256 id;
        uint256 achievementId;
        ProcessingMode mode;
        bytes32 dataHash;
        string[] sourceDomains;
        bytes32 pipelineProof;
        bool processed;
        uint256 recordedAt;
    }

    uint256 public pipelineCount;
    mapping(uint256 => DataPipeline) public pipelines;

    event PipelineCreated(
        uint256 indexed pipelineId,
        uint256 indexed achievementId,
        ProcessingMode mode,
        bytes32 dataHash,
        string[] sourceDomains
    );

    function createPipeline(
        uint256 achievementId,
        ProcessingMode mode,
        bytes32 dataHash,
        string[] memory sourceDomains,
        bytes32 pipelineProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(sourceDomains.length > 0, "At least one source domain required");
        
        pipelineCount++;
        pipelines[pipelineCount] = DataPipeline({
            id: pipelineCount,
            achievementId: achievementId,
            mode: mode,
            dataHash: dataHash,
            sourceDomains: sourceDomains,
            pipelineProof: pipelineProof,
            processed: false,
            recordedAt: block.timestamp
        });

        emit PipelineCreated(pipelineCount, achievementId, mode, dataHash, sourceDomains);
        return pipelineCount;
    }
}

