'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationRebasing() {
  const { address, isConnected } = useAccount()

  const { data: rebaseRate, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getReputationRebaseRate',
    query: {
      enabled: isConnected,
    },
  })

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔄 Reputation Rebasing</h3>
        <p className="text-gray-600">Connect wallet to view rebase</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔄 Reputation Rebasing</h3>
      <p className="text-gray-600 mb-4">
        Daily rebase adjustments for reputation tokens onchain
      </p>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading rebase rate...</div>
        ) : rebaseRate !== undefined && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Rebase Rate</p>
            <p className="text-3xl font-bold text-blue-600">{rebaseRate?.toString() || '0'}%</p>
          </div>
        )}
      </div>
    </div>
  )
}
