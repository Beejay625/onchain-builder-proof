'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMilestoneEscrow() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  const [milestone, setMilestone] = useState('')
  const [escrowId, setEscrowId] = useState('')
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
    if (!milestone.trim()) {
      setError('Provide milestone number')
      return
    }
    if (!escrowId.trim()) {
      setError('Provide escrow id')
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
    const payload = `MILESTONE_ESCROW:${milestone.trim()}:${escrowId.trim()}`
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
        <p className="text-3xl">🧾</p>
        <h3 className="text-xl font-bold">Milestone Escrow</h3>
        <p className="text-gray-600">Bind milestone numbers with escrow IDs for release tracking.</p>
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
          <label className="text-sm font-medium text-gray-700">Milestone number</label>
          <input
            type="number"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            placeholder="3"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Escrow ID</label>
          <input
            type="text"
            value={escrowId}
            onChange={(e) => setEscrowId(e.target.value)}
            placeholder="ESCROW-884"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleAction}
        disabled={isBusy}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isBusy ? 'Working...' : 'Store Milestone Escrow'}
      </button>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {isSuccess && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">Milestone escrow linked.</div>
      )}
    </div>
  )
}
