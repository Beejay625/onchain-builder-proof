'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPriceImpactCalculationProps {
  achievementId: bigint
}

export default function OnchainAchievementPriceImpactCalculation({ achievementId }: OnchainAchievementPriceImpactCalculationProps) {
  const { address } = useAccount()
  const [tokenIn, setTokenIn] = useState('0xtokenIn')
  const [tokenOut, setTokenOut] = useState('0xtokenOut')
  const [amount, setAmount] = useState('1000')
  const [impact, setImpact] = useState('0.5%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordImpact = () => {
    if (!address) return
    if (!tokenIn.trim() || !tokenOut.trim()) return
    if (!tokenIn.startsWith('0x') || tokenIn.length !== 42) return
    if (!tokenOut.startsWith('0x') || tokenOut.length !== 42) return

    const payload = `PRICE_IMPACT_CALCULATION|tokenIn:${tokenIn}|tokenOut:${tokenOut}|amount:${amount}|impact:${impact}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📊 Price Impact Calculation</h3>
      <p className="text-sm text-gray-600 mb-4">Record price impact calculations for large swaps.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenIn} onChange={(e) => setTokenIn(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500" placeholder="Token in address" />
        <input value={tokenOut} onChange={(e) => setTokenOut(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token out address" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Amount" />
        <input value={impact} onChange={(e) => setImpact(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Price impact" />
      </div>

      <button
        onClick={recordImpact}
        disabled={isPending || isConfirming || !address || !tokenIn.startsWith('0x')}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record price impact'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Price impact calculation recorded onchain.
        </div>
      )}
    </section>
  )
}
