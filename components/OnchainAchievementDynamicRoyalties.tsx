'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDynamicRoyaltiesProps {
  achievementId: bigint
}

export default function OnchainAchievementDynamicRoyalties({ achievementId }: OnchainAchievementDynamicRoyaltiesProps) {
  const { address } = useAccount()
  const [tier, setTier] = useState('core')
  const [royalty, setRoyalty] = useState('1.5')
  const [expiresInDays, setExpiresInDays] = useState('30')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const registerDynamicRoyalty = () => {
    if (!address || !royalty.trim()) return

    const payload = `DYNAMIC_ROYALTY|tier:${tier}|royalty:${royalty}|expires:${expiresInDays}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
      <h3 className="text-xl font-bold mb-4">🎼 Dynamic Royalty Curves</h3>
      <p className="text-sm text-gray-600 mb-4">
        Encode flexible royalty tiers for remixable achievement NFTs and keep the payout schedule transparent onchain.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col text-sm font-semibold text-gray-700">
          Tier
          <select
            value={tier}
            onChange={(event) => setTier(event.target.value)}
            className="mt-1 border border-gray-300 rounded-lg p-2"
          >
            <option value="core">Core Maintainer</option>
            <option value="ally">Ally Contributor</option>
            <option value="open">Open Remixers</option>
          </select>
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          Royalty %
          <input
            type="number"
            min="0"
            max="25"
            step="0.1"
            value={royalty}
            onChange={(event) => setRoyalty(event.target.value)}
            className="mt-1 border border-gray-300 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col text-sm font-semibold text-gray-700">
          Expires (days)
          <input
            type="number"
            min="7"
            max="365"
            value={expiresInDays}
            onChange={(event) => setExpiresInDays(event.target.value)}
            className="mt-1 border border-gray-300 rounded-lg p-2"
          />
        </label>
      </div>

      <button
        onClick={registerDynamicRoyalty}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Registering curve...' : 'Publish royalty logic'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Dynamic royalty plan recorded onchain.
        </div>
      )}
    </div>
  )
}
