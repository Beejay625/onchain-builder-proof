'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface MetadataStorageProps {
  achievementId: bigint
}

export default function MetadataStorage({ achievementId }: MetadataStorageProps) {
  const { address, isConnected } = useAccount()
  const [metadataUri, setMetadataUri] = useState('')
  const [metadataType, setMetadataType] = useState<'ipfs' | 'arweave' | 'http'>('ipfs')
  const [metadataDescription, setMetadataDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainMetadataStorage')) {
    return null
  }

  const handleStoreMetadata = async () => {
    if (!isConnected || !address || !metadataUri.trim()) return

    try {
      const content = `Metadata Storage\nAchievement: #${achievementId.toString()}\nType: ${metadataType}\nURI: ${metadataUri}${metadataDescription ? `\nDescription: ${metadataDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Metadata storage failed:', error)
    }
  }

  return (
    <AppCard title="📦 Metadata Storage" subtitle="Store rich metadata onchain" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Storage Type</label>
          <select
            value={metadataType}
            onChange={(e) => setMetadataType(e.target.value as 'ipfs' | 'arweave' | 'http')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="ipfs">IPFS</option>
            <option value="arweave">Arweave</option>
            <option value="http">HTTP</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata URI</label>
          <input
            type="text"
            value={metadataUri}
            onChange={(e) => setMetadataUri(e.target.value)}
            placeholder={metadataType === 'ipfs' ? 'ipfs://...' : metadataType === 'arweave' ? 'ar://...' : 'https://...'}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={metadataDescription}
            onChange={(e) => setMetadataDescription(e.target.value)}
            placeholder="What metadata is stored?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleStoreMetadata}
          disabled={isPending || isConfirming || !isConnected || !metadataUri.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Storing...' : 'Store Metadata'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Metadata stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

