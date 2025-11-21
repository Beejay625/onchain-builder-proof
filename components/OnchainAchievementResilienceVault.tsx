'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementResilienceVault() {
  const { address } = useAccount()
  const [vaultLabel, setVaultLabel] = useState('')
  const [coverage, setCoverage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleAction = () => {
    if (!address) {
      setError('Connect your wallet to continue')
      return
    }
    if (!vaultLabel.trim()) {
      setError('Provide vault label')
      return
    }
    if (!coverage.trim()) {
      setError('Provide coverage notes')
      return
    }
    setError(null)
    const payload = `RESILIENCE_VAULT:${vaultLabel.trim()}:${coverage.trim()}`
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
        <p className="text-3xl">💾</p>
        <h3 className="text-xl font-bold">Resilience Vault</h3>
        <p className="text-gray-600">Mirror high-value achievements into a resilience vault post that proves redundancy commitments.</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Vault label</label>
          <input
            type="text"
            value={vaultLabel}
            onChange={(e) => setVaultLabel(e.target.value)}
            placeholder="Security week 42"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Coverage notes</label>
          <textarea
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            rows={4}
            placeholder="Replicated across Base + Arbitrum"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleAction}
        disabled={isBusy}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isBusy ? 'Working...' : 'Log Resilience Vault Entry'}
      </button>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {isSuccess && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">Resilience vault entry recorded onchain.</div>
      )}
    </div>
  )
}
