'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAttestationRegistry() {
  const { address } = useAccount()
  const [attestation, setAttestation] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const registerAttestation = async () => {
    if (!address || !attestation) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `ATTEST: ${attestation}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Attestation Registry</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Attestation content"
          value={attestation}
          onChange={(e) => setAttestation(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
        <button
          onClick={registerAttestation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Registering...' : 'Register Attestation'}
        </button>
        {isSuccess && <p className="text-green-600">Attestation registered!</p>}
      </div>
    </div>
  )
}

