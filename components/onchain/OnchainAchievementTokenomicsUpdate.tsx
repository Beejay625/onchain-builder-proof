'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTokenomicsUpdateProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenomicsUpdate({ achievementId }: OnchainAchievementTokenomicsUpdateProps) {
  const { address, isConnected } = useAccount()
  const [tokenAspect, setTokenAspect] = useState('')
  const [tokenChange, setTokenChange] = useState('')
  const [tokenNotes, setTokenNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordUpdate = async () => {
    if (!isConnected || !address || !tokenAspect.trim() || !tokenChange.trim()) return

    try {
      const payload = `TOKENOMICS_UPDATE:aspect:${tokenAspect}:change:${tokenChange}:note:${tokenNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Tokenomics update failed:', error)
    }
  }

  return (
    <AppCard title="💎 Tokenomics Update" subtitle="Share emissions, supply, or reward changes" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tokenomics Aspect *</label>
          <input
            type="text"
            value={tokenAspect}
            onChange={(e) => setTokenAspect(e.target.value)}
            placeholder="Emission schedule, staking rates, treasury split"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Change Summary *</label>
          <textarea
            value={tokenChange}
            onChange={(e) => setTokenChange(e.target.value)}
            rows={3}
            placeholder="Reduced weekly rewards by 10%"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={tokenNotes}
            onChange={(e) => setTokenNotes(e.target.value)}
            rows={2}
            placeholder="Pending DAO ratification, snapshot block"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordUpdate}
          disabled={isPending || isConfirming || !isConnected || !tokenAspect.trim() || !tokenChange.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Tokenomics Update'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Tokenomics update recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
