// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Sovereign Data Residency
 * @notice Manage data residency requirements with allowed/restricted regions and enforcement modes
 */
contract SovereignDataResidency {
    enum EnforcementMode { Strict, Advisory, Disabled }

    struct DataResidency {
        uint256 id;
        uint256 achievementId;
        string[] allowedRegions;
        string[] restrictedRegions;
        EnforcementMode enforcementMode;
        bytes32 residencyProof;
        uint256 recordedAt;
    }

    uint256 public dataResidencyCount;
    mapping(uint256 => DataResidency) public dataResidencies;

    event DataResidencyRecorded(
        uint256 indexed residencyId,
        uint256 indexed achievementId,
        string[] allowedRegions,
        EnforcementMode enforcementMode
    );

    function recordDataResidency(
        uint256 achievementId,
        string[] memory allowedRegions,
        string[] memory restrictedRegions,
        EnforcementMode enforcementMode,
        bytes32 residencyProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        
        dataResidencyCount++;
        dataResidencies[dataResidencyCount] = DataResidency({
            id: dataResidencyCount,
            achievementId: achievementId,
            allowedRegions: allowedRegions,
            restrictedRegions: restrictedRegions,
            enforcementMode: enforcementMode,
            residencyProof: residencyProof,
            recordedAt: block.timestamp
        });

        emit DataResidencyRecorded(dataResidencyCount, achievementId, allowedRegions, enforcementMode);
        return dataResidencyCount;
    }
}

