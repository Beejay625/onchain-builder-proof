// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Treasury Fusion Vault
 * @notice Fuse treasury operations across chains with aggregated, segregated, or hybrid fusion modes
 */
contract TreasuryFusionVault {
    enum FusionMode { Aggregated, Segregated, Hybrid }

    struct FusionVault {
        uint256 id;
        uint256 achievementId;
        FusionMode mode;
        uint256 totalAmount;
        string[] chainIds;
        bytes32 fusionProof;
        uint256 recordedAt;
    }

    uint256 public fusionVaultCount;
    mapping(uint256 => FusionVault) public fusionVaults;

    event FusionVaultCreated(
        uint256 indexed vaultId,
        uint256 indexed achievementId,
        FusionMode mode,
        uint256 totalAmount,
        string[] chainIds
    );

    function createFusionVault(
        uint256 achievementId,
        FusionMode mode,
        uint256 totalAmount,
        string[] memory chainIds,
        bytes32 fusionProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(totalAmount > 0, "Total amount required");
        require(chainIds.length > 0, "At least one chain required");
        
        fusionVaultCount++;
        fusionVaults[fusionVaultCount] = FusionVault({
            id: fusionVaultCount,
            achievementId: achievementId,
            mode: mode,
            totalAmount: totalAmount,
            chainIds: chainIds,
            fusionProof: fusionProof,
            recordedAt: block.timestamp
        });

        emit FusionVaultCreated(fusionVaultCount, achievementId, mode, totalAmount, chainIds);
        return fusionVaultCount;
    }
}

