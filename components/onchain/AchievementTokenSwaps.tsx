'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTokenSwapsProps {
  achievementId: bigint
}

export default function AchievementTokenSwaps({ achievementId }: AchievementTokenSwapsProps) {
  const { address, isConnected } = useAccount()
  const [tokenIn, setTokenIn] = useState('ETH')
  const [tokenOut, setTokenOut] = useState('USDC')
  const [amountIn, setAmountIn] = useState('')
  const [amountOut, setAmountOut] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTokenSwaps')) {
    return null
  }

  const handleRecordSwap = async () => {
    if (!isConnected || !address || !amountIn.trim() || !amountOut.trim()) return

    try {
      const content = `Token Swap\nAchievement: #${achievementId.toString()}\nIn: ${amountIn} ${tokenIn}\nOut: ${amountOut} ${tokenOut}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token swap log failed:', error)
    }
  }

  return (
    <AppCard title="🔁 Token Swaps" subtitle="Log token swap executions with outcome amounts" accent="cyan">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token In</label>
            <input
              type="text"
              value={tokenIn}
              onChange={(e) => setTokenIn(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Token Out</label>
            <input
              type="text"
              value={tokenOut}
              onChange={(e) => setTokenOut(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount In</label>
            <input
              type="text"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount Out</label>
            <input
              type="text"
              value={amountOut}
              onChange={(e) => setAmountOut(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecordSwap}
          disabled={isPending || isConfirming || !isConnected || !amountIn.trim() || !amountOut.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Token Swap'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Token swap recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

