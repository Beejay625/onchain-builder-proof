'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface LicensingProps {
  achievementId: bigint
}

export default function Licensing({ achievementId }: LicensingProps) {
  const { address, isConnected } = useAccount()
  const [licenseType, setLicenseType] = useState<'MIT' | 'Apache' | 'GPL' | 'Custom'>('MIT')
  const [licenseUrl, setLicenseUrl] = useState('')
  const [licenseTerms, setLicenseTerms] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainLicensing')) {
    return null
  }

  const handleAddLicense = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Licensing Information\nAchievement: #${achievementId.toString()}\nLicense: ${licenseType}${licenseUrl ? `\nURL: ${licenseUrl}` : ''}${licenseTerms ? `\nTerms: ${licenseTerms}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('License addition failed:', error)
    }
  }

  return (
    <AppCard title="📜 Licensing" subtitle="Add licensing information to achievements" accent="slate">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License Type</label>
          <select
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value as 'MIT' | 'Apache' | 'GPL' | 'Custom')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="MIT">MIT</option>
            <option value="Apache">Apache 2.0</option>
            <option value="GPL">GPL v3</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License URL (optional)</label>
          <input
            type="text"
            value={licenseUrl}
            onChange={(e) => setLicenseUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {licenseType === 'Custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Terms</label>
            <textarea
              value={licenseTerms}
              onChange={(e) => setLicenseTerms(e.target.value)}
              placeholder="Custom license terms..."
              rows={3}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        )}
        <button
          onClick={handleAddLicense}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add License'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ License information recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

