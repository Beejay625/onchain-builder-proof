'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementCrossChainTreasuryManagerProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainTreasuryManager({
  achievementId,
}: OnchainAchievementCrossChainTreasuryManagerProps) {
  const { address, isConnected } = useAccount()
  const [managerId, setManagerId] = useState('')
  const [chainCount, setChainCount] = useState('')
  const [treasuryAmount, setTreasuryAmount] = useState('')
  const [managerStatus, setManagerStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementCrossChainTreasuryManager')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !managerId || !chainCount || !treasuryAmount) return

    try {
      const proofHash = keccak256(toBytes(`${managerId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logCrossChainTreasuryManager',
        args: [
          achievementId,
          managerId,
          BigInt(chainCount),
          BigInt(treasuryAmount),
          proofHash,
          managerStatus,
        ],
      })
    } catch (error) {
      console.error('Cross-chain treasury manager submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Cross-Chain Treasury Manager"
      subtitle="Manage treasury operations across multiple chains"
      accent="blue"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manager ID *
          </label>
          <input
            type="text"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            placeholder="treasury-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chain Count *
          </label>
          <input
            type="number"
            value={chainCount}
            onChange={(e) => setChainCount(e.target.value)}
            placeholder="3"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Treasury Amount (wei) *
          </label>
          <input
            type="number"
            value={treasuryAmount}
            onChange={(e) => setTreasuryAmount(e.target.value)}
            placeholder="1000000000000000000"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={managerStatus}
            onChange={(e) => setManagerStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="locked">Locked</option>
            <option value="migrating">Migrating</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !managerId || !chainCount || !treasuryAmount}
          className="w-full rounded-lg bg-blue-600 text-white py-3 px-4 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Managed!'
                : 'Manage Treasury'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Treasury management recorded!</p>
        )}
      </div>
    </AppCard>
  )
}

