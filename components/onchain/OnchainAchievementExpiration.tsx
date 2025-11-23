'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementExpirationProps {
  achievementId: bigint
}

export default function OnchainAchievementExpiration({ achievementId }: OnchainAchievementExpirationProps) {
  const { address, isConnected } = useAccount()
  const [expirationDate, setExpirationDate] = useState('')
  const [expirationNote, setExpirationNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const setExpiration = async () => {
    if (!isConnected || !address || !expirationDate) return

    try {
      const expirationTimestamp = Math.floor(new Date(expirationDate).getTime() / 1000)
      const expirationData = `EXPIRATION:${expirationTimestamp}:${expirationNote || 'Achievement expires'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, expirationData],
      })
    } catch (error) {
      console.error('Expiration setting failed:', error)
    }
  }

  const isExpired = expirationDate && new Date(expirationDate).getTime() <= Date.now()

  return (
    <AppCard title="⏳ Achievement Expiration" subtitle="Set expiration date for achievement" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date *</label>
          <input
            type="datetime-local"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Note (optional)</label>
          <input
            type="text"
            value={expirationNote}
            onChange={(e) => setExpirationNote(e.target.value)}
            placeholder="Why does this expire?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {isExpired && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-semibold">⚠️ This achievement has expired</p>
          </div>
        )}
        <button
          onClick={setExpiration}
          disabled={isPending || isConfirming || !isConnected || !expirationDate}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Expiration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Expiration set onchain until {new Date(expirationDate).toLocaleString()}
          </div>
        )}
      </div>
    </AppCard>
  )
}

