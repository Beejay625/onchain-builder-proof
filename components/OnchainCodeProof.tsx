'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainCodeProofProps {
  achievementId: bigint
}

export default function OnchainCodeProof({ achievementId }: OnchainCodeProofProps) {
  const { address } = useAccount()
  const [commitHash, setCommitHash] = useState('')
  const [repositoryUrl, setRepositoryUrl] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recordCodeProof = async () => {
    if (!address || !commitHash.trim()) return
    
    const codeData = `CODE_PROOF: ${commitHash}${repositoryUrl ? ` - Repo: ${repositoryUrl}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, codeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💻 Onchain Code Contribution Proof</h3>
      
      <input
        type="text"
        value={commitHash}
        onChange={(e) => setCommitHash(e.target.value)}
        placeholder="Git commit hash"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <input
        type="url"
        value={repositoryUrl}
        onChange={(e) => setRepositoryUrl(e.target.value)}
        placeholder="Repository URL (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={recordCodeProof}
        disabled={isPending || isConfirming || !commitHash.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Code Proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Code proof recorded onchain
        </div>
      )}
    </div>
  )
}

