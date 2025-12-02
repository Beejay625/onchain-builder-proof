// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Cross-Chain State Machine
 * @notice State machine for cross-chain coordination with configurable state transitions and timeout policies
 */
contract CrossChainStateMachine {
    struct StateTransition {
        uint256 id;
        uint256 achievementId;
        string currentState;
        string nextState;
        bytes32 transitionProof;
        uint256 timeoutTimestamp;
        bool completed;
        uint256 recordedAt;
    }

    uint256 public transitionCount;
    mapping(uint256 => StateTransition) public transitions;
    mapping(uint256 => string) public achievementStates;

    event StateTransitionInitiated(
        uint256 indexed transitionId,
        uint256 indexed achievementId,
        string currentState,
        string nextState,
        uint256 timeoutTimestamp
    );

    function initiateTransition(
        uint256 achievementId,
        string memory currentState,
        string memory nextState,
        bytes32 transitionProof,
        uint256 timeoutSeconds
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(bytes(currentState).length > 0, "Current state required");
        require(bytes(nextState).length > 0, "Next state required");
        require(timeoutSeconds > 0, "Timeout required");
        
        transitionCount++;
        transitions[transitionCount] = StateTransition({
            id: transitionCount,
            achievementId: achievementId,
            currentState: currentState,
            nextState: nextState,
            transitionProof: transitionProof,
            timeoutTimestamp: block.timestamp + timeoutSeconds,
            completed: false,
            recordedAt: block.timestamp
        });

        achievementStates[achievementId] = currentState;

        emit StateTransitionInitiated(transitionCount, achievementId, currentState, nextState, block.timestamp + timeoutSeconds);
        return transitionCount;
    }
}

