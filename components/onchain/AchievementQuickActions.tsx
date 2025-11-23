'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementQuickActionsProps {
  achievementId: bigint
}

export default function AchievementQuickActions({ achievementId }: AchievementQuickActionsProps) {
  const { isConnected } = useAccount()

  if (!isFeatureEnabled('achievementQuickActions')) {
    return null
  }

  const actions = [
    { label: 'Share', icon: '🔗', action: () => {} },
    { label: 'Bookmark', icon: '🔖', action: () => {} },
    { label: 'Export', icon: '📥', action: () => {} },
    { label: 'Print', icon: '🖨️', action: () => {} },
  ]

  return (
    <AppCard title="⚡ Achievement Quick Actions" subtitle="Quick access to common actions" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              disabled={!isConnected}
              className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              <span className="text-2xl">{action.icon}</span>
              <p className="text-xs mt-1">{action.label}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Quick access to frequently used actions for this achievement.
        </p>
      </div>
    </AppCard>
  )
}

