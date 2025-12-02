// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Quantum-Resistant Keys
 * @notice Manage quantum-resistant cryptographic keys with CRYSTALS-Kyber, Dilithium, FALCON, or SPHINCS+ algorithms
 */
contract QuantumResistantKeys {
    enum Algorithm { CRYSTALSKyber, Dilithium, FALCON, SPHINCSPlus }

    struct Key {
        uint256 id;
        uint256 achievementId;
        Algorithm algorithm;
        bytes32 publicKeyHash;
        bytes32 keyRotationProof;
        bool active;
        uint256 recordedAt;
    }

    uint256 public keyCount;
    mapping(uint256 => Key) public keys;

    event KeyRegistered(
        uint256 indexed keyId,
        uint256 indexed achievementId,
        Algorithm algorithm,
        bytes32 publicKeyHash
    );

    function registerKey(
        uint256 achievementId,
        Algorithm algorithm,
        bytes32 publicKeyHash,
        bytes32 keyRotationProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        
        keyCount++;
        keys[keyCount] = Key({
            id: keyCount,
            achievementId: achievementId,
            algorithm: algorithm,
            publicKeyHash: publicKeyHash,
            keyRotationProof: keyRotationProof,
            active: true,
            recordedAt: block.timestamp
        });

        emit KeyRegistered(keyCount, achievementId, algorithm, publicKeyHash);
        return keyCount;
    }
}

