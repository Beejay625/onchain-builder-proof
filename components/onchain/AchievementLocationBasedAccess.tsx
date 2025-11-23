'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementLocationBasedAccessProps {
  achievementId: bigint
}

export default function AchievementLocationBasedAccess({ achievementId }: AchievementLocationBasedAccessProps) {
  const { address, isConnected } = useAccount()
  const [allowedRegions, setAllowedRegions] = useState<string[]>([])
  const [restrictionType, setRestrictionType] = useState<'allow' | 'deny'>('allow')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementLocationBasedAccess')) {
    return null
  }

  const handleSetLocationAccess = async () => {
    if (!isConnected || !address || allowedRegions.length === 0) return

    try {
      const content = `Location-Based Access\nAchievement: #${achievementId.toString()}\nType: ${restrictionType}\nRegions: ${allowedRegions.join(', ')}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Location-based access setup failed:', error)
    }
  }

  const toggleRegion = (region: string) => {
    setAllowedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    )
  }

  const regions = ['US', 'EU', 'Asia', 'Africa', 'South America', 'Oceania']

  return (
    <AppCard title="🌍 Achievement Location-Based Access" subtitle="Set location-based access restrictions" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Restriction Type</label>
          <select
            value={restrictionType}
            onChange={(e) => setRestrictionType(e.target.value as 'allow' | 'deny')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="allow">Allow</option>
            <option value="deny">Deny</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Regions</label>
          <div className="space-y-2">
            {regions.map((region) => (
              <label key={region} className="flex items-center">
                <input
                  type="checkbox"
                  checked={allowedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-sm">{region}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleSetLocationAccess}
          disabled={isPending || isConfirming || !isConnected || allowedRegions.length === 0}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Location-Based Access'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Location-based access configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

