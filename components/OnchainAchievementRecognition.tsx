'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRecognition() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const recognitionLevel = userPosts && userPosts.length >= 50 ? 'Elite' : 
                          userPosts && userPosts.length >= 25 ? 'Expert' :
                          userPosts && userPosts.length >= 10 ? 'Advanced' : 'Rising'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏅 Achievement Recognition</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-indigo-600">{recognitionLevel}</p>
          <p className="text-gray-600">Recognition Level</p>
        </div>
        <p className="text-sm text-gray-500">
          Get recognized for your onchain achievements.
        </p>
      </div>
    </div>
  )
}

