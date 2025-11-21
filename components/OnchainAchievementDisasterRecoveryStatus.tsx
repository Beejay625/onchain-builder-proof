'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDisasterRecoveryStatusProps {
  achievementId: bigint
}

export default function OnchainAchievementDisasterRecoveryStatus({ achievementId }: OnchainAchievementDisasterRecoveryStatusProps) {
  const { address } = useAccount()
  const [status, setStatus] = useState('ready')
  const [lastTest, setLastTest] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateStatus = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `DR_STATUS: ${status}${lastTest ? ` | tested:${lastTest}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌀 Disaster Recovery</h3>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      >
        <option value="ready">Ready</option>
        <option value="in-progress">In Progress</option>
        <option value="failed">Failed</option>
      </select>
      <input
        type="date"
        value={lastTest}
        onChange={(e) => setLastTest(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={updateStatus}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record DR Status Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-500 rounded-lg text-sm text-blue-700">
          ✓ Disaster recovery status recorded onchain
        </div>
      )}
    </div>
  )
}
