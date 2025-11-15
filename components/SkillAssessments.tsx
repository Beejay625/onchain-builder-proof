'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function SkillAssessments() {
  const [skill, setSkill] = useState('')
  const [score, setScore] = useState('85')
  const [assessmentURL, setAssessmentURL] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitAssessment = async () => {
    if (!skill.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'submitSkillAssessment',
        args: [skill, BigInt(parseInt(score)), assessmentURL],
      })
    } catch (error) {
      console.error('Assessment submission error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Submit Assessment</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="JavaScript, React..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Assessment URL (Optional)</label>
          <input
            type="url"
            value={assessmentURL}
            onChange={(e) => setAssessmentURL(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={submitAssessment}
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Submitting...' : 'Submit Assessment'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Assessment recorded onchain
          </div>
        )}
      </div>
    </div>
  )
}
