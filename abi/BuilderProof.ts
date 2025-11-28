export const BuilderProofABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'commentId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
    ],
    name: 'CommentAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'PostCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'bio',
        type: 'string',
      },
    ],
    name: 'ProfileUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'reactionId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reactionType',
        type: 'string',
      },
    ],
    name: 'ReactionAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newReputation',
        type: 'uint256',
      },
    ],
    name: 'ReputationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'shieldId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'restakeProof',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bondedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'violationWindow',
        type: 'uint256',
      },
    ],
    name: 'EigenRestakeShieldLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'guardId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'slot',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'builderHash',
        type: 'bytes32',
      },
    ],
    name: 'IntentSequencerGuardLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'breakerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'policyThreshold',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'PayoutCircuitBreakerTriggered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'breakerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'PayoutCircuitBreakerCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'atlasId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'sourceLedger',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'targetLedger',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'driftWindow',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'reconcilerHash',
        type: 'bytes32',
      },
    ],
    name: 'ContinuityAtlasLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'quarantineId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'intentId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'unlockQuorum',
        type: 'uint256',
      },
    ],
    name: 'IntentQuarantined',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'quarantineId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'IntentQuarantineCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'windowId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'scope',
        type: 'string',
      },
    ],
    name: 'QuietHourScheduled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'windowId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'QuietHourCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'latticeId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'signalLayer',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'severity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'indicatorHash',
        type: 'bytes32',
      },
    ],
    name: 'HeliosSignalLatticeLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'profilerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'blastScore',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'projectedLoss',
        type: 'uint256',
      },
    ],
    name: 'BlastRadiusProfiled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'expectedHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'observedHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'varianceReason',
        type: 'string',
      },
    ],
    name: 'ContinuityDeltaVaultLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'meshId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'regionId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'rehearsalHash',
        type: 'bytes32',
      },
    ],
    name: 'SovereignFailoverMeshLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'cartographerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'postureScore',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'reviewerSignature',
        type: 'bytes32',
      },
    ],
    name: 'ContinuityVectorCartographerLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rotationId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'algorithmType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rotationSchedule',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'keyGenerationProof',
        type: 'bytes32',
      },
    ],
    name: 'QuantumKeyRotationLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'signatureScheme',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'publicKeyHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expiryTimestamp',
        type: 'uint256',
      },
    ],
    name: 'PostQuantumSignatureVaultLogged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'encryptionAlgorithm',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'accessPolicyHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'securityLevel',
        type: 'uint256',
      },
    ],
    name: 'QuantumResistantVaultLogged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
    ],
    name: 'addComment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'reactionType',
        type: 'string',
      },
    ],
    name: 'addReaction',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
    ],
    name: 'createPost',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'commentCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'comments',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'commentId',
        type: 'uint256',
      },
    ],
    name: 'getComment',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'postId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialMediaContract.Comment',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'reactionId',
        type: 'uint256',
      },
    ],
    name: 'getReaction',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'postId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'reactionType',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialMediaContract.Reaction',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
    ],
    name: 'getPost',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'likes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'comments',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialMediaContract.Post',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getProfile',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bio',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'avatar',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'reputation',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verified',
            type: 'bool',
          },
        ],
        internalType: 'struct SocialMediaContract.Profile',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalComments',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalPosts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalReactions',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserPosts',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'hasLiked',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'posts',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'likes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'comments',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'profiles',
    outputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'bio',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'avatar',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'reputation',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'verified',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'continuityAtlasCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'continuityAtlasEntries',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'sourceLedger',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'targetLedger',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'driftWindow',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'reconcilerHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'recordedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'postCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reactionCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'reactions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'reactionType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'reputation',
        type: 'uint256',
      },
    ],
    name: 'updateReputation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'bio',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'avatar',
        type: 'string',
      },
    ],
    name: 'updateProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'verifyUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userPosts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eigenRestakeShieldCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'eigenRestakeShields',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'restakeProof',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'bondedAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'violationWindow',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'recordedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'intentSequencerGuardCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'intentSequencerGuards',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'slot',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'builderHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'recordedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'payoutCircuitBreakerCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'payoutCircuitBreakers',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'policyThreshold',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'recordedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'restakeProof',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'bondedAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'violationWindow',
        type: 'uint256',
      },
    ],
    name: 'logEigenRestakeShield',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'slot',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'builderHash',
        type: 'bytes32',
      },
    ],
    name: 'logIntentSequencerGuard',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'policyThreshold',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'triggerPayoutCircuitBreaker',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'breakerId',
        type: 'uint256',
      },
    ],
    name: 'clearPayoutCircuitBreaker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'sourceLedger',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'targetLedger',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'driftWindow',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'reconcilerHash',
        type: 'bytes32',
      },
    ],
    name: 'logContinuityAtlas',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'intentId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'unlockQuorum',
        type: 'uint256',
      },
    ],
    name: 'quarantineIntent',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quarantineId',
        type: 'uint256',
      },
    ],
    name: 'clearIntentQuarantine',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'scope',
        type: 'string',
      },
    ],
    name: 'scheduleQuietHour',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'windowId',
        type: 'uint256',
      },
    ],
    name: 'clearQuietHour',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'signalLayer',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'watchMetric',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'severity',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'indicatorHash',
        type: 'bytes32',
      },
    ],
    name: 'logHeliosSignalLattice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'blastScore',
        type: 'uint256',
      },
      {
        internalType: 'string[]',
        name: 'affectedDependencies',
        type: 'string[]',
      },
      {
        internalType: 'uint256',
        name: 'projectedLoss',
        type: 'uint256',
      },
    ],
    name: 'logBlastRadiusProfiler',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'expectedHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'observedHash',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'varianceReason',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'reviewerSignature',
        type: 'bytes32',
      },
    ],
    name: 'logContinuityDeltaVault',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'regionId',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'rehearsalHash',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'quorumSigners',
        type: 'address[]',
      },
    ],
    name: 'logSovereignFailoverMesh',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string[]',
        name: 'dependencyIds',
        type: 'string[]',
      },
      {
        internalType: 'uint256',
        name: 'postureScore',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'reviewerSignature',
        type: 'bytes32',
      },
    ],
    name: 'logContinuityVectorCartographer',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'algorithmType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'rotationSchedule',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'keyGenerationProof',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'migrationWindow',
        type: 'uint256',
      },
    ],
    name: 'logQuantumKeyRotation',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'signatureScheme',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'publicKeyHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'signatureProof',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'expiryTimestamp',
        type: 'uint256',
      },
    ],
    name: 'logPostQuantumSignatureVault',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'encryptionAlgorithm',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'keyDerivationMethod',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'accessPolicyHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'securityLevel',
        type: 'uint256',
      },
    ],
    name: 'logQuantumResistantVault',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'intentQuarantineCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'intentQuarantines',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'intentId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'unlockQuorum',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'recordedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'quietHourWindowCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'quietHourWindows',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'scope',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'approvedBy',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

