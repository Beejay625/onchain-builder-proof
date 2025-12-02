// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Fusion Governance Oracle
 * @notice Oracle for fusion governance decisions with voting results, proposal status, and quorum checks
 */
contract FusionGovernanceOracle {
    enum ProposalStatus { Pending, Active, Passed, Rejected, Executed }

    struct GovernanceDecision {
        uint256 id;
        uint256 achievementId;
        uint256 proposalId;
        ProposalStatus status;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 quorumThreshold;
        bytes32 decisionProof;
        uint256 recordedAt;
    }

    uint256 public decisionCount;
    mapping(uint256 => GovernanceDecision) public decisions;

    event GovernanceDecisionRecorded(
        uint256 indexed decisionId,
        uint256 indexed achievementId,
        uint256 proposalId,
        ProposalStatus status,
        uint256 votesFor,
        uint256 votesAgainst
    );

    function recordGovernanceDecision(
        uint256 achievementId,
        uint256 proposalId,
        ProposalStatus status,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 quorumThreshold,
        bytes32 decisionProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(proposalId > 0, "Invalid proposal");
        
        decisionCount++;
        decisions[decisionCount] = GovernanceDecision({
            id: decisionCount,
            achievementId: achievementId,
            proposalId: proposalId,
            status: status,
            votesFor: votesFor,
            votesAgainst: votesAgainst,
            quorumThreshold: quorumThreshold,
            decisionProof: decisionProof,
            recordedAt: block.timestamp
        });

        emit GovernanceDecisionRecorded(decisionCount, achievementId, proposalId, status, votesFor, votesAgainst);
        return decisionCount;
    }
}

