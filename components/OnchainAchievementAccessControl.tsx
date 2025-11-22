'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAccessControlProps {
  achievementId: bigint
}

export default function OnchainAchievementAccessControl({ achievementId }: OnchainAchievementAccessControlProps) {
  const { address } = useAccount()
  const [role, setRole] = useState('MINTER_ROLE')
  const [grantee, setGrantee] = useState('0xgrantee')
  const [grantTx, setGrantTx] = useState('0xgrant')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAccessControl = () => {
    if (!address || !role.trim()) return
    if (!grantee.trim() || !grantee.startsWith('0x')) return

    const payload = `ACCESS_CONTROL|role:${role}|grantee:${grantee}|tx:${grantTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-red-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔒 Access Control</h3>
      <p className="text-sm text-gray-600 mb-4">Record role-based access control grants and revocations.</p>

      <div className="space-y-3 mb-4">
        <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500" placeholder="Role name" />
        <input value={grantee} onChange={(e) => setGrantee(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500" placeholder="Grantee address" />
        <input value={grantTx} onChange={(e) => setGrantTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500" placeholder="Grant transaction" />
      </div>

      <button
        onClick={recordAccessControl}
        disabled={isPending || isConfirming || !grantee.startsWith('0x') || grantee.length < 42}
        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record access control'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          ✓ Access control event recorded onchain.
        </div>
      )}
    </section>
  )
}
