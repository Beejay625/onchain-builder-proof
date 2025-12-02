// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Proof Fusion Network
 * @notice Network for fusing proofs across domains with Merkle, ZK-SNARK, ZK-STARK, or fraud proof types
 */
contract ProofFusionNetwork {
    enum ProofType { Merkle, ZKSNARK, ZKSTARK, FraudProof }

    struct FusedProof {
        uint256 id;
        uint256 achievementId;
        ProofType proofType;
        bytes32 proofHash;
        string[] domains;
        bytes32 fusionProof;
        uint256 recordedAt;
    }

    uint256 public fusedProofCount;
    mapping(uint256 => FusedProof) public fusedProofs;
    mapping(ProofType => uint256[]) public proofTypeIndex;

    event ProofFused(
        uint256 indexed fusedProofId,
        uint256 indexed achievementId,
        ProofType proofType,
        bytes32 proofHash,
        string[] domains
    );

    function fuseProof(
        uint256 achievementId,
        ProofType proofType,
        bytes32 proofHash,
        string[] memory domains,
        bytes32 fusionProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(domains.length >= 2, "At least 2 domains required");
        
        fusedProofCount++;
        fusedProofs[fusedProofCount] = FusedProof({
            id: fusedProofCount,
            achievementId: achievementId,
            proofType: proofType,
            proofHash: proofHash,
            domains: domains,
            fusionProof: fusionProof,
            recordedAt: block.timestamp
        });

        proofTypeIndex[proofType].push(fusedProofCount);

        emit ProofFused(fusedProofCount, achievementId, proofType, proofHash, domains);
        return fusedProofCount;
    }
}

