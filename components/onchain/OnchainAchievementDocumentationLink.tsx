'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDocumentationLinkProps {
  achievementId: bigint
}

export default function OnchainAchievementDocumentationLink({ achievementId }: OnchainAchievementDocumentationLinkProps) {
  const { address, isConnected } = useAccount()
  const [docType, setDocType] = useState('')
  const [docUrl, setDocUrl] = useState('')
  const [docVersion, setDocVersion] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const linkDocumentation = async () => {
    if (!isConnected || !address || !docType.trim() || !docUrl.trim()) return

    try {
      const payload = `DOC_LINK:type:${docType}:url:${docUrl}:version:${docVersion || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Documentation link failed:', error)
    }
  }

  return (
    <AppCard title="📚 Documentation Link" subtitle="Link technical docs, guides, or API references" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Documentation Type *</label>
          <input
            type="text"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            placeholder="API docs, user guide, technical spec"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Documentation URL *</label>
          <input
            type="text"
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
            placeholder="https://docs.example.com"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version (optional)</label>
          <input
            type="text"
            value={docVersion}
            onChange={(e) => setDocVersion(e.target.value)}
            placeholder="v1.2.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={linkDocumentation}
          disabled={isPending || isConfirming || !isConnected || !docType.trim() || !docUrl.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Documentation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Documentation link recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
