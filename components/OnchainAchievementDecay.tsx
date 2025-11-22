'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDecayProps {
  achievementId: bigint
}

export default function OnchainAchievementDecay({ achievementId }: OnchainAchievementDecayProps) {
  const { address } = useAccount()
  const [decayRate, setDecayRate] = useState('0.01')
  const [decayPeriod, setDecayPeriod] = useState('30')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const configureDecay = async () => {
    if (!address) return
    
    const decayData = `DECAY:rate:${decayRate}:period:${decayPeriod}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, decayData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📉 Achievement Decay</h3>
      
      <input
        type="number"
        step="0.001"
        value={decayRate}
        onChange={(e) => setDecayRate(e.target.value)}
        placeholder="Decay rate (e.g., 0.01 for 1%)"
        min="0"
        max="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={decayPeriod}
        onChange={(e) => setDecayPeriod(e.target.value)}
        placeholder="Decay period (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={configureDecay}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Configuring...' : 'Configure Decay Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Decay configured onchain
        </div>
      )}
    </div>
  )
}


