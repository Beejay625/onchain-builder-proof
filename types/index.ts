/**
 * Type definitions for the application
 */

export interface Post {
  id: bigint
  author: `0x${string}`
  content: string
  timestamp: bigint
  likes: bigint
  comments: bigint
}

export interface Comment {
  id: bigint
  postId: bigint
  author: `0x${string}`
  content: string
  timestamp: bigint
}

export interface Reaction {
  id: bigint
  postId: bigint
  user: `0x${string}`
  reactionType: string
  timestamp: bigint
}

export interface Profile {
  user: `0x${string}`
  name: string
  bio: string
  avatar: string
  reputation: bigint
  verified: boolean
}

export interface Achievement {
  id: string
  content: string
  timestamp: number
  likes: number
  comments: number
  author: string
}

export interface BuilderProfile {
  address: string
  username: string
  bio: string
  achievements: number
  followers: number
  following: number
  reputation: number
  level: string
  joinedAt: number
}

export interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'achievement' | 'tip'
  message: string
  timestamp: number
  read: boolean
  link?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  progress: number
}

export interface Goal {
  id: string
  title: string
  completed: boolean
  deadline: string
  createdAt: number
}

export interface FeatureFlags {
  aiDraftAssistant: boolean
  adaptiveTemplateBuilder: boolean
  achievementEvidenceLocker: boolean
  githubAutoProofImporter: boolean
  ciCdDeploymentSync: boolean
  wakatimeActivitySync: boolean
  habitStreakCoach: boolean
  milestoneRoadmaps: boolean
  impactKpiDashboard: boolean
  crossChainMirrorView: boolean
  multiWalletAggregator: boolean
  gasOptimizerTips: boolean
  achievementBundles: boolean
  liveCollaborationRooms: boolean
  mentorshipMatcher: boolean
  squadSprintBoard: boolean
  threadedCommentsMentions: boolean
  reactionPaletteMood: boolean
  tipSplittingRevenueShare: boolean
  rewardVaults: boolean
  governanceSnapshotMirror: boolean
  complianceAttestationForms: boolean
  evidenceReviewWorkflows: boolean
  realtimeNotificationCenter: boolean
  publicWebhooksApiKeys: boolean
  scheduledPublishingAutoSharing: boolean
  digestEmailsPush: boolean
  embeddableAchievementGallery: boolean
  profileLayoutBuilder: boolean
  offlineCaptureSync: boolean
  onchainTimestamps: boolean
  onchainVersionControl: boolean
  onchainArchive: boolean
  onchainPin: boolean
  onchainBookmark: boolean
  onchainCollection: boolean
  qrCodeGeneration: boolean
  embedCode: boolean
  exportFormats: boolean
  onchainImport: boolean
  onchainBackup: boolean
  onchainRestore: boolean
  onchainHistory: boolean
  onchainAnalytics: boolean
  onchainInsights: boolean
  onchainRecommendations: boolean
  onchainFeed: boolean
  onchainNotifications: boolean
  onchainSettings: boolean
  onchainAccessControl: boolean
  onchainSearch: boolean
  onchainFilters: boolean
  onchainSorting: boolean
  onchainPagination: boolean
  onchainExport: boolean
  onchainSharing: boolean
  onchainPrint: boolean
  onchainPreview: boolean
  onchainValidation: boolean
  onchainVerification: boolean
  achievementTemplates: boolean
  achievementScheduling: boolean
  achievementRecurring: boolean
  achievementDrafts: boolean
  achievementCategories: boolean
  achievementTags: boolean
  achievementPrivacy: boolean
  achievementVisibility: boolean
  achievementExpirationManager: boolean
  achievementRenewalAutomation: boolean
  achievementTransferHistory: boolean
  achievementOwnershipHistory: boolean
  achievementCollaborationInvites: boolean
  achievementCommentsModeration: boolean
  achievementReactionsSystem: boolean
  achievementFollowSystem: boolean
  achievementShareAnalytics: boolean
  achievementViewTracking: boolean
  achievementEngagementMetrics: boolean
  achievementPerformanceDashboard: boolean
  achievementComparisonTool: boolean
  achievementTrendsAnalysis: boolean
  achievementCalendarView: boolean
  achievementTimelineView: boolean
  achievementGalleryView: boolean
  achievementListView: boolean
  achievementGridView: boolean
  achievementDetailView: boolean
  achievementQuickActions: boolean
  achievementBulkOperations: boolean
  achievementMetadataManagement: boolean
  achievementIPFSStorage: boolean
  achievementMultiChainBridge: boolean
  achievementCrossChainSync: boolean
  achievementGasOptimization: boolean
  achievementBatchMinting: boolean
  achievementMerkleTreeProofs: boolean
  achievementZeroKnowledgeProofs: boolean
  achievementSoulboundTokens: boolean
  achievementComposability: boolean
  achievementInteroperability: boolean
  achievementStandardCompliance: boolean
  achievementEventLogging: boolean
  achievementAuditTrail: boolean
  achievementComplianceReporting: boolean
  achievementRiskAssessment: boolean
  achievementSecurityScoring: boolean
  achievementVulnerabilityScanning: boolean
  achievementAccessLogging: boolean
  achievementPermissionManagement: boolean
  achievementRoleBasedAccess: boolean
  achievementTimeBasedAccess: boolean
  achievementLocationBasedAccess: boolean
  achievementDeviceBasedAccess: boolean
  achievementAPIRateLimiting: boolean
  achievementWebhookManagement: boolean
  achievementIntegrationManagement: boolean
  achievementPluginSystem: boolean
  achievementExtensionSystem: boolean
  achievementCustomFields: boolean
  achievementSmartContractEvents: boolean
  achievementEventIndexing: boolean
  achievementTransactionBatching: boolean
  achievementGasPriceOracle: boolean
  achievementTokenMetadata: boolean
  achievementNFTMetadataStandard: boolean
  achievementERC20Metadata: boolean
  achievementTokenListings: boolean
  achievementDEXRouting: boolean
  achievementSlippageProtection: boolean
  achievementPriceImpactCalculation: boolean
  achievementLiquidityPoolAnalytics: boolean
  achievementYieldCalculation: boolean
  achievementAPRAPYTracking: boolean
  achievementRewardDistribution: boolean
  achievementStakingPoolManagement: boolean
  achievementDelegationTracking: boolean
  achievementValidatorOperations: boolean
  achievementConsensusParticipation: boolean
  achievementBlockProduction: boolean
  achievementTransactionFinality: boolean
  achievementCrossChainState: boolean
  achievementBridgeValidators: boolean
  achievementRelayerOperations: boolean
  achievementOracleAggregation: boolean
  achievementPriceFeeds: boolean
  achievementDataFeeds: boolean
  achievementRandomNumberGeneration: boolean
  achievementVRF: boolean
  achievementCommitRevealSchemes: boolean
  achievementRunbookRegistry: boolean
  achievementIncidentPlayback: boolean
  achievementSequencerSLA: boolean
  achievementLatencyHeatmap: boolean
  operationalResilienceSuite: boolean
  autonomousAssuranceSuite: boolean
}

export type FeatureFlagKey = keyof FeatureFlags

