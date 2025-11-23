'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementMultiSigProps {
  achievementId: bigint
}

export default function OnchainAchievementMultiSig({ achievementId }: OnchainAchievementMultiSigProps) {
  const { address, isConnected } = useAccount()
  const [signerAddresses, setSignerAddresses] = useState('')
  const [requiredSignatures, setRequiredSignatures] = useState(2)
  const [multiSigPurpose, setMultiSigPurpose] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const setupMultiSig = async () => {
    if (!isConnected || !address || !signerAddresses.trim()) return

    try {
      const multiSigData = `MULTISIG:signers:${signerAddresses}:required:${requiredSignatures}:purpose:${multiSigPurpose || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, multiSigData],
      })
    } catch (error) {
      console.error('Multi-sig setup failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Achievement Multi-Sig" subtitle="Setup multi-signature for achievement" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Signer Addresses *</label>
          <textarea
            value={signerAddresses}
            onChange={(e) => setSignerAddresses(e.target.value)}
            placeholder="Comma-separated: 0x...,0x...,0x..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Required Signatures</label>
          <input
            type="number"
            min="1"
            value={requiredSignatures}
            onChange={(e) => setRequiredSignatures(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Purpose (optional)</label>
          <input
            type="text"
            value={multiSigPurpose}
            onChange={(e) => setMultiSigPurpose(e.target.value)}
            placeholder="Why multi-sig?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={setupMultiSig}
          disabled={isPending || isConfirming || !isConnected || !signerAddresses.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Multi-Sig'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Multi-sig setup recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

