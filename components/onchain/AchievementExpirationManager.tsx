'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementExpirationManagerProps {
  achievementId: bigint
}

export default function AchievementExpirationManager({ achievementId }: AchievementExpirationManagerProps) {
  const { address, isConnected } = useAccount()
  const [expirationDate, setExpirationDate] = useState('')
  const [autoRenew, setAutoRenew] = useState(false)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementExpirationManager')) {
    return null
  }

  const handleSetExpiration = async () => {
    if (!isConnected || !address || !expirationDate) return

    try {
      const content = `Expiration Management\nAchievement: #${achievementId.toString()}\nExpiration: ${expirationDate}\nAuto-renew: ${autoRenew}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Expiration setting failed:', error)
    }
  }

  return (
    <AppCard title="⏰ Achievement Expiration Manager" subtitle="Manage achievement expiration dates" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoRenew"
            checked={autoRenew}
            onChange={(e) => setAutoRenew(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700">
            Auto-renew on expiration
          </label>
        </div>
        <button
          onClick={handleSetExpiration}
          disabled={isPending || isConfirming || !isConnected || !expirationDate}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Expiration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Expiration set onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

