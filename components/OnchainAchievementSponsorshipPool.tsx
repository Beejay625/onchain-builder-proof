'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSponsorshipPool() {
  const { address } = useAccount()
  const [contribution, setContribution] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const contributeToPool = async () => {
    if (!address || !contribution) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`SPONSOR_POOL: ${contribution} ETH`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏦 Sponsorship Pool</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Contribution amount"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={contributeToPool}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Contributing...' : 'Contribute to Pool'}
        </button>
        {isSuccess && <p className="text-green-600">Contribution added onchain!</p>}
      </div>
    </div>
  )
}
