'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAMLScreeningProps {
  achievementId: bigint
}

export default function OnchainAchievementAMLScreening({ achievementId }: OnchainAchievementAMLScreeningProps) {
  const { address } = useAccount()
  const [result, setResult] = useState('cleared')
  const [provider, setProvider] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordScreening = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `AML_SCREENING: ${result}${provider ? ` | ${provider}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💸 AML Screening</h3>
      <select
        value={result}
        onChange={(e) => setResult(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      >
        <option value="cleared">Cleared</option>
        <option value="review">Needs Review</option>
        <option value="blocked">Blocked</option>
      </select>
      <input
        type="text"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        placeholder="Screening provider"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={recordScreening}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record AML Screening'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-500 rounded-lg text-sm text-emerald-700">
          ✓ AML screening recorded onchain
        </div>
      )}
    </div>
  )
}
