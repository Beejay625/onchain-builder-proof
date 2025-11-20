'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDynamicAllowlists() {
  const { address } = useAccount()
  const [achievementId, setAchievementId] = useState('')
  const [criteria, setCriteria] = useState('reputation>500')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateAllowlist = () => {
    if (!address || !achievementId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(achievementId), `ALLOWLIST:${criteria}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔑 Dynamic Allowlist</h2>
      <p className="text-gray-600 mb-4">
        Gate achievement interactions with programmable criteria.
      </p>
      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Achievement ID"
        value={achievementId}
        onChange={(e) => setAchievementId(e.target.value)}
      />
      <input
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Allowlist criteria"
        value={criteria}
        onChange={(e) => setCriteria(e.target.value)}
      />
      <button
        onClick={updateAllowlist}
        disabled={isPending || isConfirming}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Allowlist'}
      </button>
      {isSuccess && <p className="text-green-600 mt-4">Allowlist rules stored onchain.</p>}
    </div>
  )
}
