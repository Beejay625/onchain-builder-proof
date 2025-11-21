'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBreachNotificationProps {
  achievementId: bigint
}

export default function OnchainAchievementBreachNotification({ achievementId }: OnchainAchievementBreachNotificationProps) {
  const { address } = useAccount()
  const [notifiedDate, setNotifiedDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logNotification = () => {
    if (!address || !notifiedDate.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `BREACH_NOTIFICATION: ${notifiedDate}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📢 Breach Notification</h3>
      <input
        type="date"
        value={notifiedDate}
        onChange={(e) => setNotifiedDate(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={logNotification}
        disabled={isPending || isConfirming || !notifiedDate}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging...' : 'Log Notification Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-red-50 border border-red-500 rounded-lg text-sm text-red-700">
          ✓ Breach notice recorded onchain
        </div>
      )}
    </div>
  )
}
