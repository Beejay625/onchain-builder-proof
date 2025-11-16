'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementFractionalization() {
  const { address } = useAccount()
  const [shares, setShares] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const fractionalize = async () => {
    if (!address || !shares) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`FRACTIONALIZE: ${shares} shares`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔢 Achievement Fractionalization</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Number of shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={fractionalize}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Fractionalizing...' : 'Fractionalize'}
        </button>
        {isSuccess && <p className="text-green-600">Fractionalized onchain!</p>}
      </div>
    </div>
  )
}
