'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCarbonOffsetsProps {
  achievementId: bigint
}

export default function OnchainAchievementCarbonOffsets({ achievementId }: OnchainAchievementCarbonOffsetsProps) {
  const { address } = useAccount()
  const [tons, setTons] = useState('2.4')
  const [registry, setRegistry] = useState('Toucan Protocol')
  const [retirementId, setRetirementId] = useState('RET-98234')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logOffset = () => {
    if (!address || !tons.trim()) return

    const payload = `CARBON_OFFSET|tons:${tons}|registry:${registry}|retirement:${retirementId}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white rounded-xl border border-green-100 shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌿 Carbon Offset Ledger</h3>
      <p className="text-sm text-gray-600 mb-4">Attest the sustainability offsets tied to each deployment.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={tons} onChange={(e) => setTons(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Tons CO₂" />
        <input value={registry} onChange={(e) => setRegistry(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Registry" />
        <input value={retirementId} onChange={(e) => setRetirementId(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Retirement ID" />
      </div>

      <button
        onClick={logOffset}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Submitting offset...' : 'Record carbon offset'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Carbon offset event notarized.
        </div>
      )}
    </div>
  )
}
