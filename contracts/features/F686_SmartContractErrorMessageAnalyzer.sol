// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title F686 - Smart Contract Error Message Analyzer
 * @notice Analyzes error messages with message type tracking and message counting
 */
contract F686_SmartContractErrorMessageAnalyzer {
    uint256 public errorMessageAnalyzerCount;
    
    struct ErrorMessageAnalyzer {
        uint256 id;
        uint256 achievementId;
        string analyzerId;
        uint256 errorMessageCount;
        string messageType;
        bytes32 analyzerProof;
        string analyzerStatus;
        uint256 recordedAt;
    }
    
    mapping(uint256 => ErrorMessageAnalyzer) public errorMessageAnalyzers;
    
    event ErrorMessageAnalyzerLogged(
        uint256 indexed analyzerId,
        uint256 indexed achievementId,
        string analyzerIdStr,
        uint256 errorMessageCount,
        string messageType,
        bytes32 analyzerProof
    );
    
    function logSmartContractErrorMessageAnalyzer(
        uint256 achievementId,
        string memory analyzerId,
        uint256 errorMessageCount,
        string memory messageType,
        bytes32 analyzerProof,
        string memory analyzerStatus
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(analyzerId).length > 0, "Analyzer ID required");
        require(errorMessageCount > 0, "Error message count must be positive");
        require(bytes(messageType).length > 0, "Message type required");
        require(bytes(analyzerStatus).length > 0, "Analyzer status required");
        
        errorMessageAnalyzerCount++;
        errorMessageAnalyzers[errorMessageAnalyzerCount] = ErrorMessageAnalyzer({
            id: errorMessageAnalyzerCount,
            achievementId: achievementId,
            analyzerId: analyzerId,
            errorMessageCount: errorMessageCount,
            messageType: messageType,
            analyzerProof: analyzerProof,
            analyzerStatus: analyzerStatus,
            recordedAt: block.timestamp
        });
        
        emit ErrorMessageAnalyzerLogged(
            errorMessageAnalyzerCount,
            achievementId,
            analyzerId,
            errorMessageCount,
            messageType,
            analyzerProof
        );
        
        return errorMessageAnalyzerCount;
    }
}

