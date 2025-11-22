'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementChainLinksProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementChainLinks({ achievementId }: OnchainAchievementAchievementChainLinksProps) {
  const { address } = useAccount()
  const [parentId, setParentId] = useState('42')
  const [childId, setChildId] = useState('43')
  const [relationship, setRelationship] = useState('prerequisite')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const linkAchievements = () => {
    if (!address || !parentId.trim() || !childId.trim()) return

    const payload = `ACHIEVEMENT_CHAIN|parent:${parentId}|child:${childId}|relation:${relationship}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-cyan-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⛓️ Achievement Chain Links</h3>
      <p className="text-sm text-gray-600 mb-4">Create sequential links between related achievements.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={parentId} onChange={(e) => setParentId(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Parent ID" />
        <input value={childId} onChange={(e) => setChildId(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Child ID" />
        <input value={relationship} onChange={(e) => setRelationship(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Relationship" />
      </div>

      <button
        onClick={linkAchievements}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Linking...' : 'Link achievements'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          ✓ Achievement chain link stored.
        </div>
      )}
    </section>
  )
}
