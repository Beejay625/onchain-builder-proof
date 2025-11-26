'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementWatermarkingProps {
  achievementId: bigint
}

export default function OnchainAchievementWatermarking({ achievementId }: OnchainAchievementWatermarkingProps) {
  const { address } = useAccount()
  const [watermarkHash, setWatermarkHash] = useState('')
  const [watermarkType, setWatermarkType] = useState('ownership')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addWatermark = async () => {
    if (!address || !watermarkHash.trim()) return
    
    const watermarkData = `WATERMARK:${watermarkType}:${watermarkHash.trim()}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, watermarkData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💧 Achievement Watermarking</h3>
      
      <select
        value={watermarkType}
        onChange={(e) => setWatermarkType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="ownership">Ownership</option>
        <option value="authenticity">Authenticity</option>
        <option value="integrity">Integrity</option>
        <option value="timestamp">Timestamp</option>
      </select>
      
      <input
        type="text"
        value={watermarkHash}
        onChange={(e) => setWatermarkHash(e.target.value)}
        placeholder="Watermark hash (IPFS CID or hash)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={addWatermark}
        disabled={isPending || isConfirming || !watermarkHash.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Watermarking...' : 'Add Watermark Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Watermark added onchain
        </div>
      )}
    </div>
  )
}





