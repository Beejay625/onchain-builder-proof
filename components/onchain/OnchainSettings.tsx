'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OnchainSettings() {
  const { address, isConnected } = useAccount()
  const [settingCategory, setSettingCategory] = useState<'privacy' | 'notifications' | 'display'>('privacy')
  const [settingValue, setSettingValue] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainSettings')) {
    return null
  }

  const handleUpdateSetting = async () => {
    if (!isConnected || !address || !settingValue.trim()) return

    try {
      const content = `Settings Update\nCategory: ${settingCategory}\nValue: ${settingValue}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Settings update failed:', error)
    }
  }

  return (
    <AppCard title="⚙️ Onchain Settings" subtitle="Manage settings onchain" accent="gray">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Setting Category</label>
          <select
            value={settingCategory}
            onChange={(e) => setSettingCategory(e.target.value as 'privacy' | 'notifications' | 'display')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="privacy">Privacy</option>
            <option value="notifications">Notifications</option>
            <option value="display">Display</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Setting Value</label>
          <input
            type="text"
            value={settingValue}
            onChange={(e) => setSettingValue(e.target.value)}
            placeholder="Setting value..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleUpdateSetting}
          disabled={isPending || isConfirming || !isConnected || !settingValue.trim()}
          className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : 'Update Setting'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Setting updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

