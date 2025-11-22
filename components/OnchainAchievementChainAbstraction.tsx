'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementChainAbstractionProps {
  achievementId: bigint
}

export default function OnchainAchievementChainAbstraction({ achievementId }: OnchainAchievementChainAbstractionProps) {
  const { address } = useAccount()
  const [sourceChain, setSourceChain] = useState('Optimism')
  const [targetChain, setTargetChain] = useState('Base')
  const [routingEngine, setRoutingEngine] = useState('Socket V2')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const registerRoute = () => {
    if (!address || !sourceChain.trim() || !targetChain.trim()) return

    const payload = `CHAIN_ABSTRACTION|from:${sourceChain}|to:${targetChain}|router:${routingEngine}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white rounded-xl border border-cyan-100 shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔁 Chain Abstraction Routes</h3>
      <p className="text-sm text-gray-600 mb-4">Record how achievements flow between execution layers.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={sourceChain} onChange={(e) => setSourceChain(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Source chain" />
        <input value={targetChain} onChange={(e) => setTargetChain(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Target chain" />
        <input value={routingEngine} onChange={(e) => setRoutingEngine(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Routing engine" />
      </div>

      <button
        onClick={registerRoute}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Registering route...' : 'Register abstraction route'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          ✓ Chain abstraction metadata stored.
        </div>
      )}
    </div>
  )
}
