'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCoSigningProps {
  achievementId: bigint
}

export default function OnchainAchievementCoSigning({ achievementId }: OnchainAchievementCoSigningProps) {
  const { address } = useAccount()
  const [coSignerAddress, setCoSignerAddress] = useState('')
  const [signature, setSignature] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const requestCoSign = async () => {
    if (!address || !coSignerAddress.trim()) return
    
    const coSignData = `COSIGN:${coSignerAddress.trim()}:${signature.trim() || 'pending'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, coSignData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✍️ Co-Signing</h3>
      
      <input
        type="text"
        value={coSignerAddress}
        onChange={(e) => setCoSignerAddress(e.target.value)}
        placeholder="Co-signer wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        placeholder="Signature (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={requestCoSign}
        disabled={isPending || isConfirming || !coSignerAddress.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Requesting...' : 'Request Co-Sign Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Co-sign request recorded onchain
        </div>
      )}
    </div>
  )
}


