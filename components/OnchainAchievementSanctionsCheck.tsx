'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSanctionsCheckProps {
  achievementId: bigint
}

export default function OnchainAchievementSanctionsCheck({ achievementId }: OnchainAchievementSanctionsCheckProps) {
  const { address } = useAccount()
  const [result, setResult] = useState('cleared')
  const [referenceId, setReferenceId] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordCheck = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `SANCTIONS_CHECK: ${result}${referenceId ? ` | ref:${referenceId}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🛂 Sanctions Check</h3>
      <div className="grid grid-cols-1 gap-3 mb-4">
        <select
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="cleared">Cleared</option>
          <option value="flagged">Flagged</option>
          <option value="pending">Pending</option>
        </select>
        <input
          type="text"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
          placeholder="Provider reference ID"
          className="p-3 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        onClick={recordCheck}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Sanctions Check'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-slate-50 border border-slate-400 rounded-lg text-sm text-slate-700">
          ✓ Sanctions record stored onchain
        </div>
      )}
    </div>
  )
}
