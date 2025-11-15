'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainSkillEndorsementProps {
  achievementId: bigint
}

export default function OnchainSkillEndorsement({ achievementId }: OnchainSkillEndorsementProps) {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [endorsementLevel, setEndorsementLevel] = useState('expert')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const endorseSkill = async () => {
    if (!address || !skillName.trim()) return
    
    const endorsementData = `SKILL_ENDORSEMENT: ${skillName} - Level: ${endorsementLevel}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, endorsementData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Onchain Skill Endorsement</h3>
      
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill to endorse"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={endorsementLevel}
        onChange={(e) => setEndorsementLevel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="expert">Expert</option>
        <option value="master">Master</option>
      </select>
      
      <button
        onClick={endorseSkill}
        disabled={isPending || isConfirming || !skillName.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Endorsing...' : 'Endorse Skill'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Skill endorsement recorded onchain
        </div>
      )}
    </div>
  )
}
