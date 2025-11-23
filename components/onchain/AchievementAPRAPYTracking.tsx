'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementAPRAPYTrackingProps {
  achievementId: bigint
}

export default function AchievementAPRAPYTracking({ achievementId }: AchievementAPRAPYTrackingProps) {
  const { address, isConnected } = useAccount()
  const [apr, setApr] = useState('')
  const [apy, setApy] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementAPRAPYTracking')) {
    return null
  }

  const handleTrackRates = async () => {
    if (!isConnected || !address || !apr.trim() || !apy.trim()) return

    try {
      const content = `APR/APY Tracking\nAchievement: #${achievementId.toString()}\nAPR: ${apr}%\nAPY: ${apy}%`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('APR/APY tracking failed:', error)
    }
  }

  return (
    <AppCard title="📈 Achievement APR/APY Tracking" subtitle="Track APR/APY tracking metrics in DeFi protocols" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">APR (%)</label>
          <input
            type="text"
            value={apr}
            onChange={(e) => setApr(e.target.value)}
            placeholder="5.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">APY (%)</label>
          <input
            type="text"
            value={apy}
            onChange={(e) => setApy(e.target.value)}
            placeholder="5.12"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {apr && apy && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="APR" value={`${apr}%`} accent="blue" />
            <StatBadge label="APY" value={`${apy}%`} accent="green" />
          </div>
        )}
        <button
          onClick={handleTrackRates}
          disabled={isPending || isConfirming || !isConnected || !apr.trim() || !apy.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track APR/APY'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ APR/APY tracked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

