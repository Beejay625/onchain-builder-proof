'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface OnchainPreviewProps {
  achievementId: bigint
}

export default function OnchainPreview({ achievementId }: OnchainPreviewProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainPreview')) {
    return null
  }

  return (
    <AppCard title="👁️ Onchain Preview" subtitle="Preview achievement before sharing" accent="indigo">
      <div className="space-y-4">
        {post ? (
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2">
              <span className="text-xs text-gray-500">Achievement #{achievementId.toString()}</span>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-800">{post.content}</p>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Author: {post.author.slice(0, 6)}...{post.author.slice(-4)}</span>
              <span>{post.likes.toString()} likes • {post.comments.toString()} comments</span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600 text-center">
            Loading preview...
          </div>
        )}
        <p className="text-xs text-gray-500">
          This is how your achievement will appear to others.
        </p>
      </div>
    </AppCard>
  )
}

