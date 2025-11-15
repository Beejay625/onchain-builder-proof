'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainReputationWeightingProps {
  userAddress: `0x${string}`
}

export default function OnchainReputationWeighting({ userAddress }: OnchainReputationWeightingProps) {
  const { data: profile, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: [userAddress],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading reputation...</div>
      </div>
    )
  }

  if (!profile) return null

  const reputation = Number(profile.reputation)
  const weight = Math.min(reputation / 100, 1.0)
  const weightPercentage = (weight * 100).toFixed(1)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Onchain Reputation Weighting</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Reputation Score</div>
          <div className="text-2xl font-bold">{reputation}</div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Voting Weight</div>
          <div className="text-2xl font-bold">{weightPercentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${weightPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
          Higher reputation increases your voting power in governance decisions
        </div>
      </div>
    </div>
  )
}

