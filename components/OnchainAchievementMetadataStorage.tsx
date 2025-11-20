'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMetadataStorageProps {
  achievementId: bigint
}

export default function OnchainAchievementMetadataStorage({ achievementId }: OnchainAchievementMetadataStorageProps) {
  const { address } = useAccount()
  const [metadataJson, setMetadataJson] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const storeMetadata = async () => {
    if (!address || !metadataJson.trim()) return
    
    const metadataData = `METADATA_STORAGE: ${metadataJson}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, metadataData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📦 Metadata Storage</h3>
      
      <textarea
        value={metadataJson}
        onChange={(e) => setMetadataJson(e.target.value)}
        placeholder="JSON metadata"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        rows={5}
      />
      
      <button
        onClick={storeMetadata}
        disabled={isPending || isConfirming || !metadataJson.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Storing...' : 'Store Metadata Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Metadata stored onchain
        </div>
      )}
    </div>
  )
}
