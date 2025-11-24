'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementFlashSwapsProps {
  achievementId: bigint
}

export default function AchievementFlashSwaps({ achievementId }: AchievementFlashSwapsProps) {
  const { address, isConnected } = useAccount()
  const [tokenBorrowed, setTokenBorrowed] = useState('WETH')
  const [tokenReturned, setTokenReturned] = useState('USDC')
  const [strategy, setStrategy] = useState('triangular-arbitrage')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementFlashSwaps')) {
    return null
  }

  const handleFlashSwap = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Flash Swap\nAchievement: #${achievementId.toString()}\nBorrowed: ${tokenBorrowed}\nReturned: ${tokenReturned}\nStrategy: ${strategy}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Flash swap log failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Flash Swaps" subtitle="Log flash swap routes and settlement data" accent="cyan">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token Borrowed</label>
            <input
              type="text"
              value={tokenBorrowed}
              onChange={(e) => setTokenBorrowed(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token Returned</label>
            <input
              type="text"
              value={tokenReturned}
              onChange={(e) => setTokenReturned(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Strategy</label>
          <input
            type="text"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleFlashSwap}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Flash Swap'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Flash swap recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

