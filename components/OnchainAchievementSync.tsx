'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSyncProps {
  achievementId: bigint
}

export default function OnchainAchievementSync({ achievementId }: OnchainAchievementSyncProps) {
  const { address } = useAccount()
  const [targetChains, setTargetChains] = useState<string[]>([])
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const syncAchievement = async () => {
    if (!address || targetChains.length === 0) return
    
    const syncData = `SYNC: ${targetChains.join(', ')}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, syncData],
    })
  }

  const toggleChain = (chain: string) => {
    setTargetChains(prev => 
      prev.includes(chain) 
        ? prev.filter(c => c !== chain)
        : [...prev, chain]
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔄 Achievement Sync</h3>
      
      <div className="space-y-2 mb-4">
        {['arbitrum', 'optimism', 'polygon', 'ethereum'].map((chain) => (
          <label key={chain} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={targetChains.includes(chain)}
              onChange={() => toggleChain(chain)}
              className="w-5 h-5"
            />
            <span className="capitalize">{chain}</span>
          </label>
        ))}
      </div>
      
      <button
        onClick={syncAchievement}
        disabled={isPending || isConfirming || targetChains.length === 0}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Syncing...' : 'Sync Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement synced onchain
        </div>
      )}
    </div>
  )
}
