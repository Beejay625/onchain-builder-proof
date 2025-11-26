'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReachProps {
  achievementId: bigint
}

export default function OnchainAchievementReach({ achievementId }: OnchainAchievementReachProps) {
  const { address } = useAccount()
  const [reachCount, setReachCount] = useState('')
  const [reachSource, setReachSource] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateReach = async () => {
    if (!address || !reachCount.trim()) return
    
    const reachData = `REACH:count:${reachCount.trim()}:source:${reachSource.trim() || 'unknown'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, reachData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📡 Achievement Reach</h3>
      
      <input
        type="number"
        value={reachCount}
        onChange={(e) => setReachCount(e.target.value)}
        placeholder="Reach count"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={reachSource}
        onChange={(e) => setReachSource(e.target.value)}
        placeholder="Reach source (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={updateReach}
        disabled={isPending || isConfirming || !reachCount.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Reach Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Reach updated onchain
        </div>
      )}
    </div>
  )
}





