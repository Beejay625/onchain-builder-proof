'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPrivacyAssessmentProps {
  achievementId: bigint
}

export default function OnchainAchievementPrivacyAssessment({ achievementId }: OnchainAchievementPrivacyAssessmentProps) {
  const { address } = useAccount()
  const [assessmentResult, setAssessmentResult] = useState('low-risk')
  const [summary, setSummary] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAssessment = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `PRIVACY_ASSESSMENT: ${assessmentResult}${summary ? ` | ${summary}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🛡️ Privacy Assessment</h3>
      <select
        value={assessmentResult}
        onChange={(e) => setAssessmentResult(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      >
        <option value="low-risk">Low Risk</option>
        <option value="medium-risk">Medium Risk</option>
        <option value="high-risk">High Risk</option>
      </select>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Assessment summary"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      <button
        onClick={recordAssessment}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Assessment Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-teal-50 border border-teal-500 rounded-lg text-sm text-teal-700">
          ✓ Privacy assessment stored onchain
        </div>
      )}
    </div>
  )
}
