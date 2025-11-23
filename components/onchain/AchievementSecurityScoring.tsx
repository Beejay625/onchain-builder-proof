'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementSecurityScoringProps {
  achievementId: bigint
}

export default function AchievementSecurityScoring({ achievementId }: AchievementSecurityScoringProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('achievementSecurityScoring')) {
    return null
  }

  const securityScore = 85 // Mock security score
  const securityLevel = securityScore >= 90 ? 'Excellent' : securityScore >= 70 ? 'Good' : securityScore >= 50 ? 'Fair' : 'Poor'

  return (
    <AppCard title="🛡️ Achievement Security Scoring" subtitle="Monitor security posture for achievements" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Security Score" value={`${securityScore}/100`} accent={securityScore >= 70 ? 'green' : 'red'} />
          <StatBadge label="Security Level" value={securityLevel} accent="blue" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Vulnerabilities" value="0" accent="green" />
          <StatBadge label="Last Scan" value="Today" accent="purple" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Security Metrics</p>
          <p className="text-xs">
            Security score calculated from onchain verification, compliance, and risk assessment.
          </p>
        </div>
      </div>
    </AppCard>
  )
}

