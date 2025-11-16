'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSkillEndorsement() {
  const { address } = useAccount()
  const [builder, setBuilder] = useState('')
  const [skill, setSkill] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const endorseSkill = async () => {
    if (!address || !builder || !skill) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `ENDORSE: ${builder} - ${skill}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Skill Endorsement</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Builder address"
          value={builder}
          onChange={(e) => setBuilder(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Skill name"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={endorseSkill}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Endorsing...' : 'Endorse Skill'}
        </button>
        {isSuccess && <p className="text-green-600">Skill endorsed onchain!</p>}
      </div>
    </div>
  )
}
