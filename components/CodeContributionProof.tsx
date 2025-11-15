'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function CodeContributionProof() {
  const [repository, setRepository] = useState('')
  const [commitHash, setCommitHash] = useState('')
  const [description, setDescription] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveContribution = async () => {
    if (!repository.trim() || !commitHash.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'proveCodeContribution',
        args: [repository, commitHash, description],
      })
    } catch (error) {
      console.error('Code contribution proof error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💻 Code Contribution Proof</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Repository</label>
          <input
            type="text"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            placeholder="owner/repo"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Commit Hash</label>
          <input
            type="text"
            value={commitHash}
            onChange={(e) => setCommitHash(e.target.value)}
            placeholder="abc123..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you contribute?"
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={2}
          />
        </div>
        <button
          onClick={proveContribution}
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Recording...' : 'Record Contribution'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Contribution recorded onchain
          </div>
        )}
      </div>
    </div>
  )
}
