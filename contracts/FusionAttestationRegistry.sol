// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Fusion Attestation Registry
 * @notice Registry for tracking fusion attestations with expiry timestamps and revocation policies
 */
contract FusionAttestationRegistry {
    struct Attestation {
        uint256 id;
        uint256 achievementId;
        bytes32 attestationHash;
        uint256 expiryTimestamp;
        bytes32 revocationPolicyHash;
        bool revoked;
        uint256 recordedAt;
    }

    uint256 public attestationCount;
    mapping(uint256 => Attestation) public attestations;

    event AttestationRegistered(
        uint256 indexed attestationId,
        uint256 indexed achievementId,
        bytes32 attestationHash,
        uint256 expiryTimestamp
    );

    event AttestationRevoked(uint256 indexed attestationId, address revoker);

    function registerAttestation(
        uint256 achievementId,
        bytes32 attestationHash,
        uint256 expiryTimestamp,
        bytes32 revocationPolicyHash
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(expiryTimestamp > block.timestamp, "Expiry must be in future");
        
        attestationCount++;
        attestations[attestationCount] = Attestation({
            id: attestationCount,
            achievementId: achievementId,
            attestationHash: attestationHash,
            expiryTimestamp: expiryTimestamp,
            revocationPolicyHash: revocationPolicyHash,
            revoked: false,
            recordedAt: block.timestamp
        });

        emit AttestationRegistered(attestationCount, achievementId, attestationHash, expiryTimestamp);
        return attestationCount;
    }

    function revokeAttestation(uint256 attestationId) public {
        require(attestationId > 0 && attestationId <= attestationCount, "Invalid attestation");
        Attestation storage attestation = attestations[attestationId];
        require(!attestation.revoked, "Already revoked");
        require(block.timestamp <= attestation.expiryTimestamp, "Already expired");
        
        attestation.revoked = true;
        emit AttestationRevoked(attestationId, msg.sender);
    }
}

