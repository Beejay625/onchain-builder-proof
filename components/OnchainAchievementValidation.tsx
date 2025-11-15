'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementValidationProps {
  achievementId: bigint
}

export default function OnchainAchievementValidation({ achievementId }: OnchainAchievementValidationProps) {
  const { address } = useAccount()
  const [verifierAddress, setVerifierAddress] = useState('')
  const [validationStatus, setValidationStatus] = useState('verified')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const validateAchievement = async () => {
    if (!address || !verifierAddress.trim()) return
    
    const validationData = `ACHIEVEMENT_VALIDATION: ${validationStatus} by ${verifierAddress}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, validationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Onchain Achievement Validation</h3>
      
      <input
        type="text"
        value={verifierAddress}
        onChange={(e) => setVerifierAddress(e.target.value)}
        placeholder="Verifier wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <select
        value={validationStatus}
        onChange={(e) => setValidationStatus(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="verified">Verified</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>
      
      <button
        onClick={validateAchievement}
        disabled={isPending || isConfirming || !verifierAddress.trim()}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Validating...' : 'Validate Achievement'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Validation recorded onchain
        </div>
      )}
    </div>
  )
}
