'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementValidationSystem() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  const [validatorAddress, setValidatorAddress] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const validateAchievement = async () => {
    if (!address || !achievementId || !validatorAddress) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Achievement Validated: ${achievementId} by ${validatorAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Validation System</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Achievement ID"
          value={achievementId}
          onChange={(e) => setAchievementId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Validator address"
          value={validatorAddress}
          onChange={(e) => setValidatorAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={validateAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Validating...' : 'Validate Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement validated onchain!</p>}
      </div>
    </div>
  )
}

