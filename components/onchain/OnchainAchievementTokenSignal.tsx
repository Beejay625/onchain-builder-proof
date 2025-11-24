'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTokenSignalProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenSignal({ achievementId }: OnchainAchievementTokenSignalProps) {
  const { address, isConnected } = useAccount()
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenSignal, setTokenSignal] = useState('')
  const [tokenNote, setTokenNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !tokenSymbol.trim() || !tokenSignal.trim()) return

    try {
      const payload = `TOKEN_SIGNAL:token:${tokenSymbol}:signal:${tokenSignal}:note:${tokenNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🪙 Token Signal submission failed:', error)
    }
  }

  return (
    <AppCard title="🪙 Token Signal" subtitle="Describe token impact or economics" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token *</label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            placeholder="BUILDER"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Signal *</label>
          <input
            type="text"
            value={tokenSignal}
            onChange={(e) => setTokenSignal(e.target.value)}
            placeholder="+20% staking"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={tokenNote}
            onChange={(e) => setTokenNote(e.target.value)}
            placeholder="Model assumptions"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !tokenSymbol.trim() || !tokenSignal.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing Token Signal' : 'Publish Token Signal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Token signal posted
          </div>
        )}
      </div>
    </AppCard>
  )
}
