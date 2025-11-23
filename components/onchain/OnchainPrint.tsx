'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface OnchainPrintProps {
  achievementId: bigint
}

export default function OnchainPrint({ achievementId }: OnchainPrintProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
    query: { enabled: !!achievementId },
  })

  if (!isFeatureEnabled('onchainPrint')) {
    return null
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow && post) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Achievement #${achievementId}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .content { margin: 20px 0; }
              .metadata { color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <h1>Achievement #${achievementId}</h1>
            <div class="content">${post.content}</div>
            <div class="metadata">
              <p>Author: ${post.author}</p>
              <p>Timestamp: ${new Date(Number(post.timestamp) * 1000).toLocaleString()}</p>
              <p>Likes: ${post.likes.toString()}</p>
              <p>Comments: ${post.comments.toString()}</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <AppCard title="🖨️ Onchain Print" subtitle="Print achievements" accent="gray">
      <div className="space-y-4">
        <button
          onClick={handlePrint}
          disabled={!post}
          className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
        >
          Print Achievement
        </button>
        <p className="text-xs text-gray-500">
          Print a physical copy of your onchain achievement.
        </p>
      </div>
    </AppCard>
  )
}

