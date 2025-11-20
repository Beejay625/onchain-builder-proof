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
  const [validatorAddress, setValidatorAddress] = useState('')
  const [validationResult, setValidationResult] = useState('approved')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const validateAchievement = async () => {
    if (!address || !validatorAddress.trim()) return
    
    const validationData = `VALIDATION: ${validatorAddress} | result: ${validationResult}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, validationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Achievement Validation</h3>
      
      <input
        type="text"
        value={validatorAddress}
        onChange={(e) => setValidatorAddress(e.target.value)}
        placeholder="Validator wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <select
        value={validationResult}
        onChange={(e) => setValidationResult(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="pending">Pending</option>
      </select>
      
      <button
        onClick={validateAchievement}
        disabled={isPending || isConfirming || !validatorAddress.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Validating...' : 'Validate Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Validation recorded onchain
        </div>
      )}
    </div>
  )
}
