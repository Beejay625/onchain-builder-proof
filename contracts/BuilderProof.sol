// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title SocialMediaContract
 * @dev A comprehensive smart contract for onchain social media features
 * All interactions require wallet signatures via Reown wallet
 */
contract SocialMediaContract {
    address public owner;
    uint256 public postCount;
    uint256 public commentCount;
    uint256 public reactionCount;
    uint256 public eigenRestakeShieldCount;
    uint256 public intentSequencerGuardCount;
    uint256 public payoutCircuitBreakerCount;
    
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        uint256 comments;
    }
    
    struct Comment {
        uint256 id;
        uint256 postId;
        address author;
        string content;
        uint256 timestamp;
    }
    
    struct Reaction {
        uint256 id;
        uint256 postId;
        address user;
        string reactionType;
        uint256 timestamp;
    }
    
    struct Profile {
        address user;
        string name;
        string bio;
        string avatar;
        uint256 reputation;
        bool verified;
    }

    struct EigenRestakeShield {
        uint256 id;
        uint256 achievementId;
        bytes32 restakeProof;
        uint256 bondedAmount;
        uint256 violationWindow;
        uint256 recordedAt;
    }

    struct IntentSequencerGuard {
        uint256 id;
        uint256 achievementId;
        uint256 slot;
        uint256 blockNumber;
        bytes32 builderHash;
        uint256 recordedAt;
    }

    struct PayoutCircuitBreaker {
        uint256 id;
        uint256 achievementId;
        uint256 policyThreshold;
        string reason;
        bool active;
        uint256 recordedAt;
    }
    
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Comment) public comments;
    mapping(uint256 => Reaction) public reactions;
    mapping(address => Profile) public profiles;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    mapping(address => uint256[]) public userPosts;
    mapping(uint256 => EigenRestakeShield) public eigenRestakeShields;
    mapping(uint256 => IntentSequencerGuard) public intentSequencerGuards;
    mapping(uint256 => PayoutCircuitBreaker) public payoutCircuitBreakers;
    
    event PostCreated(uint256 indexed postId, address indexed author, string content, uint256 timestamp);
    event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author, string content);
    event ReactionAdded(uint256 indexed reactionId, uint256 indexed postId, address indexed user, string reactionType);
    event ProfileUpdated(address indexed user, string name, string bio);
    event ReputationUpdated(address indexed user, uint256 newReputation);
    event EigenRestakeShieldLogged(uint256 indexed shieldId, uint256 indexed achievementId, bytes32 restakeProof, uint256 bondedAmount, uint256 violationWindow);
    event IntentSequencerGuardLogged(uint256 indexed guardId, uint256 indexed achievementId, uint256 slot, uint256 blockNumber, bytes32 builderHash);
    event PayoutCircuitBreakerTriggered(uint256 indexed breakerId, uint256 indexed achievementId, uint256 policyThreshold, string reason);
    event PayoutCircuitBreakerCleared(uint256 indexed breakerId, address indexed resolver);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        postCount = 0;
        commentCount = 0;
        reactionCount = 0;
        eigenRestakeShieldCount = 0;
        intentSequencerGuardCount = 0;
        payoutCircuitBreakerCount = 0;
    }
    
    function createPost(string memory content) public returns (uint256) {
        require(bytes(content).length > 0, "Content cannot be empty");
        
        postCount++;
        posts[postCount] = Post({
            id: postCount,
            author: msg.sender,
            content: content,
            timestamp: block.timestamp,
            likes: 0,
            comments: 0
        });
        
        userPosts[msg.sender].push(postCount);
        
        emit PostCreated(postCount, msg.sender, content, block.timestamp);
        return postCount;
    }
    
    function addComment(uint256 postId, string memory content) public returns (uint256) {
        require(posts[postId].id != 0, "Post does not exist");
        require(bytes(content).length > 0, "Content cannot be empty");
        
        commentCount++;
        comments[commentCount] = Comment({
            id: commentCount,
            postId: postId,
            author: msg.sender,
            content: content,
            timestamp: block.timestamp
        });
        
        posts[postId].comments++;
        
        emit CommentAdded(commentCount, postId, msg.sender, content);
        return commentCount;
    }
    
    function addReaction(uint256 postId, string memory reactionType) public returns (uint256) {
        require(posts[postId].id != 0, "Post does not exist");
        
        reactionCount++;
        reactions[reactionCount] = Reaction({
            id: reactionCount,
            postId: postId,
            user: msg.sender,
            reactionType: reactionType,
            timestamp: block.timestamp
        });
        
        if (keccak256(bytes(reactionType)) == keccak256(bytes("like")) && !hasLiked[postId][msg.sender]) {
            posts[postId].likes++;
            hasLiked[postId][msg.sender] = true;
        }
        
        emit ReactionAdded(reactionCount, postId, msg.sender, reactionType);
        return reactionCount;
    }
    
    function updateProfile(string memory name, string memory bio, string memory avatar) public {
        profiles[msg.sender] = Profile({
            user: msg.sender,
            name: name,
            bio: bio,
            avatar: avatar,
            reputation: profiles[msg.sender].reputation,
            verified: profiles[msg.sender].verified
        });
        
        emit ProfileUpdated(msg.sender, name, bio);
    }
    
    function updateReputation(address user, uint256 reputation) public onlyOwner {
        require(profiles[user].user != address(0), "Profile does not exist");
        profiles[user].reputation = reputation;
        emit ReputationUpdated(user, reputation);
    }
    
    function verifyUser(address user) public onlyOwner {
        profiles[user].verified = true;
    }
    
    function getPost(uint256 postId) public view returns (Post memory) {
        return posts[postId];
    }
    
    function getComment(uint256 commentId) public view returns (Comment memory) {
        return comments[commentId];
    }
    
    function getReaction(uint256 reactionId) public view returns (Reaction memory) {
        return reactions[reactionId];
    }
    
    function getProfile(address user) public view returns (Profile memory) {
        return profiles[user];
    }
    
    function getUserPosts(address user) public view returns (uint256[] memory) {
        return userPosts[user];
    }
    
    function getTotalPosts() public view returns (uint256) {
        return postCount;
    }
    
    function getTotalComments() public view returns (uint256) {
        return commentCount;
    }
    
    function getTotalReactions() public view returns (uint256) {
        return reactionCount;
    }

    function logEigenRestakeShield(
        uint256 achievementId,
        bytes32 restakeProof,
        uint256 bondedAmount,
        uint256 violationWindow
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(restakeProof != bytes32(0), "Proof required");
        eigenRestakeShieldCount++;
        eigenRestakeShields[eigenRestakeShieldCount] = EigenRestakeShield({
            id: eigenRestakeShieldCount,
            achievementId: achievementId,
            restakeProof: restakeProof,
            bondedAmount: bondedAmount,
            violationWindow: violationWindow,
            recordedAt: block.timestamp
        });
        emit EigenRestakeShieldLogged(eigenRestakeShieldCount, achievementId, restakeProof, bondedAmount, violationWindow);
        return eigenRestakeShieldCount;
    }

    function logIntentSequencerGuard(
        uint256 achievementId,
        uint256 slot,
        uint256 blockNumber,
        bytes32 builderHash
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(slot > 0, "Slot required");
        require(blockNumber > 0, "Block required");
        require(builderHash != bytes32(0), "Builder hash required");
        intentSequencerGuardCount++;
        intentSequencerGuards[intentSequencerGuardCount] = IntentSequencerGuard({
            id: intentSequencerGuardCount,
            achievementId: achievementId,
            slot: slot,
            blockNumber: blockNumber,
            builderHash: builderHash,
            recordedAt: block.timestamp
        });
        emit IntentSequencerGuardLogged(intentSequencerGuardCount, achievementId, slot, blockNumber, builderHash);
        return intentSequencerGuardCount;
    }

    function triggerPayoutCircuitBreaker(
        uint256 achievementId,
        uint256 policyThreshold,
        string memory reason
    ) public returns (uint256) {
        require(achievementId > 0, "Invalid achievement");
        require(policyThreshold > 0, "Policy required");
        require(bytes(reason).length > 0, "Reason required");
        payoutCircuitBreakerCount++;
        payoutCircuitBreakers[payoutCircuitBreakerCount] = PayoutCircuitBreaker({
            id: payoutCircuitBreakerCount,
            achievementId: achievementId,
            policyThreshold: policyThreshold,
            reason: reason,
            active: true,
            recordedAt: block.timestamp
        });
        emit PayoutCircuitBreakerTriggered(payoutCircuitBreakerCount, achievementId, policyThreshold, reason);
        return payoutCircuitBreakerCount;
    }

    function clearPayoutCircuitBreaker(uint256 breakerId) public {
        require(breakerId > 0 && breakerId <= payoutCircuitBreakerCount, "Breaker missing");
        PayoutCircuitBreaker storage breaker = payoutCircuitBreakers[breakerId];
        require(breaker.active, "Breaker already cleared");
        breaker.active = false;
        emit PayoutCircuitBreakerCleared(breakerId, msg.sender);
    }
}


