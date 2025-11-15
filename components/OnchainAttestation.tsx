'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainAttestation() {
  const [attestationText, setAttestationText] = useState('')
  const [attestationURI, setAttestationURI] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const createAttestation = async () => {
    if (!attestationText.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createAttestation',
        args: [attestationText, attestationURI],
      })
    } catch (error) {
      console.error('Attestation error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Create Attestation</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Attestation Text</label>
          <textarea
            value={attestationText}
            onChange={(e) => setAttestationText(e.target.value)}
            placeholder="I attest that..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Supporting URI (Optional)</label>
          <input
            type="url"
            value={attestationURI}
            onChange={(e) => setAttestationURI(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={createAttestation}
          disabled={isPending}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending ? 'Creating...' : 'Create Attestation'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Attestation created onchain
          </div>
        )}
      </div>
    </div>
  )
}