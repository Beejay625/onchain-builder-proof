import type { FeatureFlagKey, FeatureFlags } from '@/types'

const defaultFlags: FeatureFlags = {
  aiDraftAssistant: true,
  adaptiveTemplateBuilder: false,
  achievementEvidenceLocker: false,
  githubAutoProofImporter: false,
  ciCdDeploymentSync: false,
  wakatimeActivitySync: false,
  habitStreakCoach: false,
  milestoneRoadmaps: false,
  impactKpiDashboard: false,
  crossChainMirrorView: false,
  multiWalletAggregator: true,
  gasOptimizerTips: false,
  achievementBundles: false,
  liveCollaborationRooms: false,
  mentorshipMatcher: false,
  squadSprintBoard: false,
  threadedCommentsMentions: false,
  reactionPaletteMood: false,
  tipSplittingRevenueShare: false,
  rewardVaults: false,
  governanceSnapshotMirror: false,
  complianceAttestationForms: false,
  evidenceReviewWorkflows: false,
  realtimeNotificationCenter: false,
  publicWebhooksApiKeys: false,
  scheduledPublishingAutoSharing: false,
  digestEmailsPush: false,
  embeddableAchievementGallery: false,
  profileLayoutBuilder: false,
  offlineCaptureSync: false,
}

let flagOverrides: Partial<FeatureFlags> = {}

export const configureFeatureFlags = (overrides: Partial<FeatureFlags>) => {
  flagOverrides = { ...flagOverrides, ...overrides }
}

export const getFeatureFlags = (): FeatureFlags => ({
  ...defaultFlags,
  ...flagOverrides,
})

export const isFeatureEnabled = (flag: FeatureFlagKey) => {
  const flags = getFeatureFlags()
  return !!flags[flag]
}



