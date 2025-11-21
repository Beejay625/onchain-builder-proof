'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementConsentProofProps {
  achievementId: bigint
}

export default function OnchainAchievementConsentProof({ achievementId }: OnchainAchievementConsentProofProps) {
  const { address } = useAccount()
  const [consentType, setConsentType] = useState('data-processing')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordConsent = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `CONSENT_PROOF: ${consentType}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Consent Proof</h3>
      <select
        value={consentType}
        onChange={(e) => setConsentType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="data-processing">Data Processing</option>
        <option value="email">Email Notifications</option>
        <option value="marketing">Marketing</option>
      </select>
      <button
        onClick={recordConsent}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Consent Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Consent proof stored onchain
        </div>
      )}
    </div>
  )
}
