'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGasOptimizationProps {
  achievementId: bigint
}

export default function OnchainAchievementGasOptimization({ achievementId }: OnchainAchievementGasOptimizationProps) {
  const { address } = useAccount()
  const [optimizationType, setOptimizationType] = useState('packed storage')
  const [gasSaved, setGasSaved] = useState('50000')
  const [technique, setTechnique] = useState('storage packing')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordOptimization = () => {
    if (!address) return
    if (!optimizationType.trim()) return
    if (!gasSaved.trim() || isNaN(Number(gasSaved))) return

    const payload = `GAS_OPTIMIZATION|type:${optimizationType}|saved:${gasSaved}|technique:${technique}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⚡ Gas Optimization</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract gas optimization techniques and savings.</p>

      <div className="space-y-3 mb-4">
        <input value={optimizationType} onChange={(e) => setOptimizationType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500" placeholder="Optimization type" />
        <input type="number" value={gasSaved} onChange={(e) => setGasSaved(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Gas saved" min="0" />
        <input value={technique} onChange={(e) => setTechnique(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Technique" />
      </div>

      <button
        onClick={recordOptimization}
        disabled={isPending || isConfirming || !address || !optimizationType.trim()}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record gas optimization'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✓ Gas optimization recorded onchain.
        </div>
      )}
    </section>
  )
}
