'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface NFTMintingProps {
  achievementId: bigint
  achievementContent: string
}

export default function NFTMinting({ achievementId, achievementContent }: NFTMintingProps) {
  const { address, isConnected } = useAccount()
  const [nftName, setNftName] = useState(`Achievement #${achievementId.toString()}`)
  const [nftDescription, setNftDescription] = useState(achievementContent)
  const [metadataUri, setMetadataUri] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainNFTMinting')) {
    return null
  }

  const handleMintNFT = async () => {
    if (!isConnected || !address) return

    try {
      const content = `NFT Mint: ${nftName}\nDescription: ${nftDescription}${metadataUri ? `\nMetadata URI: ${metadataUri}` : ''}\nFrom Achievement: #${achievementId.toString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('NFT minting failed:', error)
    }
  }

  return (
    <AppCard title="🎨 Mint Achievement NFT" subtitle="Convert achievement to NFT with metadata" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NFT Name</label>
          <input
            type="text"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={nftDescription}
            onChange={(e) => setNftDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata URI (optional)</label>
          <input
            type="text"
            value={metadataUri}
            onChange={(e) => setMetadataUri(e.target.value)}
            placeholder="ipfs://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleMintNFT}
          disabled={isPending || isConfirming || !isConnected || !nftName.trim()}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint NFT'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ NFT mint request recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





