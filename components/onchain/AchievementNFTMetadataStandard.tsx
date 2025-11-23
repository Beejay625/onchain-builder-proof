'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementNFTMetadataStandardProps {
  achievementId: bigint
}

export default function AchievementNFTMetadataStandard({ achievementId }: AchievementNFTMetadataStandardProps) {
  const { address, isConnected } = useAccount()
  const [metadataURI, setMetadataURI] = useState('')
  const [standard, setStandard] = useState<'erc721' | 'erc1155' | 'custom'>('erc721')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementNFTMetadataStandard')) {
    return null
  }

  const handleSetMetadata = async () => {
    if (!isConnected || !address || !metadataURI.trim()) return

    try {
      const content = `NFT Metadata Standard\nAchievement: #${achievementId.toString()}\nStandard: ${standard}\nURI: ${metadataURI}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Metadata update failed:', error)
    }
  }

  return (
    <AppCard title="📝 Achievement NFT Metadata Standard" subtitle="Record NFT metadata URI and standard compliance" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Standard</label>
          <select
            value={standard}
            onChange={(e) => setStandard(e.target.value as 'erc721' | 'erc1155' | 'custom')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="erc721">ERC-721</option>
            <option value="erc1155">ERC-1155</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata URI</label>
          <input
            type="text"
            value={metadataURI}
            onChange={(e) => setMetadataURI(e.target.value)}
            placeholder="ipfs://... or https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetMetadata}
          disabled={isPending || isConfirming || !isConnected || !metadataURI.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set NFT Metadata'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ NFT metadata set onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

