'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementControlEvidenceProps {
  achievementId: bigint
}

export default function OnchainAchievementControlEvidence({ achievementId }: OnchainAchievementControlEvidenceProps) {
  const { address } = useAccount()
  const [evidenceLink, setEvidenceLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitEvidence = () => {
    if (!address || !evidenceLink.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `CONTROL_EVIDENCE: ${evidenceLink}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📎 Control Evidence</h3>
      <input
        type="url"
        value={evidenceLink}
        onChange={(e) => setEvidenceLink(e.target.value)}
        placeholder="Link to evidence"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={submitEvidence}
        disabled={isPending || isConfirming || !evidenceLink.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting...' : 'Submit Evidence Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-500 rounded-lg text-sm text-purple-700">
          ✓ Control evidence recorded onchain
        </div>
      )}
    </div>
  )
}
