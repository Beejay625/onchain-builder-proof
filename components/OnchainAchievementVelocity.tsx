'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementVelocityProps {
  achievementId: bigint
}

export default function OnchainAchievementVelocity({ achievementId }: OnchainAchievementVelocityProps) {
  const { address } = useAccount()
  const [velocity, setVelocity] = useState('')
  const [velocityMetric, setVelocityMetric] = useState('completion-rate')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateVelocity = async () => {
    if (!address || !velocity.trim()) return
    
    const velocityData = `VELOCITY:metric:${velocityMetric}:value:${velocity.trim()}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, velocityData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚡ Achievement Velocity</h3>
      
      <select
        value={velocityMetric}
        onChange={(e) => setVelocityMetric(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="completion-rate">Completion Rate</option>
        <option value="progress-speed">Progress Speed</option>
        <option value="adoption-rate">Adoption Rate</option>
        <option value="growth-rate">Growth Rate</option>
      </select>
      
      <input
        type="number"
        step="0.01"
        value={velocity}
        onChange={(e) => setVelocity(e.target.value)}
        placeholder="Velocity value"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={updateVelocity}
        disabled={isPending || isConfirming || !velocity.trim()}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Velocity Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Velocity updated onchain
        </div>
      )}
    </div>
  )
}
