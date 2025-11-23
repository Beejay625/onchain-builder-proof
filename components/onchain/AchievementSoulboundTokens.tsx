'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSoulboundTokensProps {
  achievementId: bigint
}

export default function AchievementSoulboundTokens({ achievementId }: AchievementSoulboundTokensProps) {
  const { address, isConnected } = useAccount()
  const [sbtAddress, setSbtAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [isSoulbound, setIsSoulbound] = useState(true)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementSoulboundTokens')) {
    return null
  }

  const handleLinkSBT = async () => {
    if (!isConnected || !address || !sbtAddress.trim() || !tokenId.trim()) return

    try {
      const content = `Soulbound Token\nAchievement: #${achievementId.toString()}\nSBT Address: ${sbtAddress}\nToken ID: ${tokenId}\nSoulbound: ${isSoulbound}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('SBT linking failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Achievement Soulbound Tokens" subtitle="Link soulbound tokens to achievements" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SBT Contract Address</label>
          <input
            type="text"
            value={sbtAddress}
            onChange={(e) => setSbtAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token ID</label>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Token ID"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isSoulbound"
            checked={isSoulbound}
            onChange={(e) => setIsSoulbound(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="isSoulbound" className="ml-2 text-sm text-gray-700">
            Soulbound (non-transferable)
          </label>
        </div>
        <button
          onClick={handleLinkSBT}
          disabled={isPending || isConfirming || !isConnected || !sbtAddress.trim() || !tokenId.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Soulbound Token'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Soulbound token linked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
