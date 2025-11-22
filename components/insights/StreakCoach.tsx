'use client'

import AppCard from '@/components/common/AppCard'

interface StreakCoachProps {
  timestamps: number[]
}

const DAY_MS = 24 * 60 * 60 * 1000

const insights = ['Ship before noon UTC to maximize engagement.', 'Pair AI drafts with evidence attachments.', 'Batch mint on Mondays to lock early-week streaks.']

export default function StreakCoach({ timestamps }: StreakCoachProps) {
  const sorted = [...timestamps].sort((a, b) => b - a)
  const currentStreak = calculateStreak(sorted)
  const longestGapDays = calculateLongestGap(sorted)
  const forecast = buildForecast(currentStreak)
  const risk = currentStreak === 0 ? 'High' : currentStreak < 2 ? 'Medium' : 'Low'

  return (
    <AppCard
      title="Habit Streak Coach"
      subtitle="Predictive nudges to keep your builder streak alive."
      accent="green"
      padding="dense"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Current streak</p>
          <p className="mt-2 text-3xl font-bold text-green-900">{currentStreak} days</p>
          <p className="text-xs text-green-700">{forecast.streakTip}</p>
        </div>
        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">Risk level</p>
          <p className="mt-2 text-3xl font-bold text-yellow-900">{risk}</p>
          <p className="text-xs text-yellow-700">Longest gap: {longestGapDays} days</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Next action</p>
          <p className="mt-2 text-3xl font-bold text-blue-900">{forecast.hoursLeft}h</p>
          <p className="text-xs text-blue-700">left to keep the streak alive</p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-gray-100 bg-white/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Coach suggestions</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          {insights.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </AppCard>
  )
}

function calculateStreak(timestamps: number[]) {
  if (timestamps.length === 0) return 0
  const today = Date.now()
  let streak = 0
  let cursor = startOfDay(today)
  const days = new Set(timestamps.map((ts) => startOfDay(ts)))

  while (days.has(cursor)) {
    streak += 1
    cursor -= DAY_MS
  }

  return streak
}

function startOfDay(value: number) {
  return new Date(new Date(value).toDateString()).getTime()
}

function calculateLongestGap(timestamps: number[]) {
  if (timestamps.length < 2) return 0
  let longest = 0
  for (let i = 0; i < timestamps.length - 1; i += 1) {
    const gap = Math.round((timestamps[i] - timestamps[i + 1]) / DAY_MS)
    longest = Math.max(longest, gap)
  }
  return longest
}

function buildForecast(streak: number) {
  if (streak === 0) {
    return { hoursLeft: 12, streakTip: 'Log something today to avoid a reset.' }
  }
  if (streak < 3) {
    return { hoursLeft: 18, streakTip: 'One more mint unlocks the 3-day badge.' }
  }
  return { hoursLeft: 24, streakTip: 'Solid momentum — line up evidence for tomorrow.' }
}


