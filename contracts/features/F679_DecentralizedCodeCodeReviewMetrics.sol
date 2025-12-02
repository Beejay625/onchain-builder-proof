// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title F679 - Decentralized Code Code Review Metrics
 * @notice Tracks code review statistics with metric type tracking and review counting
 */
contract F679_DecentralizedCodeCodeReviewMetrics {
    uint256 public codeReviewMetricsCount;
    
    struct CodeReviewMetrics {
        uint256 id;
        uint256 achievementId;
        string metricsId;
        uint256 reviewCount;
        string metricType;
        bytes32 metricsProof;
        string metricsStatus;
        uint256 recordedAt;
    }
    
    mapping(uint256 => CodeReviewMetrics) public codeReviewMetrics;
    
    event CodeReviewMetricsLogged(
        uint256 indexed metricsId,
        uint256 indexed achievementId,
        string metricsIdStr,
        uint256 reviewCount,
        string metricType,
        bytes32 metricsProof
    );
    
    function logDecentralizedCodeCodeReviewMetrics(
        uint256 achievementId,
        string memory metricsId,
        uint256 reviewCount,
        string memory metricType,
        bytes32 metricsProof,
        string memory metricsStatus
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(metricsId).length > 0, "Metrics ID required");
        require(reviewCount > 0, "Review count must be positive");
        require(bytes(metricType).length > 0, "Metric type required");
        require(bytes(metricsStatus).length > 0, "Metrics status required");
        
        codeReviewMetricsCount++;
        codeReviewMetrics[codeReviewMetricsCount] = CodeReviewMetrics({
            id: codeReviewMetricsCount,
            achievementId: achievementId,
            metricsId: metricsId,
            reviewCount: reviewCount,
            metricType: metricType,
            metricsProof: metricsProof,
            metricsStatus: metricsStatus,
            recordedAt: block.timestamp
        });
        
        emit CodeReviewMetricsLogged(
            codeReviewMetricsCount,
            achievementId,
            metricsId,
            reviewCount,
            metricType,
            metricsProof
        );
        
        return codeReviewMetricsCount;
    }
}

