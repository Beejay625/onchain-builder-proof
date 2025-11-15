'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementNFTMintProps {
  achievementId: bigint
}

export default function AchievementNFTMint({ achievementId }: AchievementNFTMintProps) {
  const [metadataURI, setMetadataURI] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintNFT = async () => {
    if (!metadataURI.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'mintAchievementNFT',
        args: [achievementId, metadataURI],
      })
    } catch (error) {
      console.error('NFT minting error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎨 Mint Achievement NFT</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Metadata URI</label>
          <input
            type="url"
            value={metadataURI}
            onChange={(e) => setMetadataURI(e.target.value)}
            placeholder="ipfs://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={mintNFT}
          disabled={isPending}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending ? 'Minting...' : 'Mint NFT'}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ NFT minted successfully
          </div>
        )}
      </div>
    </div>
  )
}
