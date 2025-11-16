'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProofLinks() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const baseScanUrl = `https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Achievement Proof Links</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{totalPosts?.toString() || '0'}</p>
          <p className="text-gray-600">Onchain proofs</p>
        </div>
        <a
          href={baseScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-600 hover:underline"
        >
          View on BaseScan ↗
        </a>
      </div>
    </div>
  )
}

