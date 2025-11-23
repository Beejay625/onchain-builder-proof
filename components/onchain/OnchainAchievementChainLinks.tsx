'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementChainLinksProps {
  achievementId: bigint
}

export default function OnchainAchievementChainLinks({ achievementId }: OnchainAchievementChainLinksProps) {
  const { address, isConnected } = useAccount()
  const [chainSequence, setChainSequence] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const createChainLink = async () => {
    if (!isConnected || !address || !chainSequence.trim()) return

    try {
      const chainData = `CHAIN:${chainSequence}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, chainData],
      })
    } catch (error) {
      console.error('Chain link creation failed:', error)
    }
  }

  return (
    <AppCard title="⛓️ Achievement Chain Links" subtitle="Create sequential achievement chains" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chain Sequence (comma-separated IDs)</label>
          <input
            type="text"
            value={chainSequence}
            onChange={(e) => setChainSequence(e.target.value)}
            placeholder="e.g., 1,2,3,4,5"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
          <p className="text-xs text-gray-500 mt-1">Enter achievement IDs in sequence order</p>
        </div>
        <button
          onClick={createChainLink}
          disabled={isPending || isConfirming || !isConnected || !chainSequence.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Chain Link'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Chain link created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

