'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementGalleryView() {
  const { address } = useAccount()
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium')
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('achievementGalleryView')) {
    return null
  }

  return (
    <AppCard title="🖼️ Achievement Gallery View" subtitle="View achievements in gallery format" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grid Size</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value as 'small' | 'medium' | 'large')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="small">Small Grid</option>
            <option value="medium">Medium Grid</option>
            <option value="large">Large Grid</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Achievements" value={userPostIds?.length?.toString() || '0'} accent="blue" />
          <StatBadge label="Grid Size" value={gridSize} accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Gallery View</p>
          <p className="text-xs">
            View your achievements in a visual gallery format with customizable grid sizes.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

