'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMultiSigVotingProps {
  proposalId: bigint
}

export default function AchievementMultiSigVoting({ proposalId }: AchievementMultiSigVotingProps) {
  const { address, isConnected } = useAccount()
  const [signerAddresses, setSignerAddresses] = useState('')
  const [requiredSignatures, setRequiredSignatures] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementMultiSigVoting')) {
    return null
  }

  const handleCreateMultiSig = async () => {
    if (!isConnected || !address || !signerAddresses.trim() || !requiredSignatures.trim()) return

    try {
      const addresses = signerAddresses.split(',').map(a => a.trim())
      const multiSigContent = `MULTISIG:${addresses.join('|')}:REQ${requiredSignatures}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [proposalId, multiSigContent],
      })
    } catch (error) {
      console.error('Multi-sig voting setup failed:', error)
    }
  }

  return (
    <AppCard title="🗳️ Multi-Sig Voting" subtitle="Multi-signature voting for proposals" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Signer Addresses (comma-separated)</label>
          <textarea
            value={signerAddresses}
            onChange={(e) => setSignerAddresses(e.target.value)}
            placeholder="0x123..., 0x456..., 0x789..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Required Signatures</label>
          <input
            type="number"
            value={requiredSignatures}
            onChange={(e) => setRequiredSignatures(e.target.value)}
            placeholder="e.g., 2"
            min="1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateMultiSig}
          disabled={isPending || isConfirming || !isConnected || !signerAddresses.trim() || !requiredSignatures.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Multi-Sig Voting'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Multi-sig voting setup onchain: {requiredSignatures} of {signerAddresses.split(',').length} signatures required
          </div>
        )}
      </div>
    </AppCard>
  )
}

