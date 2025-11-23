'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementNFTMetadataProps {
  achievementId: bigint
}

export default function AchievementNFTMetadata({ achievementId }: AchievementNFTMetadataProps) {
  const { address, isConnected } = useAccount()
  const [metadataJson, setMetadataJson] = useState('')
  const [ipfsHash, setIpfsHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementNFTMetadata')) {
    return null
  }

  const handleStoreMetadata = async () => {
    if (!isConnected || !address || !metadataJson.trim()) return

    try {
      const metadataContent = `NFTMETADATA:${ipfsHash || 'ONCHAIN'}:${metadataJson}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, metadataContent],
      })
    } catch (error) {
      console.error('NFT metadata storage failed:', error)
    }
  }

  return (
    <AppCard title="🖼️ NFT Metadata" subtitle="Store rich NFT metadata onchain" accent="fuchsia">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IPFS Hash (Optional)</label>
          <input
            type="text"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            placeholder="Qm..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata JSON</label>
          <textarea
            value={metadataJson}
            onChange={(e) => setMetadataJson(e.target.value)}
            placeholder='{"name": "...", "description": "...", "attributes": [...]}'
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleStoreMetadata}
          disabled={isPending || isConfirming || !isConnected || !metadataJson.trim()}
          className="w-full rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Storing...' : 'Store NFT Metadata'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-fuchsia-50 border border-fuchsia-200 p-3 text-sm text-fuchsia-800">
            ✅ NFT metadata stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

