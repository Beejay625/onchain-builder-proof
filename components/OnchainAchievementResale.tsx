'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementResale() {
  const { address } = useAccount()
  const [resalePrice, setResalePrice] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const listForResale = async () => {
    if (!address || !resalePrice) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`RESALE: ${resalePrice} ETH`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Achievement Resale</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Resale price"
          value={resalePrice}
          onChange={(e) => setResalePrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={listForResale}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Listing...' : 'List for Resale'}
        </button>
        {isSuccess && <p className="text-green-600">Listed for resale onchain!</p>}
      </div>
    </div>
  )
}
