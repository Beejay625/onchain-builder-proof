'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementHotfixStreamProps {
  achievementId: bigint
}

export default function AchievementHotfixStream({ achievementId }: AchievementHotfixStreamProps) {
  const { address, isConnected } = useAccount()
  const [hotfixVersion, setHotfixVersion] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [deploymentHash, setDeploymentHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementHotfixStream')) {
    return null
  }

  const handleRecordHotfix = async () => {
    if (!isConnected || !address || !hotfixVersion.trim() || !issueDescription.trim()) return

    try {
      const content = `Hotfix Stream\nAchievement: #${achievementId.toString()}\nVersion: ${hotfixVersion}\nIssue: ${issueDescription}\nDeployment: ${deploymentHash || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Hotfix recording failed:', error)
    }
  }

  return (
    <AppCard title="🔧 Hotfix Stream" subtitle="Track emergency hotfix deployments with versioning" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hotfix Version</label>
          <input
            type="text"
            value={hotfixVersion}
            onChange={(e) => setHotfixVersion(e.target.value)}
            placeholder="v1.2.3-hotfix"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Describe the critical issue being fixed..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deployment Hash (Optional)</label>
          <input
            type="text"
            value={deploymentHash}
            onChange={(e) => setDeploymentHash(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleRecordHotfix}
          disabled={isPending || isConfirming || !isConnected || !hotfixVersion.trim() || !issueDescription.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Hotfix'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Hotfix recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

