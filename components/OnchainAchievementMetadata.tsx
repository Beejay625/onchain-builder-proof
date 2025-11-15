'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMetadataProps {
  achievementId: bigint
}

export default function OnchainAchievementMetadata({ achievementId }: OnchainAchievementMetadataProps) {
  const { address } = useAccount()
  const [metadataJson, setMetadataJson] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addMetadata = async () => {
    if (!address || !metadataJson.trim()) return
    
    try {
      JSON.parse(metadataJson)
      const metadataData = `ACHIEVEMENT_METADATA: ${metadataJson}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, metadataData],
      })
    } catch (e) {
      alert('Invalid JSON format')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📋 Onchain Achievement Metadata</h3>
      
      <textarea
        value={metadataJson}
        onChange={(e) => setMetadataJson(e.target.value)}
        placeholder='{"tags": ["web3", "defi"], "links": ["https://..."], "images": ["https://..."]}'
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        rows={6}
      />
      
      <button
        onClick={addMetadata}
        disabled={isPending || isConfirming || !metadataJson.trim()}
        className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add Rich Metadata'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Metadata added onchain
        </div>
      )}
    </div>
  )
}
