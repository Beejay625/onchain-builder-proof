'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSkillCertificationProps {
  achievementId: bigint
}

export default function OnchainAchievementSkillCertification({ achievementId }: OnchainAchievementSkillCertificationProps) {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [certificationBody, setCertificationBody] = useState('')
  const [certificateId, setCertificateId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const certifySkill = async () => {
    if (!address || !skillName.trim() || !certificationBody.trim()) return
    
    const certData = `SKILL_CERTIFICATION: ${skillName} | body: ${certificationBody}${certificateId ? ` | id: ${certificateId}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, certData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎓 Skill Certification</h3>
      
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={certificationBody}
        onChange={(e) => setCertificationBody(e.target.value)}
        placeholder="Certification body"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        placeholder="Certificate ID (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={certifySkill}
        disabled={isPending || isConfirming || !skillName.trim() || !certificationBody.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Certifying...' : 'Certify Skill Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Skill certified onchain
        </div>
      )}
    </div>
  )
}
