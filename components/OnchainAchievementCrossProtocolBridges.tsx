'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCrossProtocolBridges() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [protocol, setProtocol] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const bridgeToProtocol = async () => {
    if (!address || !postId || !protocol) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `BRIDGE:${protocol}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌉 Cross-Protocol Bridges</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Target protocol"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={bridgeToProtocol}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Bridging...' : 'Bridge to Protocol'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement bridged!</p>}
      </div>
    </div>
  )
}


