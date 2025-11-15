/**
 * Application-wide constants
 */

export const APP_NAME = 'Onchain Builder Proof'
export const APP_DESCRIPTION = 'Mint your weekly achievements on Base blockchain'

// Contract addresses
export const BUILDER_PROOF_CONTRACT = '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

// Social links
export const TWITTER_HANDLE = '@onchainbuilder'
export const GITHUB_REPO = 'https://github.com/your-repo/onchain-builder-proof'

// Achievement milestones
export const MILESTONES = [1, 5, 10, 25, 50, 100, 250, 500, 1000]

// Reputation multipliers
export const REPUTATION = {
  POST: 10,
  LIKE_RECEIVED: 2,
  COMMENT_RECEIVED: 5,
  COMMENT_GIVEN: 1,
  STREAK_BONUS: 5,
}

// Level thresholds
export const LEVELS = {
  BEGINNER: 0,
  INTERMEDIATE: 5,
  ADVANCED: 10,
  EXPERT: 25,
  MASTER: 50,
  LEGEND: 100,
}

// Categories
export const CATEGORIES = [
  'Development',
  'Design',
  'Learning',
  'Deployment',
  'Community',
  'Content',
  'Research',
  'Other',
] as const

export type Category = typeof CATEGORIES[number]

