'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderEndorsements() {
  const { address } = useAccount()
  const [endorsedAddress, setEndorsedAddress] = useState('')
  const [endorsementText, setEndorsementText] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createEndorsement = async () => {
    if (!address || !endorsedAddress || !endorsementText) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Endorsed ${endorsedAddress}: ${endorsementText}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👍 Builder Endorsements</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Builder address"
          value={endorsedAddress}
          onChange={(e) => setEndorsedAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Endorsement text"
          value={endorsementText}
          onChange={(e) => setEndorsementText(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
        <button
          onClick={createEndorsement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Endorsement'}
        </button>
        {isSuccess && <p className="text-green-600">Endorsement created onchain!</p>}
      </div>
    </div>
  )
}

