'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementEscalationMatrixProps {
  achievementId: bigint
}

export default function AchievementEscalationMatrix({ achievementId }: AchievementEscalationMatrixProps) {
  const { address, isConnected } = useAccount()
  const [severity, setSeverity] = useState('low')
  const [escalationPath, setEscalationPath] = useState('')
  const [owner, setOwner] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementEscalationMatrix')) {
    return null
  }

  const handleRecordEscalation = async () => {
    if (!isConnected || !address || !escalationPath.trim()) return

    try {
      const content = `Escalation Matrix\nAchievement: #${achievementId.toString()}\nSeverity: ${severity}\nPath: ${escalationPath}\nOwner: ${owner || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Escalation recording failed:', error)
    }
  }

  return (
    <AppCard title="📊 Escalation Matrix" subtitle="Define escalation paths for different severity levels" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Escalation Path</label>
          <textarea
            value={escalationPath}
            onChange={(e) => setEscalationPath(e.target.value)}
            placeholder="Team Lead → Engineering Manager → CTO"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Owner (Optional)</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Primary contact"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordEscalation}
          disabled={isPending || isConfirming || !isConnected || !escalationPath.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Escalation Path'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Escalation path recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

