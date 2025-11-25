'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementLiquidityBufferProps {
  achievementId: bigint
}

export default function AchievementLiquidityBuffer({ achievementId }: AchievementLiquidityBufferProps) {
  const { address, isConnected } = useAccount()
  const [bufferAmount, setBufferAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [threshold, setThreshold] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementLiquidityBuffer')) {
    return null
  }

  const handleRecordBuffer = async () => {
    if (!isConnected || !address || !bufferAmount.trim() || !tokenAddress.trim()) return

    try {
      const content = `Liquidity Buffer\nAchievement: #${achievementId.toString()}\nAmount: ${bufferAmount}\nToken: ${tokenAddress}\nThreshold: ${threshold || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Liquidity buffer recording failed:', error)
    }
  }

  return (
    <AppCard title="💧 Liquidity Buffer" subtitle="Track liquidity buffer levels and thresholds" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Buffer Amount</label>
          <input
            type="text"
            value={bufferAmount}
            onChange={(e) => setBufferAmount(e.target.value)}
            placeholder="1000000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold (Optional)</label>
          <input
            type="text"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="500000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordBuffer}
          disabled={isPending || isConfirming || !isConnected || !bufferAmount.trim() || !tokenAddress.trim() || !tokenAddress.startsWith('0x')}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Liquidity Buffer'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Liquidity buffer recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

