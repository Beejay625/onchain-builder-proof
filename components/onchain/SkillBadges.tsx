'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function SkillBadges() {
  const { address } = useAccount()
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  if (!isFeatureEnabled('onchainSkillBadges')) {
    return null
  }

  const achievementCount = userPostIds?.length || 0
  const badgeCount = Math.floor(achievementCount / 5)

  return (
    <AppCard title="🎖️ Skill Badges" subtitle="Earn skill badges based on achievements" accent="orange">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Badges Earned" value={badgeCount.toString()} accent="orange" />
          <StatBadge label="Next Badge" value={`${5 - (achievementCount % 5)} achievements`} accent="blue" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Badge Tiers</p>
          <ul className="space-y-1 text-xs list-disc list-inside">
            <li>Bronze: 5 achievements</li>
            <li>Silver: 10 achievements</li>
            <li>Gold: 25 achievements</li>
            <li>Platinum: 50 achievements</li>
          </ul>
        </div>
      </div>
    </AppCard>
  )
}

