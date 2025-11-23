'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementIPFSStorageProps {
  achievementId: bigint
}

export default function AchievementIPFSStorage({ achievementId }: AchievementIPFSStorageProps) {
  const { address, isConnected } = useAccount()
  const [ipfsHash, setIpfsHash] = useState('')
  const [storageType, setStorageType] = useState<'content' | 'image' | 'video' | 'document'>('content')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementIPFSStorage')) {
    return null
  }

  const handleStoreIPFS = async () => {
    if (!isConnected || !address || !ipfsHash.trim()) return

    try {
      const content = `IPFS Storage\nAchievement: #${achievementId.toString()}\nType: ${storageType}\nHash: ${ipfsHash}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('IPFS storage failed:', error)
    }
  }

  return (
    <AppCard title="🌐 Achievement IPFS Storage" subtitle="Store achievement data on IPFS" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Storage Type</label>
          <select
            value={storageType}
            onChange={(e) => setStorageType(e.target.value as 'content' | 'image' | 'video' | 'document')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="content">Content</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IPFS Hash</label>
          <input
            type="text"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            placeholder="Qm..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleStoreIPFS}
          disabled={isPending || isConfirming || !isConnected || !ipfsHash.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Storing...' : 'Store on IPFS'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ IPFS hash recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

