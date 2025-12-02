// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Multi-Domain Consensus
 * @notice Consensus mechanism across multiple domains with BFT, PoS, PoA, or hybrid consensus types
 */
contract MultiDomainConsensus {
    enum ConsensusType { BFT, PoS, PoA, Hybrid }

    struct Consensus {
        uint256 id;
        uint256 achievementId;
        ConsensusType consensusType;
        string[] domains;
        bytes32 consensusProof;
        bool reached;
        uint256 recordedAt;
    }

    uint256 public consensusCount;
    mapping(uint256 => Consensus) public consensuses;

    event ConsensusInitiated(
        uint256 indexed consensusId,
        uint256 indexed achievementId,
        ConsensusType consensusType,
        string[] domains
    );

    function initiateConsensus(
        uint256 achievementId,
        ConsensusType consensusType,
        string[] memory domains,
        bytes32 consensusProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(domains.length >= 2, "At least 2 domains required");
        
        consensusCount++;
        consensuses[consensusCount] = Consensus({
            id: consensusCount,
            achievementId: achievementId,
            consensusType: consensusType,
            domains: domains,
            consensusProof: consensusProof,
            reached: false,
            recordedAt: block.timestamp
        });

        emit ConsensusInitiated(consensusCount, achievementId, consensusType, domains);
        return consensusCount;
    }
}

