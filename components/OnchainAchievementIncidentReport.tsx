'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementIncidentReportProps {
  achievementId: bigint
}

export default function OnchainAchievementIncidentReport({ achievementId }: OnchainAchievementIncidentReportProps) {
  const { address } = useAccount()
  const [description, setDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const fileIncident = () => {
    if (!address || !description.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `INCIDENT_REPORT: ${description}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🚨 Incident Report</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the incident..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      <button
        onClick={fileIncident}
        disabled={isPending || isConfirming || !description.trim()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting...' : 'Submit Incident Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-red-50 border border-red-500 rounded-lg text-sm text-red-700">
          ✓ Incident report stored onchain
        </div>
      )}
    </div>
  )
}
