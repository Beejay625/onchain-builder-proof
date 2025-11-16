'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainSkillBadges() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const skillBadges = [
    { name: 'Developer', earned: (userPosts?.length || 0) >= 5 },
    { name: 'Designer', earned: (userPosts?.length || 0) >= 10 },
    { name: 'Architect', earned: (userPosts?.length || 0) >= 25 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎖️ Skill Badges</h2>
      <div className="space-y-2">
        {skillBadges.map((badge, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className={badge.earned ? 'font-semibold' : 'text-gray-400'}>
              {badge.name}
            </span>
            {badge.earned && <span className="text-green-600">✓</span>}
          </div>
        ))}
        <p className="text-sm text-gray-500 mt-4">
          Earn skill badges based on your achievements.
        </p>
      </div>
    </div>
  )
}

