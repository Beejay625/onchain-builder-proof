'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCodeContributionProof() {
  const { address } = useAccount()
  const [commitHash, setCommitHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveContribution = async () => {
    if (!address || !commitHash) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`CODE_PROOF: ${commitHash}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💻 Code Contribution Proof</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Commit hash"
          value={commitHash}
          onChange={(e) => setCommitHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={proveContribution}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Contribution'}
        </button>
        {isSuccess && <p className="text-green-600">Contribution proven onchain!</p>}
      </div>
    </div>
  )
}

