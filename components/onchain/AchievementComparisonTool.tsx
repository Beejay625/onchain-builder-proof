'use client'

import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementComparisonTool() {
  const [achievement1, setAchievement1] = useState('')
  const [achievement2, setAchievement2] = useState('')

  if (!isFeatureEnabled('achievementComparisonTool')) {
    return null
  }

  return (
    <AppCard title="⚖️ Achievement Comparison Tool" subtitle="Compare multiple achievements side by side" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievement 1 ID</label>
          <input
            type="text"
            value={achievement1}
            onChange={(e) => setAchievement1(e.target.value)}
            placeholder="Achievement ID"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievement 2 ID</label>
          <input
            type="text"
            value={achievement2}
            onChange={(e) => setAchievement2(e.target.value)}
            placeholder="Achievement ID"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {achievement1 && achievement2 && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="Achievement 1" value={achievement1} accent="blue" />
            <StatBadge label="Achievement 2" value={achievement2} accent="green" />
          </div>
        )}
        <p className="text-xs text-gray-500">
          Compare metrics, engagement, and performance between achievements.
        </p>
      </div>
    </AppCard>
  )
}

