'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProgressiveUnlocksProps {
  achievementId: bigint
}

export default function OnchainAchievementProgressiveUnlocks({ achievementId }: OnchainAchievementProgressiveUnlocksProps) {
  const { address } = useAccount()
  const [unlockStage, setUnlockStage] = useState('')
  const [unlockCondition, setUnlockCondition] = useState('')
  const [unlockReward, setUnlockReward] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addProgressiveUnlock = async () => {
    if (!address || !unlockStage.trim() || !unlockCondition.trim()) return
    
    const unlockData = `PROGRESSIVE_UNLOCK:stage:${unlockStage.trim()}:condition:${unlockCondition.trim()}:reward:${unlockReward.trim() || 'none'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, unlockData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔓 Progressive Unlocks</h3>
      
      <input
        type="text"
        value={unlockStage}
        onChange={(e) => setUnlockStage(e.target.value)}
        placeholder="Unlock stage (e.g., stage-1)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={unlockCondition}
        onChange={(e) => setUnlockCondition(e.target.value)}
        placeholder="Unlock condition"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={unlockReward}
        onChange={(e) => setUnlockReward(e.target.value)}
        placeholder="Unlock reward (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={addProgressiveUnlock}
        disabled={isPending || isConfirming || !unlockStage.trim() || !unlockCondition.trim()}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add Progressive Unlock Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Progressive unlock added onchain
        </div>
      )}
    </div>
  )
}
