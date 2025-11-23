'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementERC20MetadataProps {
  achievementId: bigint
}

export default function AchievementERC20Metadata({ achievementId }: AchievementERC20MetadataProps) {
  const { address, isConnected } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('')
  const [metadataType, setMetadataType] = useState<'name' | 'symbol' | 'decimals' | 'totalSupply'>('name')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementERC20Metadata')) {
    return null
  }

  const handleTrackMetadata = async () => {
    if (!isConnected || !address || !tokenAddress.trim() || !tokenAddress.startsWith('0x')) return

    try {
      const content = `ERC20 Metadata\nAchievement: #${achievementId.toString()}\nToken: ${tokenAddress}\nType: ${metadataType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('ERC20 metadata tracking failed:', error)
    }
  }

  return (
    <AppCard title="💰 Achievement ERC20 Metadata" subtitle="Track ERC20 metadata operations in DeFi protocols" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata Type</label>
          <select
            value={metadataType}
            onChange={(e) => setMetadataType(e.target.value as 'name' | 'symbol' | 'decimals' | 'totalSupply')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="name">Name</option>
            <option value="symbol">Symbol</option>
            <option value="decimals">Decimals</option>
            <option value="totalSupply">Total Supply</option>
          </select>
        </div>
        <button
          onClick={handleTrackMetadata}
          disabled={isPending || isConfirming || !isConnected || !tokenAddress.trim() || !tokenAddress.startsWith('0x')}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track ERC20 Metadata'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ ERC20 metadata tracked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

