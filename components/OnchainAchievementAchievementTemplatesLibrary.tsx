'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementTemplatesLibrary() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const templates = 25

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Templates Library</h2>
      <div className="text-center">
        <p className="text-4xl font-bold text-indigo-600">{templates}</p>
        <p className="text-gray-600">Available templates</p>
        <p className="text-sm text-gray-500 mt-2">
          Browse template collection
        </p>
      </div>
    </div>
  )
}

