'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRoyalties() {
  const { address } = useAccount()
  const [royaltyRate, setRoyaltyRate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setRoyalties = async () => {
    if (!address || !royaltyRate) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`ROYALTY: ${royaltyRate}%`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Achievement Royalties</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Royalty rate (%)"
          value={royaltyRate}
          onChange={(e) => setRoyaltyRate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={setRoyalties}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Royalties'}
        </button>
        {isSuccess && <p className="text-green-600">Royalties configured onchain!</p>}
      </div>
    </div>
  )
}
