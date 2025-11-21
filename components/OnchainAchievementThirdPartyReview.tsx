'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementThirdPartyReviewProps {
  achievementId: bigint
}

export default function OnchainAchievementThirdPartyReview({ achievementId }: OnchainAchievementThirdPartyReviewProps) {
  const { address } = useAccount()
  const [reviewer, setReviewer] = useState('')
  const [outcome, setOutcome] = useState('approved')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordReview = () => {
    if (!address || !reviewer.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `THIRD_PARTY_REVIEW: ${reviewer} - ${outcome}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Third-Party Review</h3>
      <input
        type="text"
        value={reviewer}
        onChange={(e) => setReviewer(e.target.value)}
        placeholder="Reviewer name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <select
        value={outcome}
        onChange={(e) => setOutcome(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="approved">Approved</option>
        <option value="conditionally-approved">Conditionally Approved</option>
        <option value="changes-required">Changes Required</option>
      </select>
      <button
        onClick={recordReview}
        disabled={isPending || isConfirming || !reviewer.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Review Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-500 rounded-lg text-sm text-blue-700">
          ✓ Third-party review recorded onchain
        </div>
      )}
    </div>
  )
}
