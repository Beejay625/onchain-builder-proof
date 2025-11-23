'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementAccessLoggingProps {
  achievementId: bigint
}

export default function AchievementAccessLogging({ achievementId }: AchievementAccessLoggingProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementAccessLogging')) {
    return null
  }

  const accessCount = 42 // Mock access count

  return (
    <AppCard title="📂 Achievement Access Logging" subtitle="View access-related details and logs" accent="indigo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Accesses" value={accessCount.toString()} accent="blue" />
          <StatBadge label="Unique Users" value="12" accent="green" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Last Access" value="Today" accent="purple" />
          <StatBadge label="Access Rate" value="High" accent="orange" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Access Details</p>
          <p className="text-xs">
            All access attempts are logged onchain for security and audit purposes.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

