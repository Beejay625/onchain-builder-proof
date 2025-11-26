'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMultiplierProps {
  achievementId: bigint
}

export default function OnchainAchievementMultiplier({ achievementId }: OnchainAchievementMultiplierProps) {
  const { address } = useAccount()
  const [multiplier, setMultiplier] = useState('1.0')
  const [multiplierType, setMultiplierType] = useState('reward')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setMultiplierValue = async () => {
    if (!address || !multiplier.trim()) return
    
    const multiplierData = `MULTIPLIER:type:${multiplierType}:value:${multiplier.trim()}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, multiplierData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✨ Achievement Multiplier</h3>
      
      <select
        value={multiplierType}
        onChange={(e) => setMultiplierType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="reward">Reward</option>
        <option value="reputation">Reputation</option>
        <option value="experience">Experience</option>
        <option value="bonus">Bonus</option>
      </select>
      
      <input
        type="number"
        step="0.1"
        value={multiplier}
        onChange={(e) => setMultiplier(e.target.value)}
        placeholder="Multiplier value (e.g., 1.5 for 150%)"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={setMultiplierValue}
        disabled={isPending || isConfirming || !multiplier.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Multiplier Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Multiplier set onchain
        </div>
      )}
    </div>
  )
}





