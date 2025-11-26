'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementAutomationRunProps {
  achievementId: bigint
}

export default function OnchainAchievementAutomationRun({ achievementId }: OnchainAchievementAutomationRunProps) {
  const { address, isConnected } = useAccount()
  const [jobName, setJobName] = useState('')
  const [runResult, setRunResult] = useState<'success' | 'failed' | 'partial'>('success')
  const [logReference, setLogReference] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logAutomation = async () => {
    if (!isConnected || !address || !jobName.trim()) return

    try {
      const payload = `AUTOMATION_RUN:job:${jobName}:result:${runResult}:log:${logReference || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Automation run logging failed:', error)
    }
  }

  return (
    <AppCard title="🤖 Automation Run" subtitle="Record automation job executions" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Name *</label>
          <input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            placeholder="Daily data snapshots"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
          <select
            value={runResult}
            onChange={(e) => setRunResult(e.target.value as typeof runResult)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Log Reference (optional)</label>
          <input
            type="text"
            value={logReference}
            onChange={(e) => setLogReference(e.target.value)}
            placeholder="https://logs.example.com/run/123"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={logAutomation}
          disabled={isPending || isConfirming || !isConnected || !jobName.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Automation Run'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Automation run stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
