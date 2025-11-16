'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProofs() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Achievement Proofs</h2>
      <div className="space-y-4">
        <p className="text-gray-600">
          Verifiable Proofs: {userPosts?.length || 0}
        </p>
        <p className="text-sm text-gray-500">
          Generate verifiable proofs for all your achievements onchain.
        </p>
        <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
          Generate Proof
        </button>
      </div>
    </div>
  )
}

