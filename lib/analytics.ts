import type { AnalyticsSnapshot } from '@/types'

export const emptyAnalyticsSnapshot = (): AnalyticsSnapshot => ({
  totalAchievements: 0,
  activeStreakDays: 0,
  impactScore: 0,
  velocity: 0,
  updatedAt: Date.now(),
})

export const mergeAnalyticsSnapshot = (
  current: AnalyticsSnapshot | null,
  patch: Partial<AnalyticsSnapshot>
): AnalyticsSnapshot => {
  const base = current ?? emptyAnalyticsSnapshot()
  return {
    ...base,
    ...patch,
    updatedAt: Date.now(),
  }
}

export const formatImpactScore = (score: number) => {
  if (Number.isNaN(score)) return '0.0'
  return score.toFixed(1)
}



