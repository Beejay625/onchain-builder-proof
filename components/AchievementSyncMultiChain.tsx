'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementSyncMultiChainProps {
  achievementId: bigint
}

export default function AchievementSyncMultiChain({ achievementId }: AchievementSyncMultiChainProps) {
  const [targetChains, setTargetChains] = useState<string[]>([])

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const syncToChains = async () => {
    if (targetChains.length === 0) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'syncAchievement',
        args: [achievementId, targetChains],
      })
    } catch (error) {
      console.error('Sync error:', error)
    }
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
      <h3 className="text-xl font-bold mb-4">🔄 Sync to Chains</h3>
      <div className="space-y-3">
        <div className="space-y-2">
          {['arbitrum', 'optimism', 'polygon', 'ethereum'].map((chain) => (
            <label key={chain} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={targetChains.includes(chain)}
                onChange={() => toggleChain(chain)}
                className="w-4 h-4"
              />
              <span className="text-sm capitalize">{chain}</span>
            </label>
          ))}
        </div>
        <button
          onClick={syncToChains}
          disabled={isPending || targetChains.length === 0}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Syncing...' : 'Sync Achievement'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Achievement synced to selected chains
          </div>
        )}
      </div>
    </div>
  )
}
