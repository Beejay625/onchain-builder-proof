'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCompoundInterestProps {
  achievementId: bigint
}

export default function AchievementCompoundInterest({ achievementId }: AchievementCompoundInterestProps) {
  const { address, isConnected } = useAccount()
  const [principalAmount, setPrincipalAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [compoundFrequency, setCompoundFrequency] = useState('daily')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementCompoundInterest')) {
    return null
  }

  const handleSetupCompound = async () => {
    if (!isConnected || !address || !principalAmount.trim() || !interestRate.trim()) return

    try {
      const compoundContent = `COMPOUND:${principalAmount}:${interestRate}:${compoundFrequency}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, compoundContent],
      })
    } catch (error) {
      console.error('Compound interest setup failed:', error)
    }
  }

  return (
    <AppCard title="💹 Compound Interest" subtitle="Compound rewards over time automatically" accent="emerald">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount (ETH)</label>
          <input
            type="number"
            value={principalAmount}
            onChange={(e) => setPrincipalAmount(e.target.value)}
            placeholder="e.g., 1.0"
            step="0.001"
            min="0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="e.g., 5.0"
            step="0.1"
            min="0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compound Frequency</label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button
          onClick={handleSetupCompound}
          disabled={isPending || isConfirming || !isConnected || !principalAmount.trim() || !interestRate.trim()}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Compound Interest'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
            ✅ Compound interest configured: {interestRate}% {compoundFrequency} on {principalAmount} ETH
          </div>
        )}
      </div>
    </AppCard>
  )
}

