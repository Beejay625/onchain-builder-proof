'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementListView() {
  const { address } = useAccount()
  const [sortBy, setSortBy] = useState<'date' | 'likes' | 'comments'>('date')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('achievementListView')) {
    return null
  }

  return (
    <AppCard title="📋 Achievement List View" subtitle="View achievements in list format" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'likes' | 'comments')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="date">Date</option>
            <option value="likes">Likes</option>
            <option value="comments">Comments</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Sort By" value={sortBy} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">List View</p>
          <p className="text-xs">
            View your achievements in a compact list format with customizable sorting.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

