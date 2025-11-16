'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProofGeneration() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const generateProof = async () => {
    if (!address || !achievementId) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Proof Generated for Achievement: ${achievementId}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Proof Generation</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Achievement ID"
          value={achievementId}
          onChange={(e) => setAchievementId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={generateProof}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Generating...' : 'Generate Proof'}
        </button>
        {isSuccess && <p className="text-green-600">Proof generated onchain!</p>}
      </div>
    </div>
  )
}

