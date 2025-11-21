'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAuditChecklistProps {
  achievementId: bigint
}

export default function OnchainAchievementAuditChecklist({ achievementId }: OnchainAchievementAuditChecklistProps) {
  const { address } = useAccount()
  const [itemsCovered, setItemsCovered] = useState('0/10')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordChecklist = () => {
    if (!address || !itemsCovered.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `AUDIT_CHECKLIST: ${itemsCovered}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📋 Audit Checklist</h3>
      <input
        type="text"
        value={itemsCovered}
        onChange={(e) => setItemsCovered(e.target.value)}
        placeholder="e.g. 8/10 controls"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={recordChecklist}
        disabled={isPending || isConfirming || !itemsCovered.trim()}
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Record Checklist Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-400 rounded-lg text-sm text-gray-700">
          ✓ Checklist progress recorded onchain
        </div>
      )}
    </div>
  )
}
