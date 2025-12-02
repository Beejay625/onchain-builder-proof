// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title F664 - Smart Contract External Call Analyzer
 * @notice Identifies external calls with call type tracking and call counting
 */
contract F664_SmartContractExternalCallAnalyzer {
    uint256 public externalCallAnalyzerCount;
    
    struct ExternalCallAnalyzer {
        uint256 id;
        uint256 achievementId;
        string analyzerId;
        uint256 externalCallCount;
        string callType;
        bytes32 analyzerProof;
        string analyzerStatus;
        uint256 recordedAt;
    }
    
    mapping(uint256 => ExternalCallAnalyzer) public externalCallAnalyzers;
    
    event ExternalCallAnalyzerLogged(
        uint256 indexed analyzerId,
        uint256 indexed achievementId,
        string analyzerIdStr,
        uint256 externalCallCount,
        string callType,
        bytes32 analyzerProof
    );
    
    function logSmartContractExternalCallAnalyzer(
        uint256 achievementId,
        string memory analyzerId,
        uint256 externalCallCount,
        string memory callType,
        bytes32 analyzerProof,
        string memory analyzerStatus
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(analyzerId).length > 0, "Analyzer ID required");
        require(externalCallCount > 0, "External call count must be positive");
        require(bytes(callType).length > 0, "Call type required");
        require(bytes(analyzerStatus).length > 0, "Analyzer status required");
        
        externalCallAnalyzerCount++;
        externalCallAnalyzers[externalCallAnalyzerCount] = ExternalCallAnalyzer({
            id: externalCallAnalyzerCount,
            achievementId: achievementId,
            analyzerId: analyzerId,
            externalCallCount: externalCallCount,
            callType: callType,
            analyzerProof: analyzerProof,
            analyzerStatus: analyzerStatus,
            recordedAt: block.timestamp
        });
        
        emit ExternalCallAnalyzerLogged(
            externalCallAnalyzerCount,
            achievementId,
            analyzerId,
            externalCallCount,
            callType,
            analyzerProof
        );
        
        return externalCallAnalyzerCount;
    }
}

