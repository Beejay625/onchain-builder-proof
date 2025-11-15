'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainCrossChainProofs() {
  const { address } = useAccount()
  const [sourceChain, setSourceChain] = useState('')
  const [targetChain, setTargetChain] = useState('')
  const [txHash, setTxHash] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const bridgeProof = async () => {
    if (!address || !sourceChain || !targetChain || !txHash) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Cross-chain proof: ${sourceChain} → ${targetChain} - TX: ${txHash}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌉 Cross-Chain Proofs</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Source chain"
          value={sourceChain}
          onChange={(e) => setSourceChain(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Target chain"
          value={targetChain}
          onChange={(e) => setTargetChain(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Transaction hash"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={bridgeProof}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Bridging...' : 'Bridge Proof'}
        </button>
        {isSuccess && <p className="text-green-600">Cross-chain proof created onchain!</p>}
      </div>
    </div>
  )
}

