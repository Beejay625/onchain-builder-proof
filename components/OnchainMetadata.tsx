'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainMetadataProps {
  achievementId: bigint
}

export default function OnchainMetadata({ achievementId }: OnchainMetadataProps) {
  const { address } = useAccount()
  const [metadata, setMetadata] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const storeMetadata = async () => {
    if (!address || !metadata.trim()) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `METADATA: ${metadata}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📦 Onchain Metadata Storage</h3>
      
      <textarea
        value={metadata}
        onChange={(e) => setMetadata(e.target.value)}
        placeholder="Store additional metadata (JSON, links, etc.)..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        rows={4}
      />
      
      <button
        onClick={storeMetadata}
        disabled={isPending || isConfirming || !metadata.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Storing...' : 'Store Metadata Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Metadata stored permanently onchain
        </div>
      )}
    </div>
  )
}

