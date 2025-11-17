'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationInteroperability() {
  const { address } = useAccount()
  const [targetProtocol, setTargetProtocol] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const bridgeReputation = async () => {
    if (!address || !targetProtocol) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `BRIDGE: To ${targetProtocol}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌉 Reputation Interoperability</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Target protocol"
          value={targetProtocol}
          onChange={(e) => setTargetProtocol(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={bridgeReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Bridging...' : 'Bridge Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation bridged!</p>}
      </div>
    </div>
  )
}

