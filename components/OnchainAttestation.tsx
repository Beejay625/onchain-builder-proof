'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAttestationProps {
  achievementId: bigint
}

export default function OnchainAttestation({ achievementId }: OnchainAttestationProps) {
  const { address } = useAccount()
  const [attestationText, setAttestationText] = useState('')
  const [attesterName, setAttesterName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createAttestation = async () => {
    if (!address || !attestationText.trim()) return
    
    const attestationData = `ATTESTATION by ${attesterName || 'Anonymous'}: ${attestationText}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, attestationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Onchain Attestation</h3>
      
      <input
        type="text"
        value={attesterName}
        onChange={(e) => setAttesterName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={attestationText}
        onChange={(e) => setAttestationText(e.target.value)}
        placeholder="Attestation statement..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <button
        onClick={createAttestation}
        disabled={isPending || isConfirming || !attestationText.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Attestation'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Attestation recorded onchain
        </div>
      )}
    </div>
  )
}

