'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderCompetenceIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const competenceIndex = Math.min(100, (userPosts?.length || 0) * 5.2)
  const competenceLevel = competenceIndex >= 80 ? 'Highly Competent' :
                          competenceIndex >= 60 ? 'Competent' :
                          competenceIndex >= 40 ? 'Developing' : 'Learning'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Competence Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{competenceIndex.toFixed(0)}</p>
          <p className="text-gray-600">Competence Index</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{competenceLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your competence through achievements.
        </p>
      </div>
    </div>
  )
}

