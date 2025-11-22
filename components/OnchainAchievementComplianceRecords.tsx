'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementComplianceRecordsProps {
  achievementId: bigint
}

export default function OnchainAchievementComplianceRecords({ achievementId }: OnchainAchievementComplianceRecordsProps) {
  const { address } = useAccount()
  const [framework, setFramework] = useState('EU AI Act')
  const [status, setStatus] = useState('in progress')
  const [auditor, setAuditor] = useState('Gauntlet Advisory')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logCompliance = () => {
    if (!address || !framework.trim()) return

    const payload = `COMPLIANCE_RECORD|framework:${framework}|status:${status}|auditor:${auditor}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📑 Compliance Records</h3>
      <p className="text-sm text-gray-600 mb-4">Document regulatory alignment alongside protocol progress.</p>

      <div className="space-y-3 mb-4">
        <input value={framework} onChange={(e) => setFramework(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Framework" />
        <input value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Status" />
        <input value={auditor} onChange={(e) => setAuditor(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Auditor" />
      </div>

      <button
        onClick={logCompliance}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging compliance...' : 'Log compliance record'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Compliance note anchored for reviewers.
        </div>
      )}
    </section>
  )
}
