'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAlertingProps {
  achievementId: bigint
}

export default function OnchainAchievementAlerting({ achievementId }: OnchainAchievementAlertingProps) {
  const { address } = useAccount()
  const [alertMessage, setAlertMessage] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const triggerAlert = () => {
    if (!address || !alertMessage.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `ALERT: ${alertMessage}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🚨 Onchain Alerting</h3>
      <textarea
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
        placeholder="Describe the alert..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      <button
        onClick={triggerAlert}
        disabled={isPending || isConfirming || !alertMessage.trim()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Broadcasting...' : 'Record Alert Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-red-50 border border-red-500 rounded-lg text-sm text-red-700">
          ⚠️ Alert stored permanently onchain
        </div>
      )}
    </div>
  )
}
