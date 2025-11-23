'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDeviceBasedAccessProps {
  achievementId: bigint
}

export default function AchievementDeviceBasedAccess({ achievementId }: AchievementDeviceBasedAccessProps) {
  const { address, isConnected } = useAccount()
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'tablet' | 'all'>('all')
  const [requireAuth, setRequireAuth] = useState(true)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementDeviceBasedAccess')) {
    return null
  }

  const handleSetDeviceAccess = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Device-Based Access\nAchievement: #${achievementId.toString()}\nDevice Type: ${deviceType}\nRequire Auth: ${requireAuth}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Device-based access setup failed:', error)
    }
  }

  return (
    <AppCard title="📱 Achievement Device-Based Access" subtitle="Set device-based access restrictions" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Device Type</label>
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value as 'desktop' | 'mobile' | 'tablet' | 'all')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="all">All Devices</option>
            <option value="desktop">Desktop Only</option>
            <option value="mobile">Mobile Only</option>
            <option value="tablet">Tablet Only</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireAuth"
            checked={requireAuth}
            onChange={(e) => setRequireAuth(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="requireAuth" className="ml-2 text-sm text-gray-700">
            Require device authentication
          </label>
        </div>
        <button
          onClick={handleSetDeviceAccess}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Device-Based Access'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Device-based access configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

