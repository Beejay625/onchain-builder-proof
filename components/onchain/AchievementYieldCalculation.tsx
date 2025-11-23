'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementYieldCalculationProps {
  achievementId: bigint
}

export default function AchievementYieldCalculation({ achievementId }: AchievementYieldCalculationProps) {
  const { address, isConnected } = useAccount()
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementYieldCalculation')) {
    return null
  }

  const handleCalculateYield = async () => {
    if (!isConnected || !address || !principal.trim() || !rate.trim()) return

    try {
      const yieldAmount = (Number(principal) * Number(rate) / 100).toFixed(2)
      const content = `Yield Calculation\nAchievement: #${achievementId.toString()}\nPrincipal: ${principal}\nRate: ${rate}%\nYield: ${yieldAmount}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Yield calculation failed:', error)
    }
  }

  return (
    <AppCard title="💰 Achievement Yield Calculation" subtitle="Track yield calculation metrics in DeFi protocols" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount</label>
          <input
            type="text"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="1000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Yield Rate (%)</label>
          <input
            type="text"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="5.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {principal && rate && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="Principal" value={principal} accent="blue" />
            <StatBadge label="Yield" value={(Number(principal) * Number(rate) / 100).toFixed(2)} accent="green" />
          </div>
        )}
        <button
          onClick={handleCalculateYield}
          disabled={isPending || isConfirming || !isConnected || !principal.trim() || !rate.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Calculating...' : 'Calculate Yield'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Yield calculated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

