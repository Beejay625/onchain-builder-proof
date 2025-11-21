'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementChangeManagementProps {
  achievementId: bigint
}

export default function OnchainAchievementChangeManagement({ achievementId }: OnchainAchievementChangeManagementProps) {
  const { address } = useAccount()
  const [changeDescription, setChangeDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logChange = () => {
    if (!address || !changeDescription.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `CHANGE_LOG: ${changeDescription}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Change Management</h3>
      <textarea
        value={changeDescription}
        onChange={(e) => setChangeDescription(e.target.value)}
        placeholder="Describe the change..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      <button
        onClick={logChange}
        disabled={isPending || isConfirming || !changeDescription.trim()}
        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging...' : 'Log Change Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-500 rounded-lg text-sm text-amber-700">
          ✓ Change recorded onchain
        </div>
      )}
    </div>
  )
}
