// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title F665 - Decentralized Code Code Smell Detector
 * @notice Identifies code smells with category tracking and smell counting
 */
contract F665_DecentralizedCodeCodeSmellDetector {
    uint256 public codeSmellDetectorCount;
    
    struct CodeSmellDetector {
        uint256 id;
        uint256 achievementId;
        string detectorId;
        uint256 smellCount;
        string smellCategory;
        bytes32 detectorProof;
        string detectorStatus;
        uint256 recordedAt;
    }
    
    mapping(uint256 => CodeSmellDetector) public codeSmellDetectors;
    
    event CodeSmellDetectorLogged(
        uint256 indexed detectorId,
        uint256 indexed achievementId,
        string detectorIdStr,
        uint256 smellCount,
        string smellCategory,
        bytes32 detectorProof
    );
    
    function logDecentralizedCodeCodeSmellDetector(
        uint256 achievementId,
        string memory detectorId,
        uint256 smellCount,
        string memory smellCategory,
        bytes32 detectorProof,
        string memory detectorStatus
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(detectorId).length > 0, "Detector ID required");
        require(smellCount > 0, "Smell count must be positive");
        require(bytes(smellCategory).length > 0, "Smell category required");
        require(bytes(detectorStatus).length > 0, "Detector status required");
        
        codeSmellDetectorCount++;
        codeSmellDetectors[codeSmellDetectorCount] = CodeSmellDetector({
            id: codeSmellDetectorCount,
            achievementId: achievementId,
            detectorId: detectorId,
            smellCount: smellCount,
            smellCategory: smellCategory,
            detectorProof: detectorProof,
            detectorStatus: detectorStatus,
            recordedAt: block.timestamp
        });
        
        emit CodeSmellDetectorLogged(
            codeSmellDetectorCount,
            achievementId,
            detectorId,
            smellCount,
            smellCategory,
            detectorProof
        );
        
        return codeSmellDetectorCount;
    }
}

