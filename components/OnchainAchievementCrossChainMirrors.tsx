'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCrossChainMirrors() {
  const { address } = useAccount()
  const [targetChain, setTargetChain] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mirrorAchievement = async () => {
    if (!address || !targetChain) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MIRROR: ${targetChain}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌉 Cross-Chain Mirrors</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Target chain"
          value={targetChain}
          onChange={(e) => setTargetChain(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={mirrorAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Mirroring...' : 'Mirror Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Mirrored onchain!</p>}
      </div>
    </div>
  )
}

