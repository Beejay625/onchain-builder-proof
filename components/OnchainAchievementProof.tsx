'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProof() {
  const { address } = useAccount()
  const [proofHash, setProofHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const generateProof = async () => {
    if (!address || !proofHash) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`PROOF: ${proofHash}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Achievement Proof</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Proof hash"
          value={proofHash}
          onChange={(e) => setProofHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={generateProof}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Generating...' : 'Generate Proof'}
        </button>
        {isSuccess && <p className="text-green-600">Proof generated onchain!</p>}
      </div>
    </div>
  )
}

