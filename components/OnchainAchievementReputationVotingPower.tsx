'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationVotingPower() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const votingPower = Math.sqrt(userPosts?.length || 0) * 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🗳️ Voting Power</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-blue-600">{votingPower.toFixed(1)}</p>
        <p className="text-gray-600">Voting power</p>
        <p className="text-sm text-gray-500">
          Quadratic voting system
        </p>
      </div>
    </div>
  )
}

