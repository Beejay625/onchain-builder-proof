'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPolicyAcknowledgementProps {
  achievementId: bigint
}

export default function OnchainAchievementPolicyAcknowledgement({ achievementId }: OnchainAchievementPolicyAcknowledgementProps) {
  const { address } = useAccount()
  const [policyName, setPolicyName] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const acknowledgePolicy = () => {
    if (!address || !policyName.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `POLICY_ACK: ${policyName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📄 Policy Acknowledgement</h3>
      <input
        type="text"
        value={policyName}
        onChange={(e) => setPolicyName(e.target.value)}
        placeholder="Policy name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={acknowledgePolicy}
        disabled={isPending || isConfirming || !policyName.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Acknowledgement Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-500 rounded-lg text-sm text-blue-700">
          ✓ Acknowledgement stored onchain
        </div>
      )}
    </div>
  )
}
