'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainCodeContributionProof() {
  const { address } = useAccount()
  const [repo, setRepo] = useState('')
  const [commitHash, setCommitHash] = useState('')
  const [description, setDescription] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveContribution = async () => {
    if (!address || !repo || !commitHash) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Code Contribution: ${repo} - Commit: ${commitHash} - ${description}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💻 Code Contribution Proof</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Repository URL"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Commit hash"
          value={commitHash}
          onChange={(e) => setCommitHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Contribution description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <button
          onClick={proveContribution}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Contribution'}
        </button>
        {isSuccess && <p className="text-green-600">Code contribution proven onchain!</p>}
      </div>
    </div>
  )
}

