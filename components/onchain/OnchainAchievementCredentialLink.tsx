'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCredentialLinkProps {
  achievementId: bigint
}

export default function OnchainAchievementCredentialLink({ achievementId }: OnchainAchievementCredentialLinkProps) {
  const { address, isConnected } = useAccount()
  const [provider, setProvider] = useState('')
  const [credentialId, setCredentialId] = useState('')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const attachCredential = async () => {
    if (!isConnected || !address || !provider.trim() || !credentialId.trim()) return

    try {
      const payload = `CREDENTIAL_LINK:provider:${provider}:id:${credentialId}:notes:${notes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Credential link failed:', error)
    }
  }

  return (
    <AppCard title="🎓 Credential Link" subtitle="Attach certificates or learning credentials" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Provider *</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="Layer3, Coursera, LearnWeb3"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID or URL *</label>
          <input
            type="text"
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
            placeholder="Certificate link or token ID"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Context for this credential"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={attachCredential}
          disabled={isPending || isConfirming || !isConnected || !provider.trim() || !credentialId.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Attaching...' : 'Attach Credential'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Credential linked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
