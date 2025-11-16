'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAttestation() {
  const { address } = useAccount()
  const [attestation, setAttestation] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createAttestation = async () => {
    if (!address || !attestation) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`ATTESTATION: ${attestation}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✍️ Achievement Attestation</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Attestation statement"
          value={attestation}
          onChange={(e) => setAttestation(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createAttestation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Attestation'}
        </button>
        {isSuccess && <p className="text-green-600">Attestation created onchain!</p>}
      </div>
    </div>
  )
}
