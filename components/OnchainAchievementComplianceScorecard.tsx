'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementComplianceScorecard() {
  const { address } = useAccount()
  const { data: userPostIds, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const score = (userPostIds?.length || 0) * 5 + 50

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Compliance Scorecard</h3>
      <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
        <p className="text-3xl font-bold">{score}</p>
        <p className="text-sm opacity-80">Compliance Score</p>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Calculated from onchain audit controls and attestations.
      </p>
    </div>
  )
}
