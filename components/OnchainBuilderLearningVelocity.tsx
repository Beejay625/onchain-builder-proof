'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderLearningVelocity() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const learningVelocity = (userPosts?.length || 0) * 2.5
  const velocityStatus = learningVelocity >= 20 ? 'Fast Learner' :
                         learningVelocity >= 10 ? 'Steady Learner' :
                         learningVelocity >= 5 ? 'Learning' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Learning Velocity</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-indigo-600">{learningVelocity.toFixed(1)}</p>
          <p className="text-gray-600">Learning Velocity</p>
          <p className="text-lg font-semibold text-purple-600 mt-2">{velocityStatus}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your learning velocity through achievements.
        </p>
      </div>
    </div>
  )
}

