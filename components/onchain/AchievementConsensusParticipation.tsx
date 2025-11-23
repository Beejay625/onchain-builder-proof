'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementConsensusParticipationProps {
  achievementId: bigint
}

export default function AchievementConsensusParticipation({ achievementId }: AchievementConsensusParticipationProps) {
  const { address, isConnected } = useAccount()
  const [participationType, setParticipationType] = useState<'proposal' | 'vote' | 'attestation'>('proposal')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementConsensusParticipation')) {
    return null
  }

  const handleParticipate = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Consensus Participation\nAchievement: #${achievementId.toString()}\nType: ${participationType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Consensus participation failed:', error)
    }
  }

  return (
    <AppCard title="🤝 Achievement Consensus Participation" subtitle="Track consensus participation operations in blockchain networks" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Participation Type</label>
          <select
            value={participationType}
            onChange={(e) => setParticipationType(e.target.value as 'proposal' | 'vote' | 'attestation')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="proposal">Proposal</option>
            <option value="vote">Vote</option>
            <option value="attestation">Attestation</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Participation Rate" value="85%" accent="green" />
          <StatBadge label="Total Votes" value="120" accent="blue" />
        </div>
        <button
          onClick={handleParticipate}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Participating...' : 'Participate in Consensus'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Consensus participation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

