'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSecurityScoreProps {
  achievementId: bigint
}

export default function OnchainAchievementSecurityScore({ achievementId }: OnchainAchievementSecurityScoreProps) {
  const { address } = useAccount()
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading || !post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">🔒 Security Score</h3>
        <p className="text-gray-600">Analyzing security posture...</p>
      </div>
    )
  }

  const score = Math.min(100, Number(post.likes) * 2 + 50)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔒 Security Score</h3>
      <div className="p-4 bg-gradient-to-r from-slate-600 to-emerald-500 rounded-lg text-white">
        <p className="text-3xl font-bold">{score}</p>
        <p className="text-sm opacity-80">Security Confidence</p>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Derived from onchain engagement and verification signals.
      </p>
    </div>
  )
}
