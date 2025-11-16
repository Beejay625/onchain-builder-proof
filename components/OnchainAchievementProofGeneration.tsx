'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProofGeneration() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const generateProof = () => {
    const proof = {
      address,
      achievements: userPosts?.length || 0,
      timestamp: Date.now(),
      contract: BUILDER_PROOF_CONTRACT
    }
    return JSON.stringify(proof, null, 2)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Proof Generation</h2>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Generate verifiable proofs for your achievements
        </p>
        <button
          onClick={() => {
            const proof = generateProof()
            navigator.clipboard.writeText(proof)
            alert('Proof copied to clipboard!')
          }}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          Generate & Copy Proof
        </button>
      </div>
    </div>
  )
}
