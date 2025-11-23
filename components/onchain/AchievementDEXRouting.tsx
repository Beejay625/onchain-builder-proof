'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDEXRoutingProps {
  achievementId: bigint
}

export default function AchievementDEXRouting({ achievementId }: AchievementDEXRoutingProps) {
  const { address, isConnected } = useAccount()
  const [tokenIn, setTokenIn] = useState('')
  const [tokenOut, setTokenOut] = useState('')
  const [amount, setAmount] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementDEXRouting')) {
    return null
  }

  const handleRoute = async () => {
    if (!isConnected || !address || !tokenIn.trim() || !tokenOut.trim() || !amount.trim()) return

    try {
      const content = `DEX Routing\nAchievement: #${achievementId.toString()}\nToken In: ${tokenIn}\nToken Out: ${tokenOut}\nAmount: ${amount}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('DEX routing failed:', error)
    }
  }

  return (
    <AppCard title="🛣️ Achievement DEX Routing" subtitle="Track DEX routing operations in DeFi protocols" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token In</label>
          <input
            type="text"
            value={tokenIn}
            onChange={(e) => setTokenIn(e.target.value)}
            placeholder="0x... or symbol"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Out</label>
          <input
            type="text"
            value={tokenOut}
            onChange={(e) => setTokenOut(e.target.value)}
            placeholder="0x... or symbol"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRoute}
          disabled={isPending || isConfirming || !isConnected || !tokenIn.trim() || !tokenOut.trim() || !amount.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Routing...' : 'Calculate Route'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ DEX route calculated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

