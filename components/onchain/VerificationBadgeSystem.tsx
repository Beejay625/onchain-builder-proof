'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface VerificationBadgeSystemProps {
  achievementId: bigint
}

export default function VerificationBadgeSystem({ achievementId }: VerificationBadgeSystemProps) {
  const { address, isConnected } = useAccount()
  const [verificationLevel, setVerificationLevel] = useState<'basic' | 'premium' | 'elite'>('basic')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: badgeData } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainVerificationBadge')) {
    return null
  }

  const handleRequestVerification = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [`Verification request for achievement ${achievementId.toString()}: ${verificationLevel}`],
      })
    } catch (error) {
      console.error('Verification request failed:', error)
    }
  }

  return (
    <AppCard title="🏅 Onchain Verification Badge" subtitle="Request verifiable badge for your achievement" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Level</label>
          <select
            value={verificationLevel}
            onChange={(e) => setVerificationLevel(e.target.value as 'basic' | 'premium' | 'elite')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="basic">Basic Verification</option>
            <option value="premium">Premium Verification</option>
            <option value="elite">Elite Verification</option>
          </select>
        </div>

        <button
          onClick={handleRequestVerification}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : 'Request Verification'}
        </button>

        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Verification request submitted onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





