'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainNFTMintingProps {
  achievementId: bigint
}

export default function OnchainNFTMinting({ achievementId }: OnchainNFTMintingProps) {
  const { address } = useAccount()
  const [nftMetadata, setNftMetadata] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mintNFT = async () => {
    if (!address) return
    
    const nftData = `NFT_MINT: Achievement #${achievementId} - ${nftMetadata || 'Achievement NFT'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, nftData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎨 Onchain NFT Minting</h3>
      
      <textarea
        value={nftMetadata}
        onChange={(e) => setNftMetadata(e.target.value)}
        placeholder="NFT metadata (name, description, image URL)..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <button
        onClick={mintNFT}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Minting...' : 'Mint Achievement NFT'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ NFT mint request recorded onchain
        </div>
      )}
    </div>
  )
}

