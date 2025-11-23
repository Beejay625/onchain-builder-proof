'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementTrendsAnalysis() {
  const { address } = useAccount()
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('achievementTrendsAnalysis')) {
    return null
  }

  return (
    <AppCard title="📊 Achievement Trends Analysis" subtitle="Analyze achievement trends over time" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Total Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Trend" value="↑ Growing" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Trend Analysis</p>
          <p className="text-xs">
            Track your achievement creation patterns and growth over time.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

