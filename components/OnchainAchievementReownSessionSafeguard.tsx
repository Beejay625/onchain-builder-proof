'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReownSessionSafeguard() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [deviceLabel, setDeviceLabel] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleAction = () => {
    if (!address) {
      setError('Connect your wallet to continue')
      return
    }
    if (!achievementId.trim()) {
      setError('Enter an onchain achievement ID')
      return
    }
    if (!sessionId.trim()) {
      setError('Provide session id')
      return
    }
    if (!deviceLabel.trim()) {
      setError('Provide device label')
      return
    }
    let postId: bigint
    try {
      postId = BigInt(achievementId)
    } catch {
      setError('Invalid achievement ID')
      return
    }
    setError(null)
    const payload = `REOWN_SESSION_SAFEGUARD:${sessionId.trim()}:${deviceLabel.trim()}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [postId, payload],
    })
  }

  const isBusy = isPending || isConfirming

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div>
        <p className="text-3xl">🛠️</p>
        <h3 className="text-xl font-bold">Reown Session Safeguard</h3>
        <p className="text-gray-600">Capture Reown session IDs plus device fingerprints to prove authenticated activity for a given achievement.</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Achievement ID</label>
          <input
            type="number"
            value={achievementId}
            onChange={(e) => setAchievementId(e.target.value)}
            placeholder="Enter onchain achievement ID"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Session ID</label>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="session_a13f..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Device label</label>
          <input
            type="text"
            value={deviceLabel}
            onChange={(e) => setDeviceLabel(e.target.value)}
            placeholder="Mac Studio signer"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleAction}
        disabled={isBusy}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isBusy ? 'Working...' : 'Link Reown Session'}
      </button>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {isSuccess && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">Reown session safeguard stored onchain.</div>
      )}
    </div>
  )
}
