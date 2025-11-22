'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCarbonFootprintProps {
  achievementId: bigint
}

export default function AchievementCarbonFootprint({ achievementId }: AchievementCarbonFootprintProps) {
  const { address, isConnected } = useAccount()
  const [carbonAmount, setCarbonAmount] = useState('')
  const [offsetAmount, setOffsetAmount] = useState('')
  const [offsetProvider, setOffsetProvider] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementCarbonFootprint')) {
    return null
  }

  const handleRecordCarbon = async () => {
    if (!isConnected || !address || !carbonAmount.trim()) return

    try {
      const carbonContent = `CARBON:${carbonAmount}:OFFSET${offsetAmount || '0'}:${offsetProvider || 'N/A'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, carbonContent],
      })
    } catch (error) {
      console.error('Carbon footprint recording failed:', error)
    }
  }

  return (
    <AppCard title="🌱 Carbon Footprint" subtitle="Record environmental impact and offsets" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Carbon Emissions (kg CO2e)</label>
          <input
            type="number"
            value={carbonAmount}
            onChange={(e) => setCarbonAmount(e.target.value)}
            placeholder="e.g., 100"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Offset Amount (kg CO2e)</label>
          <input
            type="number"
            value={offsetAmount}
            onChange={(e) => setOffsetAmount(e.target.value)}
            placeholder="e.g., 100"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Offset Provider (Optional)</label>
          <input
            type="text"
            value={offsetProvider}
            onChange={(e) => setOffsetProvider(e.target.value)}
            placeholder="e.g., Verra, Gold Standard"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordCarbon}
          disabled={isPending || isConfirming || !isConnected || !carbonAmount.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Carbon Footprint'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Carbon footprint recorded onchain: {carbonAmount} kg CO2e {offsetAmount ? `(offset: ${offsetAmount} kg)` : ''}
          </div>
        )}
      </div>
    </AppCard>
  )
}

