'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function CodeContributionProof() {
  const { address, isConnected } = useAccount()
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [commitHash, setCommitHash] = useState('')
  const [contributionDescription, setContributionDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainCodeContributionProof')) {
    return null
  }

  const handleProveContribution = async () => {
    if (!isConnected || !address || !repositoryUrl || !commitHash) return

    try {
      const content = `Code Contribution Proof\nRepository: ${repositoryUrl}\nCommit: ${commitHash}${contributionDescription ? `\nDescription: ${contributionDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Contribution proof failed:', error)
    }
  }

  return (
    <AppCard title="💻 Code Contribution Proof" subtitle="Prove code contributions with commit hashes" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Repository URL</label>
          <input
            type="text"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Commit Hash</label>
          <input
            type="text"
            value={commitHash}
            onChange={(e) => setCommitHash(e.target.value)}
            placeholder="abc123..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={contributionDescription}
            onChange={(e) => setContributionDescription(e.target.value)}
            placeholder="What did you contribute?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleProveContribution}
          disabled={isPending || isConfirming || !isConnected || !repositoryUrl || !commitHash}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Contribution'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Code contribution proof recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


