'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementLicenseInfoProps {
  achievementId: bigint
}

export default function OnchainAchievementLicenseInfo({ achievementId }: OnchainAchievementLicenseInfoProps) {
  const { address, isConnected } = useAccount()
  const [licenseType, setLicenseType] = useState('')
  const [licenseUrl, setLicenseUrl] = useState('')
  const [licenseNotes, setLicenseNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordLicense = async () => {
    if (!isConnected || !address || !licenseType.trim()) return

    try {
      const payload = `LICENSE_INFO:type:${licenseType}:url:${licenseUrl || 'n/a'}:notes:${licenseNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('License info failed:', error)
    }
  }

  return (
    <AppCard title="📜 License Info" subtitle="Record licensing information and terms" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License Type *</label>
          <input
            type="text"
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
            placeholder="MIT, Apache-2.0, Proprietary"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License URL (optional)</label>
          <input
            type="text"
            value={licenseUrl}
            onChange={(e) => setLicenseUrl(e.target.value)}
            placeholder="https://spdx.org/licenses/MIT.html"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={licenseNotes}
            onChange={(e) => setLicenseNotes(e.target.value)}
            rows={2}
            placeholder="License terms or restrictions"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordLicense}
          disabled={isPending || isConfirming || !isConnected || !licenseType.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record License Info'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ License info recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
