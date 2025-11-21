'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEncryptionStatusProps {
  achievementId: bigint
}

export default function OnchainAchievementEncryptionStatus({ achievementId }: OnchainAchievementEncryptionStatusProps) {
  const { address } = useAccount()
  const [status, setStatus] = useState('encrypted-at-rest')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateEncryption = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `ENCRYPTION_STATUS: ${status}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Encryption Status</h3>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="encrypted-at-rest">Encrypted at Rest</option>
        <option value="encrypted-in-transit">Encrypted in Transit</option>
        <option value="end-to-end">End-to-End</option>
        <option value="not-encrypted">Not Encrypted</option>
      </select>
      <button
        onClick={updateEncryption}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Encryption Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-indigo-50 border border-indigo-500 rounded-lg text-sm text-indigo-700">
          ✓ Encryption status recorded onchain
        </div>
      )}
    </div>
  )
}
