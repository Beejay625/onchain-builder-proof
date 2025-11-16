'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementFrequency() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const weeklyFrequency = (userPosts?.length || 0) > 0 ? 
    ((userPosts.length / 52) * 7).toFixed(1) : '0.0'
  const frequencyLevel = parseFloat(weeklyFrequency) >= 5 ? 'Very Frequent' :
                        parseFloat(weeklyFrequency) >= 3 ? 'Frequent' :
                        parseFloat(weeklyFrequency) >= 1 ? 'Regular' : 'Occasional'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Achievement Frequency</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-teal-600">{weeklyFrequency}</p>
          <p className="text-gray-600">Per Week</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{frequencyLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement frequency onchain.
        </p>
      </div>
    </div>
  )
}

