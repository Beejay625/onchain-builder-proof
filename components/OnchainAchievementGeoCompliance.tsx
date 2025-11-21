'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGeoComplianceProps {
  achievementId: bigint
}

export default function OnchainAchievementGeoCompliance({ achievementId }: OnchainAchievementGeoComplianceProps) {
  const { address } = useAccount()
  const [region, setRegion] = useState('US')
  const [status, setStatus] = useState('compliant')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordGeoStatus = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `GEO_COMPLIANCE: ${region} - ${status}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌍 Geo Compliance</h3>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Region"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="compliant">Compliant</option>
          <option value="restricted">Restricted</option>
          <option value="prohibited">Prohibited</option>
          <option value="pending">Pending Review</option>
        </select>
      </div>
      <button
        onClick={recordGeoStatus}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Geo Status Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-cyan-50 border border-cyan-500 rounded-lg text-sm text-cyan-700">
          ✓ Geo compliance recorded onchain
        </div>
      )}
    </div>
  )
}
