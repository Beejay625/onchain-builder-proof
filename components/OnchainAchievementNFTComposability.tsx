'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNFTComposabilityProps {
  achievementId: bigint
}

export default function OnchainAchievementNFTComposability({ achievementId }: OnchainAchievementNFTComposabilityProps) {
  const { address } = useAccount()
  const [parentToken, setParentToken] = useState('achievement:42')
  const [childToken, setChildToken] = useState('badge:proto-01')
  const [relationship, setRelationship] = useState('boosts-reputation')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const registerComposable = () => {
    if (!address || !parentToken.trim() || !childToken.trim()) return

    const payload = `NFT_COMPOSABILITY|parent:${parentToken}|child:${childToken}|relation:${relationship}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-pink-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🧬 NFT Composability</h3>
      <p className="text-sm text-gray-600 mb-4">Publish how achievement NFTs compose with booster traits.</p>

      <div className="space-y-3 mb-4">
        <input value={parentToken} onChange={(e) => setParentToken(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Parent token" />
        <input value={childToken} onChange={(e) => setChildToken(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Child token" />
        <input value={relationship} onChange={(e) => setRelationship(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Relationship" />
      </div>

      <button
        onClick={registerComposable}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Registering...' : 'Register composability'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-lg p-3">
          ✓ NFT composability relationship stored onchain.
        </div>
      )}
    </section>
  )
}
