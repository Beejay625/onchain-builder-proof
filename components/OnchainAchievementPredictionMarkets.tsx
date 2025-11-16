'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementPredictionMarkets() {
  const { address } = useAccount()
  const [market, setMarket] = useState('')
  const [prediction, setPrediction] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createPrediction = async () => {
    if (!address || !market || !prediction) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `PREDICT: ${market} - ${prediction}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔮 Prediction Markets</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Market name"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Your prediction"
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createPrediction}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Prediction'}
        </button>
        {isSuccess && <p className="text-green-600">Prediction created!</p>}
      </div>
    </div>
  )
}

