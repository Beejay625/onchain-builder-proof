'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReownIntegration() {
  const { address } = useAccount()
  const [feature, setFeature] = useState('')
  const [reownData, setReownData] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const integrateReown = async () => {
    if (!address || !feature || !reownData) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`REOWN:${feature}:${reownData}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔌 Reown Integration</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Feature name"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Reown integration data"
          value={reownData}
          onChange={(e) => setReownData(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={integrateReown}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Integrating...' : 'Integrate with Reown'}
        </button>
        {isSuccess && <p className="text-green-600">Reown integration configured!</p>}
      </div>
    </div>
  )
}
