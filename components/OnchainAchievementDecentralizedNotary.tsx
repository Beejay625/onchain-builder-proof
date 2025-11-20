'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDecentralizedNotary() {
  const { address } = useAccount()
  const [documentHash, setDocumentHash] = useState('')
  const [witness, setWitness] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const notarize = () => {
    if (!address || !documentHash || !witness) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`NOTARY:${documentHash}:${witness}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Decentralized Notary</h2>
      <p className="text-gray-600 mb-4">
        Register cryptographic fingerprints with trusted witnesses for auditability.
      </p>
      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Document hash"
        value={documentHash}
        onChange={(e) => setDocumentHash(e.target.value)}
      />
      <input
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Witness address"
        value={witness}
        onChange={(e) => setWitness(e.target.value)}
      />
      <button
        onClick={notarize}
        disabled={isPending || isConfirming}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Notary Proof'}
      </button>
      {isSuccess && <p className="text-green-600 mt-4">Notary entry recorded onchain.</p>}
    </div>
  )
}
