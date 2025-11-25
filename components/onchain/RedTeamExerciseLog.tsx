'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function RedTeamExerciseLog() {
  const { address, isConnected } = useAccount()
  const [exerciseName, setExerciseName] = useState('reown-agent-breakout')
  const [findingCount, setFindingCount] = useState(7)
  const [owner, setOwner] = useState('SecOps')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('redTeamExerciseLog')) {
    return null
  }

  const handleLog = async () => {
    if (!isConnected || !address) return
    try {
      const content = `Red Team Exercise
Name: ${exerciseName}
Findings: ${findingCount}
Owner: ${owner}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Red team exercise log failed:', error)
    }
  }

  return (
    <AppCard
      title="🛡️ Red Team Exercise Log"
      subtitle="Document adversarial drills affecting BuilderProof."
      accent="red"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Exercise Name</label>
          <input
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Findings</label>
            <input
              type="number"
              value={findingCount}
              onChange={(e) => setFindingCount(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Owner</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleLog}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Exercise'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Exercise recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

