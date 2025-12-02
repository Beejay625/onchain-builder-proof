// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Cross-Domain Messaging
 * @notice Messaging system for cross-domain communication with configurable delivery guarantees
 */
contract CrossDomainMessaging {
    enum DeliveryGuarantee { AtMostOnce, AtLeastOnce, ExactlyOnce }

    struct Message {
        uint256 id;
        uint256 achievementId;
        bytes32 messageHash;
        string sourceDomain;
        string targetDomain;
        DeliveryGuarantee guarantee;
        bytes32 deliveryProof;
        bool delivered;
        uint256 recordedAt;
    }

    uint256 public messageCount;
    mapping(uint256 => Message) public messages;

    event MessageSent(
        uint256 indexed messageId,
        uint256 indexed achievementId,
        bytes32 messageHash,
        string sourceDomain,
        string targetDomain,
        DeliveryGuarantee guarantee
    );

    function sendMessage(
        uint256 achievementId,
        bytes32 messageHash,
        string memory sourceDomain,
        string memory targetDomain,
        DeliveryGuarantee guarantee,
        bytes32 deliveryProof
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(sourceDomain).length > 0, "Source domain required");
        require(bytes(targetDomain).length > 0, "Target domain required");
        
        messageCount++;
        messages[messageCount] = Message({
            id: messageCount,
            achievementId: achievementId,
            messageHash: messageHash,
            sourceDomain: sourceDomain,
            targetDomain: targetDomain,
            guarantee: guarantee,
            deliveryProof: deliveryProof,
            delivered: false,
            recordedAt: block.timestamp
        });

        emit MessageSent(messageCount, achievementId, messageHash, sourceDomain, targetDomain, guarantee);
        return messageCount;
    }
}

