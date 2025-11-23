'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPrivacyProps {
  achievementId: bigint
}

export default function AchievementPrivacy({ achievementId }: AchievementPrivacyProps) {
  const { address, isConnected } = useAccount()
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'private' | 'unlisted'>('public')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPrivacy')) {
    return null
  }

  const handleSetPrivacy = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Privacy Settings\nAchievement: #${achievementId.toString()}\nLevel: ${privacyLevel}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Privacy update failed:', error)
    }
  }

  return (
    <AppCard title="🔒 Achievement Privacy" subtitle="Control achievement visibility and privacy" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Level</label>
          <select
            value={privacyLevel}
            onChange={(e) => setPrivacyLevel(e.target.value as 'public' | 'private' | 'unlisted')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="public">Public - Visible to everyone</option>
            <option value="private">Private - Only visible to you</option>
            <option value="unlisted">Unlisted - Accessible via direct link</option>
          </select>
        </div>
        <button
          onClick={handleSetPrivacy}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : 'Update Privacy'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Privacy settings updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

