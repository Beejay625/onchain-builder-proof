// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Intent Aggregation Pool
 * @notice Pool and aggregate intents for efficiency using time-based, size-based, or priority-based strategies
 */
contract IntentAggregationPool {
    enum AggregationStrategy { TimeBased, SizeBased, PriorityBased }

    struct AggregatedIntent {
        uint256 id;
        uint256 achievementId;
        bytes32[] intentHashes;
        AggregationStrategy strategy;
        uint256 threshold;
        bytes32 aggregationProof;
        bool processed;
        uint256 recordedAt;
    }

    uint256 public aggregatedIntentCount;
    mapping(uint256 => AggregatedIntent) public aggregatedIntents;

    event IntentAggregated(
        uint256 indexed aggregatedIntentId,
        uint256 indexed achievementId,
        bytes32[] intentHashes,
        AggregationStrategy strategy,
        uint256 threshold
    );

    function aggregateIntents(
        uint256 achievementId,
        bytes32[] memory intentHashes,
        AggregationStrategy strategy,
        uint256 threshold,
        bytes32 aggregationProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(intentHashes.length >= 2, "At least 2 intents required");
        require(threshold > 0, "Threshold required");
        
        aggregatedIntentCount++;
        aggregatedIntents[aggregatedIntentCount] = AggregatedIntent({
            id: aggregatedIntentCount,
            achievementId: achievementId,
            intentHashes: intentHashes,
            strategy: strategy,
            threshold: threshold,
            aggregationProof: aggregationProof,
            processed: false,
            recordedAt: block.timestamp
        });

        emit IntentAggregated(aggregatedIntentCount, achievementId, intentHashes, strategy, threshold);
        return aggregatedIntentCount;
    }
}

