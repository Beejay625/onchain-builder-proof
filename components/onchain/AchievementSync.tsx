'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementSync() {
  const { address, isConnected } = useAccount()
  const [targetChain, setTargetChain] = useState('mainnet')
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementSync')) {
    return null
  }

  const handleSync = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Achievement Sync Initiated\nTarget Chain: ${targetChain}\nTotal Achievements: ${totalPosts?.toString() || '0'}`
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

  return (
    <AppCard title="🔄 Achievement Sync" subtitle="Sync achievements across multiple chains" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Base Achievements" value={totalPosts?.toString() || '0'} accent="blue" />
          <StatBadge label="Synced Chains" value="1" accent="green" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Chain</label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="mainnet">Ethereum Mainnet</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
            <option value="polygon">Polygon</option>
          </select>
        </div>
        <button
          onClick={handleSync}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Syncing...' : `Sync to ${targetChain}`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Sync initiated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

