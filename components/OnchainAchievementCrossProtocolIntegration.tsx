'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCrossProtocolIntegration() {
  const { address } = useAccount()
  const [protocol, setProtocol] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const integrateProtocol = async () => {
    if (!address || !protocol) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `INTEGRATE: ${protocol} protocol`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Cross-Protocol Integration</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Protocol name"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={integrateProtocol}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Integrating...' : 'Integrate Protocol'}
        </button>
        {isSuccess && <p className="text-green-600">Protocol integrated!</p>}
      </div>
    </div>
  )
}

