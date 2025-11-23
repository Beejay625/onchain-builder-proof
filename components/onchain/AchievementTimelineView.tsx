'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementTimelineView() {
  const { address } = useAccount()
  const [viewMode, setViewMode] = useState<'chronological' | 'reverse'>('chronological')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('achievementTimelineView')) {
    return null
  }

  return (
    <AppCard title="📅 Achievement Timeline View" subtitle="View achievements in timeline format" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'chronological' | 'reverse')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="chronological">Chronological (Oldest First)</option>
            <option value="reverse">Reverse (Newest First)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="View Mode" value={viewMode} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Timeline View</p>
          <p className="text-xs">
            View your achievements in a chronological timeline format.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

