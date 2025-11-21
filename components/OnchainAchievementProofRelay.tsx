'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProofRelay() {
  const { address } = useAccount()
  const [sourceChain, setSourceChain] = useState('Base')
  const [targetChain, setTargetChain] = useState('Optimism')
  const [proofHash, setProofHash] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const relayProof = () => {
    if (!address || !proofHash) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`PROOF_RELAY:${sourceChain}:${targetChain}:${proofHash}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🔁 Proof Relay</h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input className="border rounded-lg p-2" value={sourceChain} onChange={(e) => setSourceChain(e.target.value)} />
        <input className="border rounded-lg p-2" value={targetChain} onChange={(e) => setTargetChain(e.target.value)} />
      </div>
      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Proof hash"
        value={proofHash}
        onChange={(e) => setProofHash(e.target.value)}
      />
      <button
        onClick={relayProof}
        disabled={isPending || isConfirming}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || isConfirming ? 'Relaying...' : 'Relay Proof'}
      </button>
      {isSuccess && <p className="text-green-600 mt-4">Proof relay recorded.</p>}
    </div>
  )
}
