'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSecureStorageProofProps {
  achievementId: bigint
}

export default function OnchainAchievementSecureStorageProof({ achievementId }: OnchainAchievementSecureStorageProofProps) {
  const { address } = useAccount()
  const [storageProvider, setStorageProvider] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProof = () => {
    if (!address || !storageProvider.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `SECURE_STORAGE: ${storageProvider}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Secure Storage Proof</h3>
      <input
        type="text"
        value={storageProvider}
        onChange={(e) => setStorageProvider(e.target.value)}
        placeholder="Storage provider"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={recordProof}
        disabled={isPending || isConfirming || !storageProvider.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Proof Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Secure storage proof recorded onchain
        </div>
      )}
    </div>
  )
}
