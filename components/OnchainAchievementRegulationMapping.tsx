'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRegulationMappingProps {
  achievementId: bigint
}

export default function OnchainAchievementRegulationMapping({ achievementId }: OnchainAchievementRegulationMappingProps) {
  const { address } = useAccount()
  const [regulation, setRegulation] = useState('GDPR')
  const [section, setSection] = useState('Article 5')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mapRegulation = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `REGULATION_MAP: ${regulation} - ${section}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Regulation Mapping</h3>
      <input
        type="text"
        value={regulation}
        onChange={(e) => setRegulation(e.target.value)}
        placeholder="Regulation name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      />
      <input
        type="text"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        placeholder="Clause or section"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={mapRegulation}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Linking...' : 'Link Regulation Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-violet-50 border border-violet-500 rounded-lg text-sm text-violet-700">
          ✓ Regulation mapping recorded onchain
        </div>
      )}
    </div>
  )
}
