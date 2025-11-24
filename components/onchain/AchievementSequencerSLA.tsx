'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSequencerSLAProps {
  achievementId: bigint
}

export default function AchievementSequencerSLA({ achievementId }: AchievementSequencerSLAProps) {
  const { isConnected } = useAccount()
  const [sequencerName, setSequencerName] = useState('Base mainnet sequencer')
  const [targetLatencyMs, setTargetLatencyMs] = useState('400')
  const [observedLatencyMs, setObservedLatencyMs] = useState('')
  const [status, setStatus] = useState<'met' | 'breached'>('met')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, error } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementSequencerSLA')) {
    return null
  }

  const logSla = () => {
    if (!isConnected || !sequencerName.trim() || !observedLatencyMs.trim()) {
      return
    }

    const payload = [
      'Sequencer SLA Report',
      `Achievement: #${achievementId.toString()}`,
      `Sequencer: ${sequencerName}`,
      `Target: ${targetLatencyMs} ms`,
      `Observed: ${observedLatencyMs} ms`,
      `Status: ${status === 'met' ? 'Met' : 'Breached'}`,
    ].join('\n')

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [payload],
    })
  }

  return (
    <AppCard
      title="⏱️ Sequencer SLA"
      subtitle="Track sequencer latency expectations versus reality per deployment"
      accent="blue"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Sequencer</label>
          <input
            type="text"
            value={sequencerName}
            onChange={(e) => setSequencerName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Target latency (ms)</label>
            <input
              type="number"
              min={0}
              value={targetLatencyMs}
              onChange={(e) => setTargetLatencyMs(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Observed latency (ms)</label>
            <input
              type="number"
              min={0}
              value={observedLatencyMs}
              onChange={(e) => setObservedLatencyMs(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="met">Met</option>
              <option value="breached">Breached</option>
            </select>
          </div>
        </div>
        <button
          onClick={logSla}
          disabled={isPending || isConfirming || !isConnected || !observedLatencyMs.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Log Sequencer SLA'}
        </button>
        {(isSuccess || error) && (
          <div
            className={`rounded-lg border p-3 text-sm ${
              isSuccess ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {isSuccess ? '✅ SLA captured onchain' : `⚠️ ${error?.message ?? 'Could not log SLA'}`}
          </div>
        )}
      </div>
    </AppCard>
  )
}


