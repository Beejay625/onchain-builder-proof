'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderSeasonPass() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const seasonLevel = Math.floor((userPosts?.length || 0) / 10) + 1

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎫 Builder Season Pass</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-600">{seasonLevel}</p>
          <p className="text-gray-600">Season level</p>
        </div>
        <p className="text-sm text-gray-500">
          Unlock rewards each season
        </p>
      </div>
    </div>
  )
}

