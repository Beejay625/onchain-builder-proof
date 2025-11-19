'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementVestingProps {
  achievementId: bigint
}

export default function OnchainAchievementVesting({ achievementId }: OnchainAchievementVestingProps) {
  const { address } = useAccount()
  const [vestingAmount, setVestingAmount] = useState('')
  const [vestingPeriod, setVestingPeriod] = useState('')
  const [cliffPeriod, setCliffPeriod] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setupVesting = async () => {
    if (!address || !vestingAmount.trim() || !vestingPeriod.trim()) return
    
    const vestingData = `VESTING: ${vestingAmount} tokens | period: ${vestingPeriod} days${cliffPeriod ? ` | cliff: ${cliffPeriod} days` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, vestingData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Vesting Schedule</h3>
      
      <input
        type="number"
        value={vestingAmount}
        onChange={(e) => setVestingAmount(e.target.value)}
        placeholder="Vesting amount"
        step="0.01"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={vestingPeriod}
        onChange={(e) => setVestingPeriod(e.target.value)}
        placeholder="Vesting period (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={cliffPeriod}
        onChange={(e) => setCliffPeriod(e.target.value)}
        placeholder="Cliff period (days, optional)"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={setupVesting}
        disabled={isPending || isConfirming || !vestingAmount.trim() || !vestingPeriod.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting up...' : 'Setup Vesting Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Vesting schedule created onchain
        </div>
      )}
    </div>
  )
}
