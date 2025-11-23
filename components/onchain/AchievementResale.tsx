'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementResaleProps {
  achievementId: bigint
}

export default function AchievementResale({ achievementId }: AchievementResaleProps) {
  const { address, isConnected } = useAccount()
  const [resalePrice, setResalePrice] = useState('0.1')
  const [resaleDescription, setResaleDescription] = useState('')
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainResale')) {
    return null
  }

  const handleListResale = async () => {
    if (!isConnected || !address || !resalePrice) return

    try {
      const content = `Achievement Resale Listing\nAchievement: #${achievementId.toString()}\nPrice: ${resalePrice} ETH${resaleDescription ? `\nDescription: ${resaleDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Resale listing failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Achievement Resale" subtitle="List achievements for resale marketplace" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resale Price (ETH)</label>
          <input
            type="number"
            value={resalePrice}
            onChange={(e) => setResalePrice(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={resaleDescription}
            onChange={(e) => setResaleDescription(e.target.value)}
            placeholder="Why are you reselling?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleListResale}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Listing...' : `List for ${resalePrice} ETH`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Resale listing created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

