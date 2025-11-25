'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRecoveryRunbookProps {
  achievementId: bigint
}

export default function AchievementRecoveryRunbook({ achievementId }: AchievementRecoveryRunbookProps) {
  const { address, isConnected } = useAccount()
  const [failureScenario, setFailureScenario] = useState('')
  const [recoverySteps, setRecoverySteps] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRecoveryRunbook')) {
    return null
  }

  const handleRecordRecovery = async () => {
    if (!isConnected || !address || !failureScenario.trim() || !recoverySteps.trim()) return

    try {
      const content = `Recovery Runbook\nAchievement: #${achievementId.toString()}\nScenario: ${failureScenario}\nSteps: ${recoverySteps}\nETA: ${estimatedTime || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Recovery runbook recording failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Recovery Runbook" subtitle="Document recovery procedures for failure scenarios" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Failure Scenario</label>
          <input
            type="text"
            value={failureScenario}
            onChange={(e) => setFailureScenario(e.target.value)}
            placeholder="Database connection loss"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Steps</label>
          <textarea
            value={recoverySteps}
            onChange={(e) => setRecoverySteps(e.target.value)}
            placeholder="1. Check connection pool\n2. Restart service\n3. Verify data integrity"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Recovery Time (Optional)</label>
          <input
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="15 minutes"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordRecovery}
          disabled={isPending || isConfirming || !isConnected || !failureScenario.trim() || !recoverySteps.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Recovery Runbook'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Recovery runbook recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

