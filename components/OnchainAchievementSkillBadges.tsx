'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSkillBadgesProps {
  achievementId: bigint
}

export default function OnchainAchievementSkillBadges({ achievementId }: OnchainAchievementSkillBadgesProps) {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [badgeLevel, setBadgeLevel] = useState('beginner')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const earnBadge = async () => {
    if (!address || !skillName.trim()) return
    
    const badgeData = `SKILL_BADGE: ${skillName} | level: ${badgeLevel}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, badgeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎖️ Skill Badges</h3>
      
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={badgeLevel}
        onChange={(e) => setBadgeLevel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="expert">Expert</option>
      </select>
      
      <button
        onClick={earnBadge}
        disabled={isPending || isConfirming || !skillName.trim()}
        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Earning...' : 'Earn Skill Badge Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Skill badge earned onchain
        </div>
      )}
    </div>
  )
}
