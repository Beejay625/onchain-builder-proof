// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Cross-Domain Governance
 * @notice Governance system for coordinating proposals and voting across multiple domains
 */
contract CrossDomainGovernance {
    struct GovernanceProposal {
        uint256 id;
        uint256 achievementId;
        bytes32 proposalHash;
        string[] domains;
        uint256 votingPeriod;
        uint256 quorumThreshold;
        bool executed;
        uint256 recordedAt;
    }

    uint256 public proposalCount;
    mapping(uint256 => GovernanceProposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public votes;

    event ProposalCreated(
        uint256 indexed proposalId,
        uint256 indexed achievementId,
        bytes32 proposalHash,
        string[] domains,
        uint256 votingPeriod
    );

    event VoteCast(
        uint256 indexed proposalId,
        address voter,
        bool support
    );

    function createProposal(
        uint256 achievementId,
        bytes32 proposalHash,
        string[] memory domains,
        uint256 votingPeriod,
        uint256 quorumThreshold
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(domains.length > 0, "At least one domain required");
        require(votingPeriod > 0, "Voting period required");
        
        proposalCount++;
        proposals[proposalCount] = GovernanceProposal({
            id: proposalCount,
            achievementId: achievementId,
            proposalHash: proposalHash,
            domains: domains,
            votingPeriod: votingPeriod,
            quorumThreshold: quorumThreshold,
            executed: false,
            recordedAt: block.timestamp
        });

        emit ProposalCreated(proposalCount, achievementId, proposalHash, domains, votingPeriod);
        return proposalCount;
    }

    function castVote(uint256 proposalId, bool support) public {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        require(!votes[proposalId][msg.sender], "Already voted");
        GovernanceProposal storage proposal = proposals[proposalId];
        require(block.timestamp <= proposal.recordedAt + proposal.votingPeriod, "Voting period ended");
        
        votes[proposalId][msg.sender] = true;
        emit VoteCast(proposalId, msg.sender, support);
    }
}

