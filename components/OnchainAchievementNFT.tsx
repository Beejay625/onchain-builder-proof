'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNFTProps {
  achievementId: bigint
}

export default function OnchainAchievementNFT({ achievementId }: OnchainAchievementNFTProps) {
  const { address } = useAccount()
  const [nftName, setNftName] = useState('')
  const [nftImageUrl, setNftImageUrl] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mintAchievementNFT = async () => {
    if (!address || !nftName.trim()) return
    
    const nftData = `ACHIEVEMENT_NFT: ${nftName}${nftImageUrl ? ` - Image: ${nftImageUrl}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, nftData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🖼️ Onchain Achievement NFT</h3>
      
      <input
        type="text"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
        placeholder="NFT name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="url"
        value={nftImageUrl}
        onChange={(e) => setNftImageUrl(e.target.value)}
        placeholder="NFT image URL (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={mintAchievementNFT}
        disabled={isPending || isConfirming || !nftName.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Minting...' : 'Mint Achievement NFT'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement NFT mint request recorded
        </div>
      )}
    </div>
  )
}
