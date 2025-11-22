'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDynamicNFTLevelsProps {
  achievementId: bigint
}

export default function OnchainAchievementDynamicNFTLevels({ achievementId }: OnchainAchievementDynamicNFTLevelsProps) {
  const { address } = useAccount()
  const [level, setLevel] = useState('bronze')
  const [xp, setXp] = useState('1200')
  const [badge, setBadge] = useState('Protocol Integrator')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const syncLevel = () => {
    if (!address || !badge.trim()) return

    const payload = `NFT_LEVEL|level:${level}|xp:${xp}|badge:${badge}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white rounded-xl border border-purple-100 shadow-md p-6">
      <h3 className="text-xl font-bold mb-2">🪙 Dynamic NFT Levels</h3>
      <p className="text-sm text-gray-600 mb-4">Attach evolving metadata snapshots for every onchain builder badge.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <select value={level} onChange={(event) => setLevel(event.target.value)} className="border border-gray-300 rounded-lg p-2">
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
        </select>
        <input
          type="number"
          value={xp}
          onChange={(event) => setXp(event.target.value)}
          className="border border-gray-300 rounded-lg p-2"
          placeholder="XP"
        />
        <input
          type="text"
          value={badge}
          onChange={(event) => setBadge(event.target.value)}
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Badge label"
        />
      </div>

      <button
        onClick={syncLevel}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Syncing metadata...' : 'Sync NFT level'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ NFT metadata snapshot sealed onchain.
        </div>
      )}
    </div>
  )
}
