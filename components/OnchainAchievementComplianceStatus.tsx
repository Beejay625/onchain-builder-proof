'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementComplianceStatusProps {
  achievementId: bigint
}

export default function OnchainAchievementComplianceStatus({ achievementId }: OnchainAchievementComplianceStatusProps) {
  const { address } = useAccount()
  const [complianceState, setComplianceState] = useState('compliant')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateCompliance = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `COMPLIANCE_STATUS: ${complianceState}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🛡️ Compliance Status</h3>
      
      <select
        value={complianceState}
        onChange={(e) => setComplianceState(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="compliant">Compliant</option>
        <option value="needs-review">Needs Review</option>
        <option value="non-compliant">Non-Compliant</option>
        <option value="exempt">Exempt</option>
      </select>
      
      <button
        onClick={updateCompliance}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Record Compliance Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Compliance status stored onchain
        </div>
      )}
    </div>
  )
}
