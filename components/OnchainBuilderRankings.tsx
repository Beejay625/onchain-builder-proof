'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainBuilderRankingsProps {
  userAddress: `0x${string}`
}

export default function OnchainBuilderRankings({ userAddress }: OnchainBuilderRankingsProps) {
  const { data: profile, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: [userAddress],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading rankings...</div>
      </div>
    )
  }

  if (!profile) return null

  const reputation = Number(profile.reputation)
  const estimatedRank = reputation > 1000 ? 'Top 10' : reputation > 500 ? 'Top 50' : reputation > 100 ? 'Top 100' : 'Rising'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏆 Onchain Builder Rankings</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
          <div className="text-sm text-gray-600 mb-1">Estimated Rank</div>
          <div className="text-2xl font-bold text-yellow-700">{estimatedRank}</div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Reputation Score</div>
          <div className="text-3xl font-bold">{reputation}</div>
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          Rankings are calculated based on onchain reputation and achievements
        </div>
      </div>
    </div>
  )
}
