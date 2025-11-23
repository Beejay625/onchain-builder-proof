'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCrossChainBridgeProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainBridge({ achievementId }: OnchainAchievementCrossChainBridgeProps) {
  const { address } = useAccount()
  const [bridgeProtocol, setBridgeProtocol] = useState('LayerZero')
  const [sourceChain, setSourceChain] = useState('Base')
  const [destChain, setDestChain] = useState('Ethereum')
  const [txHash, setTxHash] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordBridge = () => {
    if (!address) return
    if (!bridgeProtocol.trim() || !sourceChain.trim()) return
    if (!txHash.trim()) return
    if (!txHash.startsWith('0x') || txHash.length !== 66) return

    const payload = `CROSS_CHAIN_BRIDGE|protocol:${bridgeProtocol}|source:${sourceChain}|dest:${destChain}|tx:${txHash}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-violet-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌉 Cross-Chain Bridge</h3>
      <p className="text-sm text-gray-600 mb-4">Record cross-chain bridge transactions and protocols.</p>

      <div className="space-y-3 mb-4">
        <input value={bridgeProtocol} onChange={(e) => setBridgeProtocol(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500" placeholder="Bridge protocol" />
        <input value={sourceChain} onChange={(e) => setSourceChain(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Source chain" />
        <input value={destChain} onChange={(e) => setDestChain(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Destination chain" />
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction hash" />
      </div>

      <button
        onClick={recordBridge}
        disabled={isPending || isConfirming || !address || !txHash.startsWith('0x')}
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record bridge transaction'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">
          ✓ Cross-chain bridge transaction recorded.
        </div>
      )}
    </section>
  )
}
