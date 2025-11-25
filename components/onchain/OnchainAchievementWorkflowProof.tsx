'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementWorkflowProofProps {
  achievementId: bigint
}

export default function OnchainAchievementWorkflowProof({ achievementId }: OnchainAchievementWorkflowProofProps) {
  const { address, isConnected } = useAccount()
  const [workflowStage, setWorkflowStage] = useState('')
  const [workflowProof, setWorkflowProof] = useState('')
  const [workflowNotes, setWorkflowNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordWorkflow = async () => {
    if (!isConnected || !address || !workflowStage.trim() || !workflowProof.trim()) return

    try {
      const payload = `WORKFLOW_PROOF:stage:${workflowStage}:proof:${workflowProof}:notes:${workflowNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Workflow proof failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Workflow Proof" subtitle="Document workflow stages with evidence" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Stage *</label>
          <input
            type="text"
            value={workflowStage}
            onChange={(e) => setWorkflowStage(e.target.value)}
            placeholder="Design, Development, Testing, Deploy"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Link *</label>
          <input
            type="text"
            value={workflowProof}
            onChange={(e) => setWorkflowProof(e.target.value)}
            placeholder="PR link, design file, test results"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={workflowNotes}
            onChange={(e) => setWorkflowNotes(e.target.value)}
            rows={2}
            placeholder="Additional context"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordWorkflow}
          disabled={isPending || isConfirming || !isConnected || !workflowStage.trim() || !workflowProof.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Workflow Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Workflow proof recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
