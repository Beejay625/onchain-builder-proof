'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPolicyVersioningProps {
  achievementId: bigint
}

export default function OnchainAchievementPolicyVersioning({ achievementId }: OnchainAchievementPolicyVersioningProps) {
  const { address } = useAccount()
  const [version, setVersion] = useState('v1.0')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logVersion = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `POLICY_VERSION: ${version}${notes ? ` | ${notes}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📘 Policy Versioning</h3>
      <input
        type="text"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        placeholder="Version"
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Change notes"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      <button
        onClick={logVersion}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Policy Version'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-500 rounded-lg text-sm text-blue-700">
          ✓ Policy version stored onchain
        </div>
      )}
    </div>
  )
}
