'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainSkillAssessments() {
  const { address } = useAccount()
  const [skill, setSkill] = useState('')
  const [score, setScore] = useState('')
  const [assessor, setAssessor] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitAssessment = async () => {
    if (!address || !skill || !score || !assessor) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Skill Assessment: ${skill} - Score: ${score}/100 - Assessor: ${assessor}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Skill Assessments</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill name"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="0"
          max="100"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Assessor address"
          value={assessor}
          onChange={(e) => setAssessor(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={submitAssessment}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Assessment'}
        </button>
        {isSuccess && <p className="text-green-600">Assessment submitted onchain!</p>}
      </div>
    </div>
  )
}

