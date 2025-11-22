'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface SkillAssessmentsProps {
  builderAddress: string
}

export default function SkillAssessments({ builderAddress }: SkillAssessmentsProps) {
  const { address, isConnected } = useAccount()
  const [skill, setSkill] = useState('')
  const [assessmentScore, setAssessmentScore] = useState(75)
  const [assessmentNotes, setAssessmentNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainSkillAssessments')) {
    return null
  }

  const handleSubmitAssessment = async () => {
    if (!isConnected || !address || !skill.trim()) return

    try {
      const content = `Skill Assessment\nBuilder: ${builderAddress}\nSkill: ${skill}\nScore: ${assessmentScore}/100${assessmentNotes ? `\nNotes: ${assessmentNotes}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Assessment submission failed:', error)
    }
  }

  return (
    <AppCard title="📊 Skill Assessment" subtitle="Submit and view skill assessments" accent="teal">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g., Solidity, React, Design"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Score (0-100)</label>
          <input
            type="number"
            value={assessmentScore}
            onChange={(e) => setAssessmentScore(Number(e.target.value))}
            min={0}
            max={100}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={assessmentNotes}
            onChange={(e) => setAssessmentNotes(e.target.value)}
            placeholder="Assessment details..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmitAssessment}
          disabled={isPending || isConfirming || !isConnected || !skill.trim()}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit Assessment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Skill assessment recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

