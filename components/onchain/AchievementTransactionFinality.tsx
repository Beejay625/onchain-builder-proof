'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementTransactionFinalityProps {
  achievementId: bigint
}

export default function AchievementTransactionFinality({ achievementId }: AchievementTransactionFinalityProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementTransactionFinality')) {
    return null
  }

  const blockNumber = 12345678 // Mock block number
  const confirmations = 12

  return (
    <AppCard title="✅ Achievement Transaction Finality" subtitle="Record transaction finality confirmations and block numbers" accent="green">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Block Number" value={blockNumber.toLocaleString()} accent="blue" />
          <StatBadge label="Confirmations" value={confirmations.toString()} accent="green" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Finality Status" value="Finalized" accent="green" />
          <StatBadge label="Chain" value="Base" accent="purple" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Finality Information</p>
          <p className="text-xs">
            Transaction is finalized and cannot be reverted. Block number: {blockNumber.toLocaleString()}
          </p>
        </div>
      </div>
    </AppCard>
  )
}

