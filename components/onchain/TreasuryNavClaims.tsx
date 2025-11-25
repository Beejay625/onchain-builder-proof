'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function TreasuryNavClaims() {
  const { address, isConnected } = useAccount()
  const [nav, setNav] = useState(1_250_000)
  const [confidence, setConfidence] = useState(0.92)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('treasuryNavClaims')) {
    return null
  }

  const handlePublish = async () => {
    if (!isConnected || !address) return
    try {
      const content = `Treasury NAV Claim
NAV: ${nav}
Confidence: ${confidence}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Treasury NAV claim failed:', error)
    }
  }

  return (
    <AppCard
      title="🏦 Treasury NAV Claims"
      subtitle="Keep an immutable record of treasury net asset value attestations."
      accent="emerald"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">NAV (USD)</label>
            <input
              type="number"
              value={nav}
              onChange={(e) => setNav(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Confidence</label>
            <input
              type="number"
              step="0.01"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <StatBadge
          label="NAV Claim"
          value={`$${nav.toLocaleString()} @ ${(confidence * 100).toFixed(1)}%`}
          accent="emerald"
        />
        <button
          onClick={handlePublish}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Claim'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ NAV claim recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

