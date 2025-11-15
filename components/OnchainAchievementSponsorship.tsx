'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSponsorship() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [sponsor, setSponsor] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const sponsorAchievement = async () => {
    if (!address || !postId || !sponsor) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `SPONSORED_BY: ${sponsor}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Achievement Sponsorship</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Sponsor name/address"
          value={sponsor}
          onChange={(e) => setSponsor(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={sponsorAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Sponsoring...' : 'Sponsor Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Sponsorship recorded onchain!</p>}
      </div>
    </div>
  )
}

