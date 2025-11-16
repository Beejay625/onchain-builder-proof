'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderSkillMatrix() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const skills = [
    { name: 'Frontend', level: Math.min(100, (userPosts?.length || 0) * 5) },
    { name: 'Backend', level: Math.min(100, (userPosts?.length || 0) * 4) },
    { name: 'Blockchain', level: Math.min(100, (userPosts?.length || 0) * 6) },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Skill Matrix</h2>
      <div className="space-y-3">
        {skills.map((skill, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-gray-600">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-sm text-gray-500 mt-4">
          Visualize your skill levels onchain.
        </p>
      </div>
    </div>
  )
}

