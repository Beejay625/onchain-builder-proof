'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementThawProps {
  achievementId: bigint
}

export default function OnchainAchievementThaw({ achievementId }: OnchainAchievementThawProps) {
  const { address, isConnected } = useAccount()
  const [thawNote, setThawNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const thawAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const thawData = `THAW:${Date.now()}:${thawNote || 'Achievement unfrozen'}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, thawData],
      })
    } catch (error) {
      console.error('Thaw failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Thaw Achievement" subtitle="Unfreeze achievement state" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thaw Note (optional)</label>
          <input
            type="text"
            value={thawNote}
            onChange={(e) => setThawNote(e.target.value)}
            placeholder="Add a note about unfreezing..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={thawAchievement}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Thawing...' : 'Thaw Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievement thawed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

