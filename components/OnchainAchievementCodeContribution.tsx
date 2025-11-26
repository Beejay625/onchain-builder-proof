'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCodeContributionProps {
  achievementId: bigint
}

export default function OnchainAchievementCodeContribution({ achievementId }: OnchainAchievementCodeContributionProps) {
  const { address } = useAccount()
  const [repositoryUrl, setRepositoryUrl] = useState('')
  const [commitHash, setCommitHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recordContribution = async () => {
    if (!address || !repositoryUrl.trim() || !commitHash.trim()) return
    
    const codeData = `CODE_CONTRIBUTION: ${repositoryUrl} | commit: ${commitHash}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, codeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💻 Code Contribution</h3>
      
      <input
        type="url"
        value={repositoryUrl}
        onChange={(e) => setRepositoryUrl(e.target.value)}
        placeholder="Repository URL"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={commitHash}
        onChange={(e) => setCommitHash(e.target.value)}
        placeholder="Commit hash"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={recordContribution}
        disabled={isPending || isConfirming || !repositoryUrl.trim() || !commitHash.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Code Contribution Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Code contribution recorded onchain
        </div>
      )}
    </div>
  )
}




