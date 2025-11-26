'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSafelistRegistryProps {
  achievementId: bigint
}

export default function AchievementSafelistRegistry({ achievementId }: AchievementSafelistRegistryProps) {
  const { address, isConnected } = useAccount()
  const [safelistType, setSafelistType] = useState('address')
  const [entryValue, setEntryValue] = useState('')
  const [reason, setReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementSafelistRegistry')) {
    return null
  }

  const handleAddSafelistEntry = async () => {
    if (!isConnected || !address || !entryValue.trim()) return

    try {
      const content = `Safelist Registry\nAchievement: #${achievementId.toString()}\nType: ${safelistType}\nEntry: ${entryValue}\nReason: ${reason || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Safelist entry failed:', error)
    }
  }

  return (
    <AppCard title="✅ Safelist Registry" subtitle="Maintain onchain safelist entries for addresses, contracts, or domains" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Safelist Type</label>
          <select
            value={safelistType}
            onChange={(e) => setSafelistType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="address">Address</option>
            <option value="contract">Contract</option>
            <option value="domain">Domain</option>
            <option value="ip">IP Address</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Entry Value</label>
          <input
            type="text"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            placeholder={safelistType === 'address' ? '0x...' : safelistType === 'domain' ? 'example.com' : '192.168.1.1'}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (Optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why this entry is safelisted"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleAddSafelistEntry}
          disabled={isPending || isConfirming || !isConnected || !entryValue.trim() || (safelistType === 'address' && !entryValue.startsWith('0x'))}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add to Safelist'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Safelist entry recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

