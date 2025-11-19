'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementVersionProps {
  achievementId: bigint
}

export default function OnchainAchievementVersion({ achievementId }: OnchainAchievementVersionProps) {
  const { address } = useAccount()
  const [version, setVersion] = useState('1.0.0')
  const [changelog, setChangelog] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createVersion = async () => {
    if (!address || !version.trim()) return
    
    const versionData = `VERSION: ${version}${changelog ? ` | ${changelog}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, versionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📋 Onchain Version Control</h3>
      
      <input
        type="text"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        placeholder="Version (e.g., 1.0.0)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={changelog}
        onChange={(e) => setChangelog(e.target.value)}
        placeholder="Changelog (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={createVersion}
        disabled={isPending || isConfirming || !version.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Version Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Version recorded onchain
        </div>
      )}
    </div>
  )
}

