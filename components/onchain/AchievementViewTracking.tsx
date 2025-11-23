'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'
import { useEffect, useState } from 'react'

interface AchievementViewTrackingProps {
  achievementId: bigint
}

export default function AchievementViewTracking({ achievementId }: AchievementViewTrackingProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = `views-${achievementId}`
      const stored = localStorage.getItem(key)
      if (stored) {
        setViewCount(Number(stored))
      } else {
        setViewCount(1)
        localStorage.setItem(key, '1')
      }
    }
  }, [achievementId])

  if (!isFeatureEnabled('achievementViewTracking')) {
    return null
  }

  return (
    <AppCard title="👁️ Achievement View Tracking" subtitle="Track views and engagement" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Views" value={viewCount.toString()} accent="blue" />
          <StatBadge label="Unique Views" value={viewCount.toString()} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">View Statistics</p>
          <p className="text-xs">
            Track how many times this achievement has been viewed.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

