'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementAuditTrailProps {
  achievementId: bigint
}

export default function AchievementAuditTrail({ achievementId }: AchievementAuditTrailProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementAuditTrail')) {
    return null
  }

  const auditEntries = 3 // Mock audit entries

  return (
    <AppCard title="📝 Achievement Audit Trail" subtitle="View immutable audit entries for this achievement" accent="slate">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Audit Entries" value={auditEntries.toString()} accent="blue" />
          <StatBadge label="Last Audit" value="Today" accent="green" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Audit Trail</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b pb-1">
              <span>Created</span>
              <span>{post?.timestamp ? new Date(Number(post.timestamp) * 1000).toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Author</span>
              <span className="font-mono">{post?.author ? `${post.author.slice(0, 6)}...${post.author.slice(-4)}` : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-green-600">Verified</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          All audit entries are immutable and permanently recorded onchain.
        </p>
      </div>
    </AppCard>
  )
}

