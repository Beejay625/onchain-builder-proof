'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function SkillVerification() {
  const [skill, setSkill] = useState('')
  const [proofLink, setProofLink] = useState('')
  const [certificate, setCertificate] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const verifySkill = async () => {
    if (!skill.trim() || !proofLink.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'verifySkill',
        args: [skill, proofLink, certificate],
      })
    } catch (error) {
      console.error('Skill verification error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Verify Skill</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Skill Name</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="JavaScript, React, Solidity..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Proof Link</label>
          <input
            type="url"
            value={proofLink}
            onChange={(e) => setProofLink(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Certificate (Optional)</label>
          <input
            type="url"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={verifySkill}
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Verifying...' : 'Verify Skill'}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Skill verified onchain
          </div>
        )}
      </div>
    </div>
  )
}
