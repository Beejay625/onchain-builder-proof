'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBuilderEndorsementsProps {
  achievementId: bigint
}

export default function OnchainAchievementBuilderEndorsements({ achievementId }: OnchainAchievementBuilderEndorsementsProps) {
  const { address } = useAccount()
  const [endorserAddress, setEndorserAddress] = useState('')
  const [endorsementText, setEndorsementText] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createEndorsement = async () => {
    if (!address || !endorserAddress.trim()) return
    
    const endorsementData = `BUILDER_ENDORSEMENT: ${endorserAddress}${endorsementText ? ` | ${endorsementText}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, endorsementData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">👍 Builder Endorsements</h3>
      
      <input
        type="text"
        value={endorserAddress}
        onChange={(e) => setEndorserAddress(e.target.value)}
        placeholder="Endorser wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <textarea
        value={endorsementText}
        onChange={(e) => setEndorsementText(e.target.value)}
        placeholder="Endorsement message (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={createEndorsement}
        disabled={isPending || isConfirming || !endorserAddress.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Endorsing...' : 'Create Endorsement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Endorsement created onchain
        </div>
      )}
    </div>
  )
}
