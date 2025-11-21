'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAssetClassificationProps {
  achievementId: bigint
}

export default function OnchainAchievementAssetClassification({ achievementId }: OnchainAchievementAssetClassificationProps) {
  const { address } = useAccount()
  const [classification, setClassification] = useState('internal')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordClassification = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `ASSET_CLASSIFICATION: ${classification}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏷️ Asset Classification</h3>
      <select
        value={classification}
        onChange={(e) => setClassification(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="public">Public</option>
        <option value="internal">Internal</option>
        <option value="confidential">Confidential</option>
        <option value="restricted">Restricted</option>
      </select>
      <button
        onClick={recordClassification}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Classification Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-500 rounded-lg text-sm text-purple-700">
          ✓ Classification recorded onchain
        </div>
      )}
    </div>
  )
}
