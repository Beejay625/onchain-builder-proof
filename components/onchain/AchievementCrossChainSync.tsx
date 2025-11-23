'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCrossChainSyncProps {
  achievementId: bigint
}

export default function AchievementCrossChainSync({ achievementId }: AchievementCrossChainSyncProps) {
  const { address, isConnected } = useAccount()
  const [syncChains, setSyncChains] = useState<string[]>([])
  const [syncDirection, setSyncDirection] = useState<'bidirectional' | 'one-way'>('bidirectional')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCrossChainSync')) {
    return null
  }

  const handleSync = async () => {
    if (!isConnected || !address || syncChains.length === 0) return

    try {
      const content = `Cross-Chain Sync\nAchievement: #${achievementId.toString()}\nChains: ${syncChains.join(', ')}\nDirection: ${syncDirection}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }

  const toggleChain = (chain: string) => {
    setSyncChains(prev => 
      prev.includes(chain) 
        ? prev.filter(c => c !== chain)
        : [...prev, chain]
    )
  }

  const availableChains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base']

  return (
    <AppCard title="🔄 Achievement Cross-Chain Sync" subtitle="Sync achievements across multiple chains" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Chains</label>
          <div className="space-y-2">
            {availableChains.map((chain) => (
              <label key={chain} className="flex items-center">
                <input
                  type="checkbox"
                  checked={syncChains.includes(chain)}
                  onChange={() => toggleChain(chain)}
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-sm">{chain}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sync Direction</label>
          <select
            value={syncDirection}
            onChange={(e) => setSyncDirection(e.target.value as 'bidirectional' | 'one-way')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="bidirectional">Bidirectional</option>
            <option value="one-way">One-Way</option>
          </select>
        </div>
        <button
          onClick={handleSync}
          disabled={isPending || isConfirming || !isConnected || syncChains.length === 0}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Syncing...' : 'Sync Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Sync configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

