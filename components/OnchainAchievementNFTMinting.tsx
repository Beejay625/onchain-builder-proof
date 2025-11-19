'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNFTMintingProps {
  achievementId: bigint
}

export default function OnchainAchievementNFTMinting({ achievementId }: OnchainAchievementNFTMintingProps) {
  const { address } = useAccount()
  const [nftName, setNftName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [tokenURI, setTokenURI] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mintNFT = async () => {
    if (!address || !nftName.trim()) return
    
    const nftData = `NFT_MINT: ${nftName}${nftDescription ? ` | ${nftDescription}` : ''}${tokenURI ? ` | URI: ${tokenURI}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, nftData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎨 NFT Minting</h3>
      
      <input
        type="text"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
        placeholder="NFT name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={nftDescription}
        onChange={(e) => setNftDescription(e.target.value)}
        placeholder="NFT description (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <input
        type="text"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        placeholder="Token URI (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={mintNFT}
        disabled={isPending || isConfirming || !nftName.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Minting...' : 'Mint NFT Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ NFT minting recorded onchain
        </div>
      )}
    </div>
  )
}
