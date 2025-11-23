'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMultiChainBridgeProps {
  achievementId: bigint
}

export default function AchievementMultiChainBridge({ achievementId }: AchievementMultiChainBridgeProps) {
  const { address, isConnected } = useAccount()
  const [targetChain, setTargetChain] = useState<'ethereum' | 'polygon' | 'arbitrum' | 'optimism'>('ethereum')
  const [bridgeAmount, setBridgeAmount] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementMultiChainBridge')) {
    return null
  }

  const handleBridge = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Multi-Chain Bridge\nAchievement: #${achievementId.toString()}\nTarget Chain: ${targetChain}${bridgeAmount ? `\nAmount: ${bridgeAmount}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Bridge operation failed:', error)
    }
  }

  return (
    <AppCard title="🌉 Achievement Multi-Chain Bridge" subtitle="Bridge achievements across chains" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Chain</label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value as 'ethereum' | 'polygon' | 'arbitrum' | 'optimism')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (optional)</label>
          <input
            type="text"
            value={bridgeAmount}
            onChange={(e) => setBridgeAmount(e.target.value)}
            placeholder="Amount to bridge"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleBridge}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Bridging...' : 'Bridge Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Bridge initiated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

