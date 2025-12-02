// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Fusion Telemetry Aggregator
 * @notice Aggregate telemetry across fusion domains with configurable aggregation methods and output formats
 */
contract FusionTelemetryAggregator {
    enum AggregationMethod { Sum, Average, Max, Min, Median }
    enum OutputFormat { JSON, CSV, Binary }

    struct TelemetryAggregation {
        uint256 id;
        uint256 achievementId;
        AggregationMethod method;
        OutputFormat format;
        bytes32 telemetryHash;
        string[] sourceDomains;
        bytes32 aggregationProof;
        uint256 recordedAt;
    }

    uint256 public aggregationCount;
    mapping(uint256 => TelemetryAggregation) public aggregations;

    event TelemetryAggregated(
        uint256 indexed aggregationId,
        uint256 indexed achievementId,
        AggregationMethod method,
        OutputFormat format,
        bytes32 telemetryHash
    );

    function aggregateTelemetry(
        uint256 achievementId,
        AggregationMethod method,
        OutputFormat format,
        bytes32 telemetryHash,
        string[] memory sourceDomains,
        bytes32 aggregationProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(sourceDomains.length > 0, "At least one source domain required");
        
        aggregationCount++;
        aggregations[aggregationCount] = TelemetryAggregation({
            id: aggregationCount,
            achievementId: achievementId,
            method: method,
            format: format,
            telemetryHash: telemetryHash,
            sourceDomains: sourceDomains,
            aggregationProof: aggregationProof,
            recordedAt: block.timestamp
        });

        emit TelemetryAggregated(aggregationCount, achievementId, method, format, telemetryHash);
        return aggregationCount;
    }
}

