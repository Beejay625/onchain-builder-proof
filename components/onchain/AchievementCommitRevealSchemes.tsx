'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCommitRevealSchemesProps {
  achievementId: bigint
}

export default function AchievementCommitRevealSchemes({ achievementId }: AchievementCommitRevealSchemesProps) {
  const { address, isConnected } = useAccount()
  const [schemePhase, setSchemePhase] = useState<'commit' | 'reveal'>('commit')
  const [commitHash, setCommitHash] = useState('')
  const [revealValue, setRevealValue] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCommitRevealSchemes')) {
    return null
  }

  const handleCommitReveal = async () => {
    if (!isConnected || !address) return

    try {
      if (schemePhase === 'commit' && !commitHash.trim()) return
      if (schemePhase === 'reveal' && !revealValue.trim()) return

      const content = `Commit-Reveal Scheme\nAchievement: #${achievementId.toString()}\nPhase: ${schemePhase}${schemePhase === 'commit' ? `\nCommit Hash: ${commitHash}` : `\nReveal Value: ${revealValue}`}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Commit-reveal operation failed:', error)
    }
  }

  return (
    <AppCard title="🔒 Achievement Commit-Reveal Schemes" subtitle="Track commit-reveal schemes operations and verifications" accent="slate">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheme Phase</label>
          <select
            value={schemePhase}
            onChange={(e) => setSchemePhase(e.target.value as 'commit' | 'reveal')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="commit">Commit</option>
            <option value="reveal">Reveal</option>
          </select>
        </div>
        {schemePhase === 'commit' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commit Hash</label>
            <input
              type="text"
              value={commitHash}
              onChange={(e) => setCommitHash(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reveal Value</label>
            <input
              type="text"
              value={revealValue}
              onChange={(e) => setRevealValue(e.target.value)}
              placeholder="Reveal value"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        )}
        <button
          onClick={handleCommitReveal}
          disabled={isPending || isConfirming || !isConnected || (schemePhase === 'commit' && !commitHash.trim()) || (schemePhase === 'reveal' && !revealValue.trim())}
          className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : schemePhase === 'commit' ? 'Commit' : 'Reveal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ {schemePhase === 'commit' ? 'Committed' : 'Revealed'} onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

