'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface OnchainVerificationProps {
  achievementId: bigint
}

export default function OnchainVerification({ achievementId }: OnchainVerificationProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainVerification')) {
    return null
  }

  const isVerified = !!post && post.content.length > 0
  const contractAddress = BUILDER_PROOF_CONTRACT

  return (
    <AppCard title="🔍 Onchain Verification" subtitle="Verify achievement authenticity" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge
            label="Status"
            value={isVerified ? 'Verified' : 'Unverified'}
            accent={isVerified ? 'green' : 'red'}
          />
          <StatBadge
            label="Chain"
            value="Base"
            accent="blue"
          />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Verification Details</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Contract:</span>
              <span className="font-mono">{contractAddress?.slice(0, 10)}...{contractAddress?.slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span>Achievement ID:</span>
              <span className="font-mono">#{achievementId.toString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Verified:</span>
              <span className={isVerified ? 'text-green-600' : 'text-red-600'}>
                {isVerified ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          This achievement is verified on Base blockchain and cannot be altered.
        </p>
      </div>
    </AppCard>
  )
}

