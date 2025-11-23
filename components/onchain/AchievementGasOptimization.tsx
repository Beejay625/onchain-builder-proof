'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementGasOptimizationProps {
  achievementId: bigint
}

export default function AchievementGasOptimization({ achievementId }: AchievementGasOptimizationProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementGasOptimization')) {
    return null
  }

  const estimatedGas = 21000
  const optimizedGas = 18000
  const savings = estimatedGas - optimizedGas

  return (
    <AppCard title="⛽ Achievement Gas Optimization" subtitle="Optimize gas usage for operations" accent="yellow">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Estimated Gas" value={`${estimatedGas.toLocaleString()}`} accent="red" />
          <StatBadge label="Optimized Gas" value={`${optimizedGas.toLocaleString()}`} accent="green" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Savings" value={`${savings.toLocaleString()}`} accent="blue" />
          <StatBadge label="Savings %" value={`${((savings / estimatedGas) * 100).toFixed(1)}%`} accent="purple" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Gas Optimization Tips</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Batch multiple operations together</li>
            <li>Use storage efficiently</li>
            <li>Optimize contract calls</li>
          </ul>
        </div>
      </div>
    </AppCard>
  )
}
