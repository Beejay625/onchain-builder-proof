'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementVisibilityProps {
  achievementId: bigint
}

export default function AchievementVisibility({ achievementId }: AchievementVisibilityProps) {
  const { address, isConnected } = useAccount()
  const [visibility, setVisibility] = useState<'visible' | 'hidden' | 'archived'>('visible')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementVisibility')) {
    return null
  }

  const handleSetVisibility = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Visibility Control\nAchievement: #${achievementId.toString()}\nVisibility: ${visibility}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Visibility update failed:', error)
    }
  }

  return (
    <AppCard title="👁️ Achievement Visibility" subtitle="Control achievement visibility settings" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as 'visible' | 'hidden' | 'archived')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="visible">Visible - Show in all views</option>
            <option value="hidden">Hidden - Hide from public view</option>
            <option value="archived">Archived - Move to archive</option>
          </select>
        </div>
        <button
          onClick={handleSetVisibility}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : 'Update Visibility'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Visibility updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

