'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSlippageProtectionProps {
  achievementId: bigint
}

export default function AchievementSlippageProtection({ achievementId }: AchievementSlippageProtectionProps) {
  const { address, isConnected } = useAccount()
  const [slippageTolerance, setSlippageTolerance] = useState('0.5')
  const [protectionType, setProtectionType] = useState<'percentage' | 'absolute' | 'dynamic'>('percentage')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementSlippageProtection')) {
    return null
  }

  const handleSetSlippage = async () => {
    if (!isConnected || !address || !slippageTolerance.trim()) return

    try {
      const content = `Slippage Protection\nAchievement: #${achievementId.toString()}\nType: ${protectionType}\nTolerance: ${slippageTolerance}%`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Slippage protection setup failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ Achievement Slippage Protection" subtitle="Track slippage protection operations in DeFi protocols" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Protection Type</label>
          <select
            value={protectionType}
            onChange={(e) => setProtectionType(e.target.value as 'percentage' | 'absolute' | 'dynamic')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="percentage">Percentage</option>
            <option value="absolute">Absolute</option>
            <option value="dynamic">Dynamic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slippage Tolerance (%)</label>
          <input
            type="text"
            value={slippageTolerance}
            onChange={(e) => setSlippageTolerance(e.target.value)}
            placeholder="0.5"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetSlippage}
          disabled={isPending || isConfirming || !isConnected || !slippageTolerance.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Slippage Protection'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Slippage protection configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

