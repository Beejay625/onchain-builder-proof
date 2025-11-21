'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDataRetentionProps {
  achievementId: bigint
}

export default function OnchainAchievementDataRetention({ achievementId }: OnchainAchievementDataRetentionProps) {
  const { address } = useAccount()
  const [retentionPeriod, setRetentionPeriod] = useState('90 days')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setRetention = () => {
    if (!address || !retentionPeriod.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `DATA_RETENTION: ${retentionPeriod}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🗄️ Data Retention</h3>
      <input
        type="text"
        value={retentionPeriod}
        onChange={(e) => setRetentionPeriod(e.target.value)}
        placeholder="Retention period"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={setRetention}
        disabled={isPending || isConfirming || !retentionPeriod.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Saving...' : 'Save Retention Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-teal-50 border border-teal-500 rounded-lg text-sm text-teal-700">
          ✓ Retention policy stored onchain
        </div>
      )}
    </div>
  )
}
