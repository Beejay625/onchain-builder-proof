'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderHeartbeat() {
  const { address } = useAccount()
  const [focus, setFocus] = useState('')
  const [confidence, setConfidence] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleAction = () => {
    if (!address) {
      setError('Connect your wallet to continue')
      return
    }
    if (!focus.trim()) {
      setError('Provide focus area')
      return
    }
    if (!confidence.trim()) {
      setError('Provide confidence note')
      return
    }
    setError(null)
    const payload = `BUILDER_HEARTBEAT:${focus.trim()}:${confidence.trim()}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [payload],
    })
  }

  const isBusy = isPending || isConfirming

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div>
        <p className="text-3xl">💓</p>
        <h3 className="text-xl font-bold">Builder Heartbeat</h3>
        <p className="text-gray-600">Submit a lightweight heartbeat ping with focus areas so teams can monitor momentum gaps.</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Focus area</label>
          <input
            type="text"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Reown kit QA"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Confidence note</label>
          <textarea
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            rows={4}
            placeholder="Shipping in 48h once audits wrap"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleAction}
        disabled={isBusy}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isBusy ? 'Working...' : 'Send Heartbeat'}
      </button>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {isSuccess && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">Builder heartbeat anchored.</div>
      )}
    </div>
  )
}
