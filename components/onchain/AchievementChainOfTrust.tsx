'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementChainOfTrustProps {
  achievementId: bigint
}

export default function AchievementChainOfTrust({ achievementId }: AchievementChainOfTrustProps) {
  const { address, isConnected } = useAccount()
  const [trustedAddress, setTrustedAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementChainOfTrust')) {
    return null
  }

  const handleAddTrust = async () => {
    if (!isConnected || !address || !trustedAddress.trim()) return

    try {
      const trustNote = `TRUST:${trustedAddress}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, trustNote],
      })
    } catch (error) {
      console.error('Trust connection failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Chain of Trust" subtitle="Build trust network through verified connections" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trusted Builder Address</label>
          <input
            type="text"
            value={trustedAddress}
            onChange={(e) => setTrustedAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleAddTrust}
          disabled={isPending || isConfirming || !isConnected || !trustedAddress.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Adding Trust...' : 'Add Trust Connection'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Trust connection recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

