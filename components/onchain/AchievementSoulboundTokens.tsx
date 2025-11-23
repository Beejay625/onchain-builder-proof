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
  const [tokenMetadata, setTokenMetadata] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementSoulboundTokens')) {
    return null
  }

  const handleMintSoulbound = async () => {
    if (!isConnected || !address || !tokenMetadata.trim()) return

    try {
      const soulboundContent = `SOULBOUND:${tokenMetadata}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, soulboundContent],
      })
    } catch (error) {
      console.error('Soulbound token mint failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Soulbound Tokens" subtitle="Mint non-transferable achievement tokens" accent="violet">
      <div className="space-y-4">
        <div className="rounded-lg bg-violet-50 border border-violet-200 p-3 text-sm text-violet-800">
          ⚠️ Soulbound tokens are permanently bound to your wallet and cannot be transferred
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Metadata</label>
          <textarea
            value={tokenMetadata}
            onChange={(e) => setTokenMetadata(e.target.value)}
            placeholder="Enter token metadata (name, description, attributes)..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleMintSoulbound}
          disabled={isPending || isConfirming || !isConnected || !tokenMetadata.trim()}
          className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint Soulbound Token'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-violet-50 border border-violet-200 p-3 text-sm text-violet-800">
            ✅ Soulbound token minted onchain - permanently bound to your wallet
          </div>
        )}
      </div>
    </AppCard>
  )
}

