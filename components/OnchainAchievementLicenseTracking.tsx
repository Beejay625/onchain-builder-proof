'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLicenseTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementLicenseTracking({ achievementId }: OnchainAchievementLicenseTrackingProps) {
  const { address } = useAccount()
  const [licenseName, setLicenseName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordLicense = () => {
    if (!address || !licenseName.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `LICENSE_TRACKING: ${licenseName}${expiryDate ? ` | exp:${expiryDate}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 License Tracking</h3>
      <input
        type="text"
        value={licenseName}
        onChange={(e) => setLicenseName(e.target.value)}
        placeholder="License name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={recordLicense}
        disabled={isPending || isConfirming || !licenseName.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record License Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-indigo-50 border border-indigo-500 rounded-lg text-sm text-indigo-700">
          ✓ License recorded onchain
        </div>
      )}
    </div>
  )
}
