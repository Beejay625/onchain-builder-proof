'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCrossChainStateProps {
  achievementId: bigint
}

export default function AchievementCrossChainState({ achievementId }: AchievementCrossChainStateProps) {
  const { address, isConnected } = useAccount()
  const [sourceChain, setSourceChain] = useState('base')
  const [targetChain, setTargetChain] = useState('ethereum')
  const [stateHash, setStateHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCrossChainState')) {
    return null
  }

  const handleSyncState = async () => {
    if (!isConnected || !address || !stateHash.trim()) return

    try {
      const content = `Cross-Chain State\nAchievement: #${achievementId.toString()}\nSource: ${sourceChain}\nTarget: ${targetChain}\nState Hash: ${stateHash}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Cross-chain state sync failed:', error)
    }
  }

  return (
    <AppCard title="🌐 Achievement Cross-Chain State" subtitle="Track cross-chain state operations in cross-chain protocols" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source Chain</label>
          <select
            value={sourceChain}
            onChange={(e) => setSourceChain(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="base">Base</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Chain</label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="ethereum">Ethereum</option>
            <option value="base">Base</option>
            <option value="polygon">Polygon</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State Hash</label>
          <input
            type="text"
            value={stateHash}
            onChange={(e) => setStateHash(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleSyncState}
          disabled={isPending || isConfirming || !isConnected || !stateHash.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Syncing...' : 'Sync Cross-Chain State'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Cross-chain state synced onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

