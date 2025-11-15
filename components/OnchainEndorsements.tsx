'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainEndorsementsProps {
  achievementId: bigint
}

export default function OnchainEndorsements({ achievementId }: OnchainEndorsementsProps) {
  const { address } = useAccount()
  const [endorsementText, setEndorsementText] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addEndorsement = async () => {
    if (!address || !endorsementText.trim()) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `ENDORSEMENT: ${endorsementText}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⭐ Onchain Endorsements</h3>
      
      <textarea
        value={endorsementText}
        onChange={(e) => setEndorsementText(e.target.value)}
        placeholder="Endorse this achievement..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={addEndorsement}
        disabled={isPending || isConfirming || !endorsementText.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Processing...' : 'Endorse Achievement'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Endorsement recorded onchain
        </div>
      )}
    </div>
  )
}

