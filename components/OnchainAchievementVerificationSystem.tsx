'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementVerificationSystem() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  const [verificationProof, setVerificationProof] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifyAchievement = async () => {
    if (!address || !achievementId || !verificationProof) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Achievement Verified: ${achievementId} - Proof: ${verificationProof}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✓ Verification System</h2>
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
          placeholder="Verification proof"
          value={verificationProof}
          onChange={(e) => setVerificationProof(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={verifyAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement verified onchain!</p>}
      </div>
    </div>
  )
}

