'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementSyncStatus() {
  const { data: totalPosts, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Sync Status</h2>
      <div className="text-center">
        {isLoading ? (
          <p className="text-gray-500">Syncing...</p>
        ) : (
          <>
            <p className="text-4xl font-bold text-blue-600">{totalPosts?.toString() || '0'}</p>
            <p className="text-gray-600">Synced achievements</p>
            <p className="text-sm text-green-500 mt-2">✓ Synced</p>
          </>
        )}
      </div>
    </div>
  )
}

