'use client'

import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface ProofLinksProps {
  achievementId: bigint
  transactionHash?: string
}

export default function ProofLinks({ achievementId, transactionHash }: ProofLinksProps) {
  if (!isFeatureEnabled('onchainProofLinks')) {
    return null
  }

  const baseScanUrl = transactionHash
    ? `https://basescan.org/tx/${transactionHash}`
    : `https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`

  return (
    <AppCard title="🔗 Proof Links" subtitle="Direct links to BaseScan verification" accent="blue">
      <div className="space-y-4">
        <div className="space-y-2">
          <a
            href={baseScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-700 hover:bg-blue-100 transition"
          >
            <div className="flex items-center justify-between">
              <span>View on BaseScan</span>
              <span>↗</span>
            </div>
          </a>
          <a
            href={`https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <div className="flex items-center justify-between">
              <span>Contract Address</span>
              <span>↗</span>
            </div>
          </a>
        </div>
        <p className="text-xs text-gray-500">
          Achievement #{achievementId.toString()} is permanently verified on Base blockchain.
        </p>
      </div>
    </AppCard>
  )
}

