'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementStopLossOrdersProps {
  achievementId: bigint
}

export default function AchievementStopLossOrders({ achievementId }: AchievementStopLossOrdersProps) {
  const { address, isConnected } = useAccount()
  const [tokenPair, setTokenPair] = useState('ETH/USDC')
  const [triggerPrice, setTriggerPrice] = useState('1800')
  const [size, setSize] = useState('1')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementStopLossOrders')) {
    return null
  }

  const handleRecordOrder = async () => {
    if (!isConnected || !address || !triggerPrice.trim()) return

    try {
      const content = `Stop Loss Order\nAchievement: #${achievementId.toString()}\nPair: ${tokenPair}\nTrigger: ${triggerPrice}\nSize: ${size}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Stop loss order log failed:', error)
    }
  }

  return (
    <AppCard title="🛑 Stop Loss Orders" subtitle="Document stop loss automation for DeFi positions" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Pair</label>
          <input
            type="text"
            value={tokenPair}
            onChange={(e) => setTokenPair(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Price</label>
            <input
              type="text"
              value={triggerPrice}
              onChange={(e) => setTriggerPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Size</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecordOrder}
          disabled={isPending || isConfirming || !isConnected || !triggerPrice.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Stop Loss'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Stop loss order recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

