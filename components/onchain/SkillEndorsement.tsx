'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface SkillEndorsementProps {
  builderAddress: string
}

export default function SkillEndorsement({ builderAddress }: SkillEndorsementProps) {
  const { address, isConnected } = useAccount()
  const [skill, setSkill] = useState('')
  const [endorsementLevel, setEndorsementLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert'>('intermediate')
  const [proofLink, setProofLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainSkillEndorsement')) {
    return null
  }

  const handleEndorse = async () => {
    if (!isConnected || !address || !skill.trim() || !builderAddress) return

    try {
      const content = `Skill Endorsement\nBuilder: ${builderAddress}\nSkill: ${skill}\nLevel: ${endorsementLevel}${proofLink ? `\nProof: ${proofLink}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Endorsement failed:', error)
    }
  }

  return (
    <AppCard title="🎯 Skill Endorsement" subtitle="Endorse builder skills onchain with verifiable proof" accent="sky">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g., Solidity, React, Design"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Endorsement Level</label>
          <select
            value={endorsementLevel}
            onChange={(e) => setEndorsementLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'expert')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Link (optional)</label>
          <input
            type="text"
            value={proofLink}
            onChange={(e) => setProofLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleEndorse}
          disabled={isPending || isConfirming || !isConnected || !skill.trim()}
          className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Endorsing...' : 'Endorse Skill'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Skill endorsement recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





