'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDelegatedAccessProps {
  achievementId: bigint
}

export default function OnchainAchievementDelegatedAccess({ achievementId }: OnchainAchievementDelegatedAccessProps) {
  const { address } = useAccount()
  const [delegate, setDelegate] = useState('0xdelegate')
  const [permission, setPermission] = useState('merge-prs')
  const [expiry, setExpiry] = useState('2024-12-31T00:00:00Z')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishDelegation = () => {
    if (!address || !delegate.trim()) return

    const payload = `DELEGATED_ACCESS|delegate:${delegate}|permission:${permission}|expiry:${expiry}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-violet-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🧾 Delegated Access</h3>
      <p className="text-sm text-gray-600 mb-4">Record task-scoped access deals for reviewers and operators.</p>

      <div className="space-y-3 mb-4">
        <input value={delegate} onChange={(e) => setDelegate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Delegate address" />
        <input value={permission} onChange={(e) => setPermission(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Permission" />
        <input value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Expiry" />
      </div>

      <button
        onClick={publishDelegation}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing delegation...' : 'Publish delegation'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">
          ✓ Delegation reflected onchain for audit.
        </div>
      )}
    </section>
  )
}
