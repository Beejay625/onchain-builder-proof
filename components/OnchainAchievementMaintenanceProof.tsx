'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMaintenanceProofProps {
  achievementId: bigint
}

export default function OnchainAchievementMaintenanceProof({ achievementId }: OnchainAchievementMaintenanceProofProps) {
  const { address } = useAccount()
  const [maintenanceWindow, setMaintenanceWindow] = useState('weekly')
  const [taskSummary, setTaskSummary] = useState('rotated relayer keys, pruned logs')
  const [verificationUrl, setVerificationUrl] = useState('https://status.buidl.xyz/maintenance/123')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logMaintenance = () => {
    if (!address || !taskSummary.trim()) return

    const payload = `MAINTENANCE_PROOF|window:${maintenanceWindow}|tasks:${taskSummary}|evidence:${verificationUrl}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-gray-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🧰 Maintenance Proofs</h3>
      <p className="text-sm text-gray-600 mb-4">Attach ongoing care logs to each achievement to show durability.</p>

      <div className="space-y-3 mb-4">
        <input value={maintenanceWindow} onChange={(e) => setMaintenanceWindow(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Window" />
        <textarea value={taskSummary} onChange={(e) => setTaskSummary(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" rows={3} placeholder="Tasks" />
        <input value={verificationUrl} onChange={(e) => setVerificationUrl(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Verification URL" />
      </div>

      <button
        onClick={logMaintenance}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging...' : 'Log maintenance proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
          ✓ Maintenance proof sealed onchain.
        </div>
      )}
    </section>
  )
}
