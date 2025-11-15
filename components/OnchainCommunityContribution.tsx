'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainCommunityContribution() {
  const { address } = useAccount()
  const [contribution, setContribution] = useState('')
  const [community, setCommunity] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordContribution = async () => {
    if (!address || !contribution || !community) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Community Contribution to ${community}: ${contribution}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌐 Community Contribution</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Community name"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Describe your contribution"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <button
          onClick={recordContribution}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Contribution'}
        </button>
        {isSuccess && <p className="text-green-600">Contribution recorded onchain!</p>}
      </div>
    </div>
  )
}

