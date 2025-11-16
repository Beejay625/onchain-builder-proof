'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementImmutable() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Immutable History</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-red-600">{totalPosts?.toString() || '0'}</p>
        <p className="text-gray-600">Permanent records</p>
        <p className="text-sm text-gray-500 mt-2">
          All achievements are immutable onchain
        </p>
      </div>
    </div>
  )
}

