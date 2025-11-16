'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderProficiencyLevel() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const proficiencyLevel = (userPosts?.length || 0) >= 75 ? 'Proficient' :
                          (userPosts?.length || 0) >= 50 ? 'Skilled' :
                          (userPosts?.length || 0) >= 25 ? 'Capable' :
                          (userPosts?.length || 0) >= 10 ? 'Developing' : 'Novice'
  const proficiencyScore = Math.min(100, (userPosts?.length || 0) * 1.8)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Proficiency Level</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{proficiencyLevel}</p>
          <p className="text-gray-600">Proficiency Level</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{proficiencyScore.toFixed(0)}% Score</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your proficiency level onchain.
        </p>
      </div>
    </div>
  )
}

