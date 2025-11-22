'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSkillAssessmentProps {
  achievementId: bigint
}

export default function OnchainAchievementSkillAssessment({ achievementId }: OnchainAchievementSkillAssessmentProps) {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [assessmentScore, setAssessmentScore] = useState('')
  const [assessorAddress, setAssessorAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const submitAssessment = async () => {
    if (!address || !skillName.trim() || !assessmentScore.trim()) return
    
    const assessmentData = `SKILL_ASSESSMENT: ${skillName} | score: ${assessmentScore}${assessorAddress ? ` | assessor: ${assessorAddress}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, assessmentData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Skill Assessment</h3>
      
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={assessmentScore}
        onChange={(e) => setAssessmentScore(e.target.value)}
        placeholder="Assessment score (0-100)"
        min="0"
        max="100"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={assessorAddress}
        onChange={(e) => setAssessorAddress(e.target.value)}
        placeholder="Assessor address (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={submitAssessment}
        disabled={isPending || isConfirming || !skillName.trim() || !assessmentScore.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting...' : 'Submit Assessment Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Assessment submitted onchain
        </div>
      )}
    </div>
  )
}


