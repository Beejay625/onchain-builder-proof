'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementVRFProps {
  achievementId: bigint
}

export default function AchievementVRF({ achievementId }: AchievementVRFProps) {
  const { address, isConnected } = useAccount()
  const [vrfRequestId, setVrfRequestId] = useState('')
  const [vrfProof, setVrfProof] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementVRF')) {
    return null
  }

  const handleVerifyVRF = async () => {
    if (!isConnected || !address || !vrfRequestId.trim() || !vrfProof.trim()) return

    try {
      const content = `VRF Verification\nAchievement: #${achievementId.toString()}\nRequest ID: ${vrfRequestId}\nProof: ${vrfProof.substring(0, 100)}...`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('VRF verification failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Achievement VRF" subtitle="Track VRF operations and verifications" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">VRF Request ID</label>
          <input
            type="text"
            value={vrfRequestId}
            onChange={(e) => setVrfRequestId(e.target.value)}
            placeholder="Request identifier"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">VRF Proof</label>
          <textarea
            value={vrfProof}
            onChange={(e) => setVrfProof(e.target.value)}
            placeholder="VRF proof data..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleVerifyVRF}
          disabled={isPending || isConfirming || !isConnected || !vrfRequestId.trim() || !vrfProof.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify VRF'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ VRF verified onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

