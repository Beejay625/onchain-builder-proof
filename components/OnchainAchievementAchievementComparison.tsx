'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementComparison() {
  const [achievementId1, setAchievementId1] = useState('')
  const [achievementId2, setAchievementId2] = useState('')
  
  const { data: post1 } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: achievementId1 ? [BigInt(achievementId1)] : undefined,
    query: {
      enabled: !!achievementId1,
    },
  })
  
  const { data: post2 } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: achievementId2 ? [BigInt(achievementId2)] : undefined,
    query: {
      enabled: !!achievementId2,
    },
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Achievement Comparison</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          value={achievementId1}
          onChange={(e) => setAchievementId1(e.target.value)}
          placeholder="Achievement ID 1"
          className="p-3 border border-gray-300 rounded-lg"
        />
        
        <input
          type="number"
          value={achievementId2}
          onChange={(e) => setAchievementId2(e.target.value)}
          placeholder="Achievement ID 2"
          className="p-3 border border-gray-300 rounded-lg"
        />
      </div>
      
      {post1 && post2 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-semibold">Achievement #{post1.id.toString()}</p>
            <p className="text-sm text-gray-600">{post1.likes.toString()} likes</p>
            <p className="text-sm text-gray-600">{post1.comments.toString()} comments</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-semibold">Achievement #{post2.id.toString()}</p>
            <p className="text-sm text-gray-600">{post2.likes.toString()} likes</p>
            <p className="text-sm text-gray-600">{post2.comments.toString()} comments</p>
          </div>
        </div>
      )}
    </div>
  )
}
