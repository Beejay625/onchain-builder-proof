'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementKycVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementKycVerification({ achievementId }: OnchainAchievementKycVerificationProps) {
  const { address } = useAccount()
  const [provider, setProvider] = useState('Reown KYC')
  const [status, setStatus] = useState('verified')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordVerification = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `KYC_VERIFICATION: ${provider} - ${status}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📇 KYC Verification</h3>
      <div className="mb-4 space-y-3">
        <input
          type="text"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          placeholder="Provider name"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <button
        onClick={recordVerification}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record KYC Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-500 rounded-lg text-sm text-emerald-700">
          ✓ KYC verification recorded onchain
        </div>
      )}
    </div>
  )
}
