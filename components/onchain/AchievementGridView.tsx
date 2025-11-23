'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementGridView() {
  const { address } = useAccount()
  const [columns, setColumns] = useState<'2' | '3' | '4'>('3')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('achievementGridView')) {
    return null
  }

  return (
    <AppCard title="🔲 Achievement Grid View" subtitle="View achievements in grid format" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
          <select
            value={columns}
            onChange={(e) => setColumns(e.target.value as '2' | '3' | '4')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Columns" value={columns} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Grid View</p>
          <p className="text-xs">
            View your achievements in a responsive grid layout with customizable columns.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

