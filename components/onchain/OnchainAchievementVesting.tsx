'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementVestingProps {
  achievementId: bigint
}

export default function OnchainAchievementVesting({ achievementId }: OnchainAchievementVestingProps) {
  const { address, isConnected } = useAccount()
  const [vestingAmount, setVestingAmount] = useState('')
  const [vestingDuration, setVestingDuration] = useState(365)
  const [vestingStart, setVestingStart] = useState('')
  const [vestingCliff, setVestingCliff] = useState(0)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const setupVesting = async () => {
    if (!isConnected || !address || !vestingAmount.trim()) return

    try {
      const startTimestamp = vestingStart ? Math.floor(new Date(vestingStart).getTime() / 1000) : Math.floor(Date.now() / 1000)
      const vestingData = `VESTING:amount:${vestingAmount}:duration:${vestingDuration}:start:${startTimestamp}:cliff:${vestingCliff}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, vestingData],
      })
    } catch (error) {
      console.error('Vesting setup failed:', error)
    }
  }

  return (
    <AppCard title="📊 Achievement Vesting" subtitle="Setup vesting schedule for tokens" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vesting Amount *</label>
          <input
            type="text"
            value={vestingAmount}
            onChange={(e) => setVestingAmount(e.target.value)}
            placeholder="e.g., 1000 tokens"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vesting Duration (days)</label>
          <input
            type="number"
            min="1"
            value={vestingDuration}
            onChange={(e) => setVestingDuration(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vesting Start (optional)</label>
          <input
            type="datetime-local"
            value={vestingStart}
            onChange={(e) => setVestingStart(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cliff Period (days)</label>
          <input
            type="number"
            min="0"
            value={vestingCliff}
            onChange={(e) => setVestingCliff(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={setupVesting}
          disabled={isPending || isConfirming || !isConnected || !vestingAmount.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Vesting'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Vesting schedule recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

