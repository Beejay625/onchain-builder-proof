'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainSkillAssessmentProps {
  achievementId: bigint
}

export default function OnchainSkillAssessment({ achievementId }: OnchainSkillAssessmentProps) {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [assessmentScore, setAssessmentScore] = useState('')
  const [assessorAddress, setAssessorAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const submitAssessment = async () => {
    if (!address || !skillName.trim() || !assessmentScore) return
    
    const assessmentData = `SKILL_ASSESSMENT: ${skillName} - Score: ${assessmentScore}${assessorAddress ? ` - Assessor: ${assessorAddress}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, assessmentData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Onchain Skill Assessments</h3>
      
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill being assessed"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={assessmentScore}
          onChange={(e) => setAssessmentScore(e.target.value)}
          placeholder="Score (0-100)"
          min="0"
          max="100"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          value={assessorAddress}
          onChange={(e) => setAssessorAddress(e.target.value)}
          placeholder="Assessor address (optional)"
          className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
        />
      </div>
      
      <button
        onClick={submitAssessment}
        disabled={isPending || isConfirming || !skillName.trim() || !assessmentScore}
        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting...' : 'Submit Assessment'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Assessment submitted onchain
        </div>
      )}
    </div>
  )
}

