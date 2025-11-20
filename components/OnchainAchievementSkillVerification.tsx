'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSkillVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementSkillVerification({ achievementId }: OnchainAchievementSkillVerificationProps) {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [proofLink, setProofLink] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const verifySkill = async () => {
    if (!address || !skillName.trim()) return
    
    const skillData = `SKILL_VERIFICATION: ${skillName}${proofLink ? ` | proof: ${proofLink}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, skillData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Skill Verification</h3>
      
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="url"
        value={proofLink}
        onChange={(e) => setProofLink(e.target.value)}
        placeholder="Proof link (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={verifySkill}
        disabled={isPending || isConfirming || !skillName.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Verifying...' : 'Verify Skill Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Skill verified onchain
        </div>
      )}
    </div>
  )
}
