'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainForkingProps {
  achievementId: bigint
}

export default function OnchainForking({ achievementId }: OnchainForkingProps) {
  const { address } = useAccount()
  const [forkDescription, setForkDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const forkAchievement = async () => {
    if (!address || !forkDescription.trim()) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`FORK of #${achievementId}: ${forkDescription}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🍴 Onchain Forking</h3>
      
      <textarea
        value={forkDescription}
        onChange={(e) => setForkDescription(e.target.value)}
        placeholder="Describe your fork of this achievement..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={forkAchievement}
        disabled={isPending || isConfirming || !forkDescription.trim()}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Forking...' : 'Fork Achievement'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Fork created onchain
        </div>
      )}
    </div>
  )
}

