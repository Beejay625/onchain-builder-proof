'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainSkillAssessmentSystem() {
  const { address } = useAccount()
  const [skillName, setSkillName] = useState('')
  const [assessmentScore, setAssessmentScore] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitAssessment = async () => {
    if (!address || !skillName || !assessmentScore) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Skill Assessment: ${skillName} - Score: ${assessmentScore}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Skill Assessment</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Assessment score"
          value={assessmentScore}
          onChange={(e) => setAssessmentScore(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={submitAssessment}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Assessment'}
        </button>
        {isSuccess && <p className="text-green-600">Assessment submitted onchain!</p>}
      </div>
    </div>
  )
}

