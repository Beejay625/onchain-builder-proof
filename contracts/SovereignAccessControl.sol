// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Sovereign Access Control
 * @notice Access control for sovereign operations with configurable access levels and enforcement modes
 */
contract SovereignAccessControl {
    enum AccessLevel { Read, Write, Execute, Admin }
    enum EnforcementMode { Strict, Advisory, Disabled }

    struct AccessPolicy {
        uint256 id;
        uint256 achievementId;
        address subject;
        AccessLevel level;
        EnforcementMode enforcementMode;
        bytes32 policyProof;
        bool active;
        uint256 recordedAt;
    }

    uint256 public accessPolicyCount;
    mapping(uint256 => AccessPolicy) public accessPolicies;
    mapping(uint256 => mapping(address => AccessLevel)) public achievementAccess;

    event AccessPolicyCreated(
        uint256 indexed policyId,
        uint256 indexed achievementId,
        address subject,
        AccessLevel level,
        EnforcementMode enforcementMode
    );

    function createAccessPolicy(
        uint256 achievementId,
        address subject,
        AccessLevel level,
        EnforcementMode enforcementMode,
        bytes32 policyProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(subject != address(0), "Invalid subject");
        
        accessPolicyCount++;
        accessPolicies[accessPolicyCount] = AccessPolicy({
            id: accessPolicyCount,
            achievementId: achievementId,
            subject: subject,
            level: level,
            enforcementMode: enforcementMode,
            policyProof: policyProof,
            active: true,
            recordedAt: block.timestamp
        });

        achievementAccess[achievementId][subject] = level;

        emit AccessPolicyCreated(accessPolicyCount, achievementId, subject, level, enforcementMode);
        return accessPolicyCount;
    }
}

