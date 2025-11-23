'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface OnchainValidationProps {
  achievementId: bigint
}

export default function OnchainValidation({ achievementId }: OnchainValidationProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainValidation')) {
    return null
  }

  const isValid = !!post
  const hasContent = post?.content && post.content.length > 0
  const hasAuthor = !!post?.author

  return (
    <AppCard title="✅ Onchain Validation" subtitle="Validate achievement data integrity" accent="green">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge
            label="Valid"
            value={isValid ? 'Yes' : 'No'}
            accent={isValid ? 'green' : 'red'}
          />
          <StatBadge
            label="Has Content"
            value={hasContent ? 'Yes' : 'No'}
            accent={hasContent ? 'green' : 'red'}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge
            label="Has Author"
            value={hasAuthor ? 'Yes' : 'No'}
            accent={hasAuthor ? 'green' : 'red'}
          />
          <StatBadge
            label="Onchain"
            value="Verified"
            accent="blue"
          />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Validation Status</p>
          <p className="text-xs">
            {isValid && hasContent && hasAuthor
              ? '✅ Achievement is valid and verified onchain'
              : '⚠️ Some validation checks failed'}
          </p>
        </div>
      </div>
    </AppCard>
  )
}

